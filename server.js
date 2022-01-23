// Required dependencies and packages
const express = require('express');
const path = require('path');
const fs = require('fs');

// Setting const variables to invoke express, set PORT number, and 
const app = express();
const PORT = 3001;
const rootDirectory = path.join(__dirname, '/public')

// Middleware to retrieve content from /public directory
app.use(express.static(rootDirectory));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// GET route to send notes.html to client
app.get('/notes', (req, res) => {
  res.sendFile(path.join(rootDirectory, 'notes.html'));
});

// GET route reads and returns all files saved in db.json file
app.get('/api/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '/db/db.json'));
});

// GET route to parse and identify each note with a unique ID
app.get('/api/notes/:id', (req, res) => {
  const savedNotes = JSON.parse(fs.readFileSync('./db/db.json', 'utf-8'));
  res.json(savedNotes[Number(req.params.id)]);
});

// GET route to send landing page to client
app.get('*', (req, res) => {
  res.sendFile(path.join(rootDirectory, 'index.html'));
});

// POST route to save new notes to server
app.post('/api/notes', (req, res) => {
  const savedNotes = JSON.parse(fs.readFileSync('./db/db.json', 'utf-8'));
  const newNote = req.body;
  const newID = (savedNotes.length).toString();

  newNote.id = newID;
  savedNotes.push(newNote);

  fs.writeFileSync('./db/db.json', JSON.stringify(savedNotes));
  console.log(newNote);
  res.json(savedNotes);
});

// DELETE route to delete notes from server
app.delete('/api/notes/:id', (req, res) => {
  // Used let variables instead of const because the ID's have to be allowed to be altered
  let savedNotes = JSON.parse(fs.readFileSync('./db/db.json', 'utf-8'));
  let noteID = req.params.id;
  let newID = 0;

  savedNotes = savedNotes.filter(currNote => {
    return currNote.id != noteID;
  });

  for (currNote of savedNotes) {
    currNote.id = newID.toString();
    newID++;
  };

  fs.writeFileSync('./db/db.json', JSON.stringify(savedNotes));
  res.json(savedNotes);
});

// LISTEN route to host server/client connection
app.listen(PORT, () => {
  console.log(`Now listening on port ${PORT}`);
});