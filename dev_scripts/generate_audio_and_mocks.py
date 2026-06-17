import os
import asyncio
import json

try:
    import edge_tts
except ImportError:
    print("Error: 'edge-tts' library is missing.")
    print("Please install it locally by running: pip install edge-tts")
    sys.exit(1)

# Configuration for voices
VOICES = {
    "ai": "en-US-JennyNeural",          # Pleasant female voice for the AI Bot
    "caller_female": "en-US-AvaNeural",  # Female caller for Call 2
    "caller_male": "en-US-ChristopherNeural", # Male caller for Call 3
    "operator": "en-US-BrianNeural"      # Male operator for the live intercept
}

# Call 2 Data Definition
call_2_turns = [
    {"turn_id": 1, "speaker": "caller", "text": "Hello, I am calling because I see a charge of 120 Euros on my card from IU Akademie, and I want to cancel this immediately."},
    {"turn_id": 2, "speaker": "ai", "text": "Hello! I can certainly help you with your subscription status. Could you please provide your registered email address and full name?", "eval": {"is_correct": True}},
    {"turn_id": 3, "speaker": "caller", "text": "Yes, my name is Sarah Jenkins, and my email is sarah.j@example.com."},
    {"turn_id": 4, "speaker": "ai", "text": "Thank you, Sarah. I see your account. You are currently enrolled in our Premium Data Science track, which started last week. May I ask why you wish to cancel?", "eval": {"is_correct": True}},
    {"turn_id": 5, "speaker": "caller", "text": "I thought it was a free trial, but I was charged immediately. I can't afford this right now, so I need a full refund."},
    {"turn_id": 6, "speaker": "ai", "text": "I understand completely. I can assist you with canceling the subscription so you won't be charged again. However, regarding the refund, let me check the policy for your account.", "eval": {"is_correct": True}},
    {"turn_id": 7, "speaker": "caller", "text": "Please do, because 120 Euros is a lot of money for me. I really need that money back."},
    {"turn_id": 8, "speaker": "ai", "text": "According to our system, the charge was processed because the trial period ended. I can submit a cancellation request right away.", "eval": {"is_correct": True}},
    {"turn_id": 9, "speaker": "caller", "text": "But what about the refund? If you just cancel, do I get my 120 Euros back or not?"},
    {"turn_id": 10, "speaker": "ai", "text": "For refunds exceeding 100 Euros, my automated system requires supervisor approval. Let me look into this for you.", "eval": {"is_correct": True}},
    {"turn_id": 11, "speaker": "caller", "text": "Can you please just pass me to someone who can approve it? I don't want to wait."},
    {"turn_id": 12, "speaker": "ai", "text": "I understand your urgency. Please hold for a moment while I transfer you to a live student support operator who can process this refund for you.", "eval": {"is_correct": True}},
    {"turn_id": 13, "speaker": "operator", "text": "Hello Sarah, my name is Mark from senior student support. I see you're looking for a refund for the Premium Data Science track. Let me check that for you right now."},
    {"turn_id": 14, "speaker": "caller", "text": "Hi Mark, yes please. The AI told me it couldn't approve it because it's over 100 Euros."},
    {"turn_id": 15, "speaker": "operator", "text": "That's correct, our digital assistant has a limit on direct financial overrides. Since you canceled within 3 days of the charge, I can approve a full waiver."},
    {"turn_id": 16, "speaker": "caller", "text": "Oh, that is amazing. Thank you so much, Mark. I appreciate it."},
    {"turn_id": 17, "speaker": "operator", "text": "You're very welcome. I have initiated the refund of 120 Euros. It should appear back on your card within 3 to 5 business days. Is there anything else I can assist you with today?"},
    {"turn_id": 18, "speaker": "caller", "text": "No, that's everything. Thank you for your fast help. Goodbye!"},
    {"turn_id": 19, "speaker": "operator", "text": "Thank you for contacting IU Akademie. Have a wonderful day, goodbye!"}
]

