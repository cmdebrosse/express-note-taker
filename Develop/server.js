import express from 'express';
import path from 'path';
import fs from 'fs';

const app = express();
const PORT = 3001;

app.get("/notes", (req, res) => {
  res.sendFile(path.join(mainDir, 'notes.html'));
});


app.listen(PORT, () => {
  console.log(`Now listening on port ${PORT}`);
});