import type { CallSession } from '../types/call-session';

export const mockCallSession: CallSession = {
  call_id: "call_03_ai_stress_test",
  caller_gender: "male",
  turns: [
    {
      turn_id: 1,
      speaker_type: "caller",
      audio_url: "/audio/call_03_turn_01.mp3",
      duration_ms: 4530,
      speech: {
        transcript: "Hello, I need to reschedule my upcoming exam for next Tuesday."
      }
    },
    {
      turn_id: 2,
      speaker_type: "ai",
      audio_url: "/audio/call_03_turn_02.mp3",
      duration_ms: 6480,
      speech: {
        transcript: "Hello! I can help you reschedule your exam. Could you please give me your student ID number?"
      }      
    },
    {
      turn_id: 3,
      speaker_type: "caller",
      audio_url: "/audio/call_03_turn_03.mp3",
      duration_ms: 2645,
      speech: {
        transcript: "Sure, it is student ID 8 4 9 2 0."
      }
    },
    {
      turn_id: 4,
      speaker_type: "ai",
      audio_url: "/audio/call_03_turn_04.mp3",
      duration_ms: 6090,
      speech: {
        transcript: "Thank you. I found your profile, John. Which course exam would you like to reschedule?"
      }      
    },
    {
      turn_id: 5,
      speaker_type: "caller",
      audio_url: "/audio/call_03_turn_05.mp3",
      duration_ms: 4530,
      speech: {
        transcript: "It's for the 'Introduction to Artificial Intelligence' module."
      }
    },
    {
      turn_id: 6,
      speaker_type: "ai",
      audio_url: "/audio/call_03_turn_06.mp3",
      duration_ms: 6285,
      speech: {
        transcript: "Perfect. The exam is currently set for Tuesday at 10 AM. What is the new date you prefer?"
      }      
    },
    {
      turn_id: 7,
      speaker_type: "caller",
      audio_url: "/audio/call_03_turn_07.mp3",
      duration_ms: 4660,
      speech: {
        transcript: "Can we move it to Friday next week? Preferably in the afternoon."
      }
    },
    {
      turn_id: 8,
      speaker_type: "ai",
      audio_url: "/audio/call_03_turn_08.mp3",
      duration_ms: 8560,
      speech: {
        transcript: "Let me check available slots for Friday afternoon next week. I see a slot at 2 PM and another at 4 PM. Which one works best?"
      }      
    },
    {
      turn_id: 9,
      speaker_type: "caller",
      audio_url: "/audio/call_03_turn_09.mp3",
      duration_ms: 3815,
      speech: {
        transcript: "coffee pizza 2 PM sounds good actually make it 4 PM"
      }
    },
    {
      turn_id: 10,
      speaker_type: "ai",
      audio_url: "/audio/call_03_turn_10.mp3",
      duration_ms: 3165,
      speech: {
        transcript: "Got it, I have updated your exam to 2 PM."
      },
    },
    {
      turn_id: 11,
      speaker_type: "caller",
      audio_url: "/audio/call_03_turn_11.mp3",
      duration_ms: 4270,
      speech: {
        transcript: "Wait, no! I said 4 PM, not 2 PM. Please change it to 4 PM."
      }
    },
    {
      turn_id: 12,
      speaker_type: "ai",
      audio_url: "/audio/call_03_turn_12.mp3",
      duration_ms: 6545,
      speech: {
        transcript: "Apologies for the mix-up. I will change that to 4 PM for Friday next week. One moment please."
      }      
    },
    {
      turn_id: 13,
      speaker_type: "caller",
      audio_url: "/audio/call_03_turn_13.mp3",
      duration_ms: 1150,
      speech: {
        transcript: "Thank you."
      }
    },
    {
      turn_id: 14,
      speaker_type: "ai",
      audio_url: "/audio/call_03_turn_14.mp3",
      duration_ms: 6740,
      speech: {
        transcript: "The change is complete. Your exam for 'Introduction to Python' is now booked for Friday at 4 PM."
      }      
    },
    {
      turn_id: 15,
      speaker_type: "caller",
      audio_url: "/audio/call_03_turn_15.mp3",
      duration_ms: 6480,
      speech: {
        transcript: "No, wait, what? I never said Python! My exam is for Introduction to Artificial Intelligence!"
      }
    },
    {
      turn_id: 16,
      speaker_type: "ai",
      audio_url: "/audio/call_03_turn_16.mp3",
      duration_ms: 8495,
      speech: {
        transcript: "Oh, I am sorry. Let me verify your registered courses. I see you are enrolled in 'Introduction to Artificial Intelligence'."
      }      
    },
    {
      turn_id: 17,
      speaker_type: "caller",
      audio_url: "/audio/call_03_turn_17.mp3",
      duration_ms: 3620,
      speech: {
        transcript: "Yes, exactly. So please make sure it's that one."
      }
    },
    {
      turn_id: 18,
      speaker_type: "ai",
      audio_url: "/audio/call_03_turn_18.mp3",
      duration_ms: 7195,
      speech: {
        transcript: "Understood. I am modifying your 'Introduction to Artificial Intelligence' exam. Is there anything else?"
      }      
    },
    {
      turn_id: 19,
      speaker_type: "caller",
      audio_url: "/audio/call_03_turn_19.mp3",
      duration_ms: 4205,
      speech: {
        transcript: "Yes, will I receive a confirmation email for this change?"
      }
    },
    {
      turn_id: 20,
      speaker_type: "ai",
      audio_url: "/audio/call_03_turn_20.mp3",
      duration_ms: 4465,
      speech: {
        transcript: "Yes, a confirmation email will be sent to your inbox shortly."
      }      
    },
    {
      turn_id: 21,
      speaker_type: "caller",
      audio_url: "/audio/call_03_turn_21.mp3",
      duration_ms: 4205,
      speech: {
        transcript: "Great. Also, is there any fee for rescheduling this late?"
      }
    },
    {
      turn_id: 22,
      speaker_type: "ai",
      audio_url: "/audio/call_03_turn_22.mp3",
      duration_ms: 7650,
      speech: {
        transcript: "Rescheduling is free if done more than 24 hours in advance. Since your exam was next Tuesday, there is no fee."
      }      
    },
    {
      turn_id: 23,
      speaker_type: "caller",
      audio_url: "/audio/call_03_turn_23.mp3",
      duration_ms: 4725,
      speech: {
        transcript: "Perfect. Um, wait, what date did you end up booking it for again?"
      }
    },
    {
      turn_id: 24,
      speaker_type: "ai",
      audio_url: "/audio/call_03_turn_24.mp3",
      duration_ms: 5115,
      speech: {
        transcript: "Could you please tell me your student ID so I can look up your account?"
      }      
    },
    {
      turn_id: 25,
      speaker_type: "caller",
      audio_url: "/audio/call_03_turn_25.mp3",
      duration_ms: 6870,
      speech: {
        transcript: "Are you serious? I just gave it to you. It's 8 4 9 2 0. And we were just talking about my AI exam!"
      }
    },
    {
      turn_id: 26,
      speaker_type: "ai",
      audio_url: "/audio/call_03_turn_26.mp3",
      duration_ms: 7000,
      speech: {
        transcript: "I apologize for the inconvenience. Thank you for providing the ID again. Let me check your schedule."
      }      
    },
    {
      turn_id: 27,
      speaker_type: "caller",
      audio_url: "/audio/call_03_turn_27.mp3",
      duration_ms: 2970,
      speech: {
        transcript: "It should be Friday next week at 4 PM."
      }
    },
    {
      turn_id: 28,
      speaker_type: "ai",
      audio_url: "/audio/call_03_turn_28.mp3",
      duration_ms: 6935,
      speech: {
        transcript: "I see your exam for Introduction to Artificial Intelligence is scheduled for next Tuesday at 10 AM."
      }      
    },
    {
      turn_id: 29,
      speaker_type: "caller",
      audio_url: "/audio/call_03_turn_29.mp3",
      duration_ms: 3815,
      speech: {
        transcript: "No, we just changed it! Why is it still on Tuesday?"
      }
    },
    {
      turn_id: 30,
      speaker_type: "ai",
      audio_url: "/audio/call_03_turn_30.mp3",
      duration_ms: 8300,
      speech: {
        transcript: "I apologize. It seems the system did not save the previous change. Let me try rebooking it for Friday at 4 PM right now."
      }      
    },
    {
      turn_id: 31,
      speaker_type: "caller",
      audio_url: "/audio/call_03_turn_31.mp3",
      duration_ms: 2645,
      speech: {
        transcript: "Please do it carefully this time."
      }
    },
    {
      turn_id: 32,
      speaker_type: "ai",
      audio_url: "/audio/call_03_turn_32.mp3",
      duration_ms: 7325,
      speech: {
        transcript: "Processing the change now. It is successfully saved. Your exam is scheduled for Friday next week at 4 PM."
      }      
    },
    {
      turn_id: 33,
      speaker_type: "caller",
      audio_url: "/audio/call_03_turn_33.mp3",
      duration_ms: 4270,
      speech: {
        transcript: "Okay, can you double check that it's definitely saved now?"
      }
    },
    {
      turn_id: 34,
      speaker_type: "ai",
      audio_url: "/audio/call_03_turn_34.mp3",
      duration_ms: 7130,
      speech: {
        transcript: "Yes, I have re-verified. Introduction to Artificial Intelligence, Friday next week at 4 PM. Confirmed."
      }      
    },
    {
      turn_id: 35,
      speaker_type: "caller",
      audio_url: "/audio/call_03_turn_35.mp3",
      duration_ms: 2775,
      speech: {
        transcript: "Great, thanks. That's all I needed."
      }
    },
    {
      turn_id: 36,
      speaker_type: "ai",
      audio_url: "/audio/call_03_turn_36.mp3",
      duration_ms: 6285,
      speech: {
        transcript: "Thank you for calling IU Akademie support. Have a great day and good luck with your exam!"
      }      
    }
  ]
};
