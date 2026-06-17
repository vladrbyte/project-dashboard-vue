export type SpeakerType = 'ai' | 'caller' | 'operator'
export type CallerGender = 'male' | 'female' | 'unknown'

export interface EvaluationScores {
  speech_recognition: number;
  response_correctness: number;
  politeness: number;
}

export interface TurnEvaluation {
  is_correct: boolean | null;
  scores?: EvaluationScores;
  error_description?: string;
}

export interface CallTurn {
  turn_id: number;
  speaker_type: SpeakerType;
  caller_gender?: CallerGender;
  audio_url: string;  
  duration_ms: number;
  speech: { transcript: string; };
  evaluation?: TurnEvaluation;
}

export interface CallSession {
  call_id: string;
  caller_gender: CallerGender;
  turns: CallTurn[];
}