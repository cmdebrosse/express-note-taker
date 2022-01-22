import express from 'express';
import path from 'path';
import fs from 'fs';

const app = express();
const PORT = 3001;

app.get('/notes', (req, res) => {
  res.sendFile(path.join(mainDir, 'notes.html'));
});

app.get('/api/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '/db/db.json'));
});

app.listen(PORT, () => {
  console.log(`Now listening on port ${PORT}`);
});