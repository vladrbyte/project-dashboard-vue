import type { CallSession } from '../types/call-session';

export const mockCallSession: CallSession = {
  call_id: "call_02_operator_intercept",
  caller_gender: "female",
  turns: [
    {
      turn_id: 1,
      speaker_type: "caller",
      audio_url: "/audio/call_02_turn_01.mp3",
      duration_ms: 8495,
      speech: {
        transcript: "Hello, I am calling because I see a charge of 120 Euros on my card from IU Akademie, and I want to cancel this immediately."
      }
    },
    {
      turn_id: 2,
      speaker_type: "ai",
      audio_url: "/audio/call_02_turn_02.mp3",
      duration_ms: 9080,
      speech: {
        transcript: "Hello! I can certainly help you with your subscription status. Could you please provide your registered email address and full name?"
      }
    },
    {
      turn_id: 3,
      speaker_type: "caller",
      audio_url: "/audio/call_02_turn_03.mp3",
      duration_ms: 4855,
      speech: {
        transcript: "Yes, my name is Sarah Jenkins, and my email is sarah.j@example.com."
      }
    },
    {
      turn_id: 4,
      speaker_type: "ai",
      audio_url: "/audio/call_02_turn_04.mp3",
      duration_ms: 10770,
      speech: {
        transcript: "Thank you, Sarah. I see your account. You are currently enrolled in our Premium Data Science track, which started last week. May I ask why you wish to cancel?"
      }
    },
    {
      turn_id: 5,
      speaker_type: "caller",
      audio_url: "/audio/call_02_turn_05.mp3",
      duration_ms: 8105,
      speech: {
        transcript: "I thought it was a free trial, but I was charged immediately. I can't afford this right now, so I need a full refund."
      }
    },
    {
      turn_id: 6,
      speaker_type: "ai",
      audio_url: "/audio/call_02_turn_06.mp3",
      duration_ms: 12005,
      speech: {
        transcript: "I understand completely. I can assist you with canceling the subscription so you won't be charged again. However, regarding the refund, let me check the policy for your account."
      }
    },
    {
      turn_id: 7,
      speaker_type: "caller",
      audio_url: "/audio/call_02_turn_07.mp3",
      duration_ms: 6025,
      speech: {
        transcript: "Please do, because 120 Euros is a lot of money for me. I really need that money back."
      }
    },
    {
      turn_id: 8,
      speaker_type: "ai",
      audio_url: "/audio/call_02_turn_08.mp3",
      duration_ms: 8885,
      speech: {
        transcript: "According to our system, the charge was processed because the trial period ended. I can submit a cancellation request right away."
      }
    },
    {
      turn_id: 9,
      speaker_type: "caller",
      audio_url: "/audio/call_02_turn_09.mp3",
      duration_ms: 5765,
      speech: {
        transcript: "But what about the refund? If you just cancel, do I get my 120 Euros back or not?"
      }
    },
    {
      turn_id: 10,
      speaker_type: "ai",
      audio_url: "/audio/call_02_turn_10.mp3",
      duration_ms: 7845,
      speech: {
        transcript: "For refunds exceeding 100 Euros, my automated system requires supervisor approval. Let me look into this for you."
      }
    },
    {
      turn_id: 11,
      speaker_type: "caller",
      audio_url: "/audio/call_02_turn_11.mp3",
      duration_ms: 5700,
      speech: {
        transcript: "Can you please just pass me to someone who can approve it? I don't want to wait."
      }
    },
    {
      turn_id: 12,
      speaker_type: "ai",
      audio_url: "/audio/call_02_turn_12.mp3",
      duration_ms: 9860,
      speech: {
        transcript: "I understand your urgency. Please hold for a moment while I transfer you to a live student support operator who can process this refund for you."
      }
    },
    {
      turn_id: 13,
      speaker_type: "operator",
      audio_url: "/audio/call_02_turn_13.mp3",
      duration_ms: 11160,
      speech: {
        transcript: "Hello Sarah, my name is Mark from senior student support. I see you're looking for a refund for the Premium Data Science track. Let me check that for you right now."
      }
    },
    {
      turn_id: 14,
      speaker_type: "caller",
      audio_url: "/audio/call_02_turn_14.mp3",
      duration_ms: 6155,
      speech: {
        transcript: "Hi Mark, yes please. The AI told me it couldn't approve it because it's over 100 Euros."
      }
    },
    {
      turn_id: 15,
      speaker_type: "operator",
      audio_url: "/audio/call_02_turn_15.mp3",
      duration_ms: 10705,
      speech: {
        transcript: "That's correct, our digital assistant has a limit on direct financial overrides. Since you canceled within 3 days of the charge, I can approve a full waiver."
      }
    },
    {
      turn_id: 16,
      speaker_type: "caller",
      audio_url: "/audio/call_02_turn_16.mp3",
      duration_ms: 4530,
      speech: {
        transcript: "Oh, that is amazing. Thank you so much, Mark. I appreciate it."
      }
    },
    {
      turn_id: 17,
      speaker_type: "operator",
      audio_url: "/audio/call_02_turn_17.mp3",
      duration_ms: 12070,
      speech: {
        transcript: "You're very welcome. I have initiated the refund of 120 Euros. It should appear back on your card within 3 to 5 business days. Is there anything else I can assist you with today?"
      }
    },
    {
      turn_id: 18,
      speaker_type: "caller",
      audio_url: "/audio/call_02_turn_18.mp3",
      duration_ms: 4465,
      speech: {
        transcript: "No, that's everything. Thank you for your fast help. Goodbye!"
      }
    },
    {
      turn_id: 19,
      speaker_type: "operator",
      audio_url: "/audio/call_02_turn_19.mp3",
      duration_ms: 4920,
      speech: {
        transcript: "Thank you for contacting IU Akademie. Have a wonderful day, goodbye!"
      }
    }
  ]
};
