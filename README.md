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

### Step 2: Set Up Python Virtual Environment

The project automatically initializes assets using Python scripts. Run the following commands depending on your operating system to build the virtual environment (`.venv`) and install the required speech-synthesis libraries.

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

### Step 3: Run the Local Environment

Start both the frontend server (Vite) and the backend CRUD API simultaneously with a single command:

```bash
npm run dev
```

> **Note:** On your first launch, the backend will automatically detect if audio tracks or TypeScript mocks are missing. It will invoke the Python automation layer inside your `.venv` to generate all needed `.mp3` assets and configure data structures before starting up the server.

---

## 🛠️ Project Architecture Quick View

- **`src/`** — Core Vue 3 single-file components (`AudioCell.vue`, `DashboardRow.vue`, etc.) along with custom dashboard styling and reactive setups.
- **`server/`** — Express.js REST API providing synchronization overrides, containing the local database storage (`sessions-db.json`).
- **Automation Scripts** — `generate_audio_and_mocks.py` and `maintain_assets.py` handling dynamic conversational edge-tts synthesis.