import express from 'express';
import fs from 'fs';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { exec } from 'child_process';
import { promisify } from 'util';

const execPromise = promisify(exec);

// 1. Resolve path operations safely in ESM environment
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());

// Configuration constants to enforce clean code guidelines and avoid magic numbers
const FILE_PATH = path.join(__dirname, 'sessions-db.json');
const JSON_SPACES_INDENT = 2;

// --- AUTOMATED ASSETS GENERATION PASS ---
async function ensureAssetsExist() {
  const rootDir = path.join(__dirname, '..');
  const audioDir = path.join(rootDir, 'public', 'audio');
  const mocksDir = path.join(rootDir, 'src', 'mocks');

  // Verify directory presence and check if files are ready
  const hasAudio = fs.existsSync(audioDir) && fs.readdirSync(audioDir).some(f => f.endsWith('.mp3'));
  const hasMocks = fs.existsSync(mocksDir) && fs.readdirSync(mocksDir).some(f => f.endsWith('.ts'));

  if (!hasAudio || !hasMocks) {
    console.log('\n🎵 [Automation] Audio assets or TypeScript mocks not found. Launching Python generation tool...');

    // Resolve cross-platform executable path for virtual environments
    const isWin = process.platform === 'win32';
    let pythonPath = isWin
      ? path.join(rootDir, '.venv', 'Scripts', 'python.exe')
      : path.join(rootDir, '.venv', 'bin', 'python');

    // Fall back gracefully if the developer missed setting up .venv
    if (!fs.existsSync(pythonPath)) {
      console.warn('⚠️ [Automation] Local virtual environment (.venv) not found. Falling back to system global Python command...');
      pythonPath = isWin ? 'python' : 'python3';
    }

    try {
      // Ensure physical directories exist to write into
      fs.mkdirSync(audioDir, { recursive: true });
      fs.mkdirSync(mocksDir, { recursive: true });

      // Run generator task sequence
      console.log('⏳ [1/2] Running generate_audio_and_mocks.py (this may take a few moments)...');
      await execPromise(`"${pythonPath}" generate_audio_and_mocks.py`, { cwd: rootDir });

      console.log('⏳ [2/2] Running maintain_assets.py...');
      await execPromise(`"${pythonPath}" maintain_assets.py`, { cwd: rootDir });

      console.log('✅ [Automation] All assets and mocks have been successfully generated!\n');
    } catch (error) {
      console.error('❌ [Automation] Critical error encountered during Python processing script execution:', error.message);
      console.error('Please verify that Python is present and the "edge-tts" library is accessible within your environment.\n');
    }
  } else {
    console.log('✅ [Automation] Audio assets and TS mocks are already present. Script execution skipped.');
  }
}

// REST API endpoint routes
app.get('/api/sessions', (req, res) => {
  if (fs.existsSync(FILE_PATH)) {
    const data = fs.readFileSync(FILE_PATH, 'utf-8');
    return res.json(JSON.parse(data));
  }
  res.json([]);
});

app.post('/api/sessions', (req, res) => {
  fs.writeFileSync(FILE_PATH, JSON.stringify(req.body, null, JSON_SPACES_INDENT), 'utf-8');
  res.sendStatus(200);
});

// Run asset pipeline audit before initializing runtime server hooks
ensureAssetsExist().then(() => {
  const PORT = 3000;
  app.listen(PORT, () => console.log(`CRUD Server running on http://localhost:${PORT}`));
});