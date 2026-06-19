import type { CallSession } from '../types/call-session';

export const mockCallSession: CallSession = {
  call_id: "call_01_short_wrong_number",
  caller_gender: "male",
  turns: [
    {
      turn_id: 1,
      speaker_type: "caller",
      audio_url: "/audio/call_01_turn_01.mp3",
      duration_ms: 2500,
      speech: { transcript: "Hello, is this the pizza delivery service?" }
    },
    {
      turn_id: 2,
      speaker_type: "ai",
      audio_url: "/audio/call_01_turn_02.mp3",
      duration_ms: 3200,
      speech: { transcript: "Hello! No, you have reached the IU Akademie support line. How can I help you today?" },
    },
    {
      turn_id: 3,
      speaker_type: "caller",
      audio_url: "/audio/call_01_turn_03.mp3",
      duration_ms: 2100,
      speech: { transcript: "Oh, I am so sorry, wrong number. Have a good day, goodbye!" }
    }
  ]
}