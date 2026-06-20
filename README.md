# AI Voice Assistant Quality Control Dashboard

A full-stack application featuring a Vue 3 frontend dashboard and a Node.js (Express) CRUD backend. The project is equipped with automated Python tools to synthesize realistic conversational speech via Text-to-Speech (TTS) and format TypeScript mocks on the fly.

---

## 🚀 Quick Start

Follow these steps to set up the repository, install dependencies, and run the development environment on a fresh machine.

### Prerequisites

Ensure you have the following software installed locally:
- **Node.js** (v18 or higher recommended)
- **Python** (v3.9 or higher)

---

### Step 1: Install Node.js Dependencies

Open your terminal in the root directory of the project and fetch the required npm packages:

```bash
npm install
```

### Step 2: Set Up Python Virtual Environment (Optional)

> 💡 **Note:** If you have just cloned the project and the audio assets along with mock files are already present in the repository, you can safely skip **Step 2** and **Step 3**, and go straight to **Step 4**.

If you need to generate or regenerate speech assets locally, build the virtual environment (`.venv`) and install the required speech-synthesis libraries depending on your operating system:

#### On macOS / Linux:
```bash
python3 -m venv .venv
source .venv/bin/activate
pip install edge-tts
deactivate
```

#### On Windows:
```bash
python -m venv .venv
.venv\Scripts\activate
pip install edge-tts
deactivate
```

### Step 3: Initialize Speech Assets (Only if assets are missing)

If you don't have the `.mp3` audio tracks in your `public/audio/` folder or missing mocks, run the isolated asset pipeline command:

```bash
npm run setup
```
This command will dynamically invoke the Python automation layer inside your `.venv` to synthesize audio files and configure TypeScript data structures.

### Step 4: Run the Local Environment

Start both the frontend server (Vite) and the backend CRUD API simultaneously with a single command:

```bash
npm run dev
```
The project will boot up instantly without any background file checks, ensuring a fast and lightweight local workflow.

---

## 🛠️ Project Architecture Quick View

- **`src/`** — Core Vue 3 single-file components (`AudioCell.vue`, `DashboardRow.vue`, etc.) along with global state composables and reactive setups.
- **`server/`** — Express.js REST API providing synchronization overrides, containing the local database storage (`sessions-db.json`) and project bootstrap configuration.
- **`dev_scripts/`** — Python automation suite containing `generate_audio_and_mocks.py` and `maintain_assets.py` handling dynamic conversational edge-tts synthesis.