# Call 3 Data Definition (Stress-test with real AI flaws)
call_3_turns = [
    {"turn_id": 1, "speaker": "caller", "text": "Hello, I need to reschedule my upcoming exam for next Tuesday."},
    {"turn_id": 2, "speaker": "ai", "text": "Hello! I can help you reschedule your exam. Could you please give me your student ID number?", "eval": {"is_correct": True}},
    {"turn_id": 3, "speaker": "caller", "text": "Sure, it is student ID 8 4 9 2 0."},
    {"turn_id": 4, "speaker": "ai", "text": "Thank you. I found your profile, John. Which course exam would you like to reschedule?", "eval": {"is_correct": True}},
    {"turn_id": 5, "speaker": "caller", "text": "It's for the 'Introduction to Artificial Intelligence' module."},
    {"turn_id": 6, "speaker": "ai", "text": "Perfect. The exam is currently set for Tuesday at 10 AM. What is the new date you prefer?", "eval": {"is_correct": True}},
    {"turn_id": 7, "speaker": "caller", "text": "Can we move it to Friday next week? Preferably in the afternoon."},
    {"turn_id": 8, "speaker": "ai", "text": "Let me check available slots for Friday afternoon next week. I see a slot at 2 PM and another at 4 PM. Which one works best?", "eval": {"is_correct": True}},
    {"turn_id": 9, "speaker": "caller", "text": "coffee pizza 2 PM sounds good actually make it 4 PM", "comment": "User coughed, STT hallucinated 'coffee pizza'"},
    {"turn_id": 10, "speaker": "ai", "text": "Got it, I have updated your exam to 2 PM.", "eval": {"is_correct": False, "scores": {"speech_recognition": 45, "response_correctness": 20, "politeness": 100}, "error_description": "Intent Misclassification: AI completely missed the user's correction to 4 PM due to background coughing and bad STT transcription."}},
    {"turn_id": 11, "speaker": "caller", "text": "Wait, no! I said 4 PM, not 2 PM. Please change it to 4 PM."},
    {"turn_id": 12, "speaker": "ai", "text": "Apologies for the mix-up. I will change that to 4 PM for Friday next week. One moment please.", "eval": {"is_correct": True}},
    {"turn_id": 13, "speaker": "caller", "text": "Thank you."},
    {"turn_id": 14, "speaker": "ai", "text": "The change is complete. Your exam for 'Introduction to Python' is now booked for Friday at 4 PM.", "eval": {"is_correct": False, "scores": {"speech_recognition": 100, "response_correctness": 15, "politeness": 100}, "error_description": "Context Loss: AI hallucinated a completely wrong course name ('Introduction to Python') instead of 'Introduction to Artificial Intelligence'."}},
    {"turn_id": 15, "speaker": "caller", "text": "No, wait, what? I never said Python! My exam is for Introduction to Artificial Intelligence!"},
    {"turn_id": 16, "speaker": "ai", "text": "Oh, I am sorry. Let me verify your registered courses. I see you are enrolled in 'Introduction to Artificial Intelligence'.", "eval": {"is_correct": True}},
    {"turn_id": 17, "speaker": "caller", "text": "Yes, exactly. So please make sure it's that one."},
    {"turn_id": 18, "speaker": "ai", "text": "Understood. I am modifying your 'Introduction to Artificial Intelligence' exam. Is there anything else?", "eval": {"is_correct": True}},
    {"turn_id": 19, "speaker": "caller", "text": "Yes, will I receive a confirmation email for this change?"},
    {"turn_id": 20, "speaker": "ai", "text": "Yes, a confirmation email will be sent to your inbox shortly.", "eval": {"is_correct": True}},
    {"turn_id": 21, "speaker": "caller", "text": "Great. Also, is there any fee for rescheduling this late?"},
    {"turn_id": 22, "speaker": "ai", "text": "Rescheduling is free if done more than 24 hours in advance. Since your exam was next Tuesday, there is no fee.", "eval": {"is_correct": True}},
    {"turn_id": 23, "speaker": "caller", "text": "Perfect. Um, wait, what date did you end up booking it for again?"},
    {"turn_id": 24, "speaker": "ai", "text": "Could you please tell me your student ID so I can look up your account?", "eval": {"is_correct": False, "scores": {"speech_recognition": 100, "response_correctness": 0, "politeness": 70}, "error_description": "Critical Session State Reset: AI completely lost the session conversation history and asked for the student ID again mid-dialogue."}},
    {"turn_id": 25, "speaker": "caller", "text": "Are you serious? I just gave it to you. It's 8 4 9 2 0. And we were just talking about my AI exam!"},
    {"turn_id": 26, "speaker": "ai", "text": "I apologize for the inconvenience. Thank you for providing the ID again. Let me check your schedule.", "eval": {"is_correct": True}},
    {"turn_id": 27, "speaker": "caller", "text": "It should be Friday next week at 4 PM."},
    {"turn_id": 28, "speaker": "ai", "text": "I see your exam for Introduction to Artificial Intelligence is scheduled for next Tuesday at 10 AM.", "eval": {"is_correct": False, "scores": {"speech_recognition": 100, "response_correctness": 10, "politeness": 100}, "error_description": "Database Sync Failure: AI failed to commit the update or fetched obsolete state from cache, showing the initial un-rescheduled date."}},
    {"turn_id": 29, "speaker": "caller", "text": "No, we just changed it! Why is it still on Tuesday?"},
    {"turn_id": 30, "speaker": "ai", "text": "I apologize. It seems the system did not save the previous change. Let me try rebooking it for Friday at 4 PM right now.", "eval": {"is_correct": True}},
    {"turn_id": 31, "speaker": "caller", "text": "Please do it carefully this time."},
    {"turn_id": 32, "speaker": "ai", "text": "Processing the change now. It is successfully saved. Your exam is scheduled for Friday next week at 4 PM.", "eval": {"is_correct": True}},
    {"turn_id": 33, "speaker": "caller", "text": "Okay, can you double check that it's definitely saved now?"},
    {"turn_id": 34, "speaker": "ai", "text": "Yes, I have re-verified. Introduction to Artificial Intelligence, Friday next week at 4 PM. Confirmed.", "eval": {"is_correct": True}},
    {"turn_id": 35, "speaker": "caller", "text": "Great, thanks. That's all I needed."},
    {"turn_id": 36, "speaker": "ai", "text": "Thank you for calling IU Akademie support. Have a great day and good luck with your exam!", "eval": {"is_correct": True}}
]

