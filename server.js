const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3001;
const rootDirectory = path.join(__dirname, '/public')

app.get('/notes', (req, res) => {
  res.sendFile(path.join(rootDirectory, 'notes.html'));
});

app.get('/api/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '/db/db.json'));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(rootDirectory, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Now listening on port ${PORT}`);
});