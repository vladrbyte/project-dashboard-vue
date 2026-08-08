PROJECT DOCUMENTATION
Prototype Walkthrough and Implementation Status
Multi-Dimensional Turn-by-Turn Quality Evaluation Framework for AI Voice Assistant Conversations

This document accompanies the full project source (ZIP). It describes every interface element and architectural component and states plainly where each pipeline stage currently stands.

1. THE SCORING LAYER: HOW SCORES ARE PRODUCED

The current prototype implements the scoring layer as a human-in-the-loop evaluation instrument: the supervisor produces the judgment, and the layer structures it into the three-dimensional schema, persists it and displays it. The values are therefore neither the output of an automated scorer (Stage 2 is an integration point, see section 4) nor content-independent placeholders: they are structured expert assessments captured by the scoring layer.

- V (Verify): the supervisor, having listened to the audio and read the transcript, judges the turn fully correct. By definition all three dimensions (STT accuracy, response correctness, politeness) then score 100, and the interface renders the compact aggregate "Verified (100)". This is a deliberate design decision: a per-dimension breakdown of a fully correct turn carries no information, so it is collapsed until a turn is flagged.
- X (Reject): the evaluation cell expands into the full multi-dimensional view — three independent vertical 0-100 sliders (STT Accuracy, Response Correctness, Politeness), each initialized at 100, of which only the failed dimensions are lowered, plus a qualitative error-description field. A factually wrong but polite answer therefore lowers only Response Correctness while the other two remain at 100.
- Clicking the active button again returns the turn to Pending; evaluations are stored as an override layer and survive reloads.

On the transcripts: they are manually paired demonstration data, labelled in the UI by a persistent DEMO MODE badge. The conversations are scripted; the audio is synthesized from the scripts with the edge-tts Python library (Microsoft Edge neural TTS voices, e.g. en-US-JennyNeural for the AI, distinct voices per caller and operator), and per-track durations are extracted from the TTS WordBoundary tokens. This is an intentional frontend-first choice consistent with the agreed scope: the prototype's contribution is Stage 3, while Stages 1-2 are integration points.

2. ARCHITECTURE (ZIP CONTENTS)

- src/ — Vue 3 + TypeScript frontend: SpeakerCell (speaker identification), AudioCell (WaveSurfer playback), DashboardRow (turn row wiring), EvaluationInspector (scoring cell); composable use-sessions (state, override layer, persistence); typed domain model (src/types/call-session.ts).
- server/ — Express CRUD API (GET/POST /api/sessions, port 3000) persisting the override layer to sessions-db.json.
- dev_scripts/ — Python asset pipeline: Edge-TTS synthesis, typed mock generation, key sanitization.
- Persistence model: base demo sessions + override layer (server DB when live; localStorage when the backend is unreachable, in which case the DEMO MODE badge is shown — always on static GitHub Pages hosting).
- Ingestion model: the base accepts any conversation in the typed CallSession schema; demo conversations are produced by the generation pipeline, and in production the same schema would be filled by the client's Stage 1-2 modules.

3. INTERFACE, ELEMENT BY ELEMENT

1. Header "AI Voice Assistant QC" + DEMO MODE badge (backend reachability indicator).
2. Session selector: call_01 (wrong number, 3 turns), call_02 (operator intercept, 19 turns), call_03 (AI stress test, 36 turns) — 58 turns total, 25 of them AI response turns.
3. Speaker column: avatar per speaker type (male/female caller, AI, human operator) plus turn index.
4. Audio column: WaveSurfer waveform, play/pause, current/total time; finishing a track auto-advances to the next turn for continuous review; clicking the waveform seeks and plays.
5. Transcript column: aligned per-turn text with speaker identification (demo transcripts).
6. Binary assessment column: V/X buttons; the opposite judgment is dimmed; re-click resets to Pending.
7. Multi-dimensional column: Pending / Verified (100) / error view with three sliders and feedback field (see section 1).

4. PIPELINE STAGE STATUS (HONEST)

- Stage 1 — STT: not integrated; demo transcripts are used instead. Integration point for the client's Deepgram/Whisper module.
- Stage 2 — LLM analysis: not integrated; semantic analysis is currently performed by the human supervisor (human-in-the-loop). Integration point for the client's GPT/Claude module.
- Stage 3 — Scoring & Classification: implemented and functional — binary judgment plus three 0-100 dimensions plus qualitative classification, structured persistence, and a demo dataset with scripted failure patterns.

Validation note: the supervisor's manual evaluations captured by this tool constitute the expert human ground truth against which automated scoring will be validated (the 90-97% agreement metric). The prototype therefore already implements the measurement instrument of the research question.

5. RUNNING THE PROJECT

npm install -> npm run setup (generates missing assets — audio and typed mocks — via the Python pipeline; skipped when assets are already present; requires Python with the edge-tts package, a local .venv is used automatically if present) -> npm run dev; optionally node server/server.js for live persistence (the DEMO MODE badge then switches off).