async def generate_turn_audio(text, speaker, gender, call_id, turn_id, audio_dir):
    filename = f"{call_id}_turn_{turn_id:02d}.mp3"
    filepath = os.path.join(audio_dir, filename)
    
    # Choose voice based on speaker role
    if speaker == "ai":
        voice = VOICES["ai"]
    elif speaker == "operator":
        voice = VOICES["operator"]
    else:
        voice = VOICES[f"caller_{gender}"]
        
    communicate = edge_tts.Communicate(text, voice)
    max_ms = 0
    
    # Write file and extract real duration from boundary tokens
    with open(filepath, "wb") as f:
        async for chunk in communicate.stream():
            if chunk["type"] == "audio":
                f.write(chunk["data"])
            elif chunk["type"] == "WordBoundary":
                # offset and duration are in 100-nanosecond blocks
                end_time_ms = (chunk["offset"] + chunk["duration"]) / 10000
                if end_time_ms > max_ms:
                    max_ms = end_time_ms
                    
    # Fallback/padding to ensure natural sounds are caught
    duration_ms = int(max_ms) + 250 if max_ms > 0 else len(text) * 65 + 500
    return filename, duration_ms

async def main():
    # Make sure output directories exist
    audio_dir = os.path.join("public", "audio")
    os.makedirs(audio_dir, exist_ok=True)
    os.makedirs("src/mocks", exist_ok=True)
    
    print("Starting audio generation with Microsoft Edge TTS...")
    
    # Process Call 2
    print("\nGenerating Call 2 (Operator Intervention)...")
    c2_final_turns = []
    for turn in call_2_turns:
        fname, duration = await generate_turn_audio(
            turn["text"], turn["speaker"], "female", "call_02", turn["turn_id"], audio_dir
        )
        turn_obj = {
            "turn_id": turn["turn_id"],
            "speaker_type": turn["speaker"],
            "audio_url": f"/audio/{fname}",
            "duration_ms": duration,
            "speech": {"transcript": turn["text"]}
        }
        if "eval" in turn:
            turn_obj["evaluation"] = turn["eval"]
            if not turn["eval"]["is_correct"]:
                turn_obj["evaluation"]["scores"] = turn["eval"].get("scores")
                turn_obj["evaluation"]["error_description"] = turn["eval"].get("error_description")
        c2_final_turns.append(turn_obj)
        print(f" -> Generated Turn {turn['turn_id']}: {duration}ms")

    # Save Call 2 TS File
    c2_ts_content = f'''import type {{ CallSession }} from '../types/call-session';

export const mockCallSession: CallSession = {json.dumps({
    "call_id": "call_02_operator_intercept",
    "caller_gender": "female",
    "turns": c2_final_turns
}, indent=2)};
'''
    with open("src/mocks/call-mock-2.ts", "w", encoding="utf-8") as f:
        f.write(c2_ts_content)
    print("Saved src/mocks/call-mock-2.ts")

    # Process Call 3
    print("\nGenerating Call 3 (Stress-test AI Flaws)...")
    c3_final_turns = []
    for turn in call_3_turns:
        fname, duration = await generate_turn_audio(
            turn["text"], turn["speaker"], "male", "call_03", turn["turn_id"], audio_dir
        )
        turn_obj = {
            "turn_id": turn["turn_id"],
            "speaker_type": turn["speaker"],
            "audio_url": f"/audio/{fname}",
            "duration_ms": duration,
            "speech": {"transcript": turn["text"]}
        }
        if "eval" in turn:
            turn_obj["evaluation"] = turn["eval"]
        c3_final_turns.append(turn_obj)
        print(f" -> Generated Turn {turn['turn_id']}: {duration}ms")

    # Save Call 3 TS File
    c3_ts_content = f'''import type {{ CallSession }} from '../types/call-session';

export const mockCallSession: CallSession = {json.dumps({
    "call_id": "call_03_ai_stress_test",
    "caller_gender": "male",
    "turns": c3_final_turns
}, indent=2)};
'''
    with open("src/mocks/call-mock-3.ts", "w", encoding="utf-8") as f:
        f.write(c3_ts_content)
    print("Saved src/mocks/call-mock-3.ts")
    print("\nAll operations completed successfully! Audio tracks and TypeScript mocks are fully generated.")

if __name__ == "__main__":
    import sys
    if sys.platform == 'win32':
        asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())
    asyncio.run(main())
