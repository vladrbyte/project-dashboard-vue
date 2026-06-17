import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const audioDir = path.join(__dirname, 'public', 'audio');
const mocksDir = path.join(__dirname, 'src', 'mocks');

const hasAudio = fs.existsSync(audioDir) && fs.readdirSync(audioDir).some(f => f.endsWith('.mp3'));
const hasMocks = fs.existsSync(mocksDir) && fs.readdirSync(mocksDir).some(f => f.endsWith('.ts'));

if (!hasAudio || !hasMocks) {
  console.log('🎵 [Setup] Generating missing assets via Python...');
  
  const isWin = process.platform === 'win32';
  let pythonPath = isWin ? path.join(__dirname, '.venv', 'Scripts', 'python.exe') : path.join(__dirname, '.venv', 'bin', 'python');

  if (!fs.existsSync(pythonPath)) {
    pythonPath = isWin ? 'python' : 'python3';
  }

  try {
    fs.mkdirSync(audioDir, { recursive: true });
    fs.mkdirSync(mocksDir, { recursive: true });

    execSync(`"${pythonPath}" generate_audio_and_mocks.py`, { stdio: 'inherit' });
    execSync(`"${pythonPath}" maintain_assets.py`, { stdio: 'inherit' });
    
    console.log('✅ [Setup] Asset pipeline complete.');
  } catch (e) {
    console.error('❌ [Setup] Failed to generate assets:', e.message);
    process.exit(1);
  }
}