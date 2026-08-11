import express from 'express';
import fs from 'fs';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

const FILE_PATH = path.join(__dirname, 'sessions-db.json');

app.get('/api/sessions', (req, res) => {
  if (fs.existsSync(FILE_PATH)) {
    return res.json(JSON.parse(fs.readFileSync(FILE_PATH, 'utf-8')));
  }
  res.json({});
});

app.post('/api/sessions', (req, res) => {
  fs.writeFileSync(FILE_PATH, JSON.stringify(req.body, null, 2), 'utf-8');
  res.sendStatus(200);
});

const PORT = 3000;
app.listen(PORT, () => console.log(`CRUD Server running on http://localhost:${PORT}`));