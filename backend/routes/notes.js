const express = require('express');
const router = express.Router();
const Note = require('../models/note');
const authenticateToken = require('../middleware/authenticateToken');


// GET all notes from the currently logged-in user
router.get('/user', authenticateToken, async (req, res) => {
  try {
    const notes = await Note.find({ author: req.user._id });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new note for the currently logged-in user
router.post('/', authenticateToken, async (req, res) => {
  const note = new Note({
    title: req.body.title,
    content: req.body.content,
    author: req.user._id, // fUser ID from the currently logged-in user
  });
  try {
    const newNote = await note.save();
    res.status(201).json(newNote);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a note by ID
router.delete('/:id', getNote, async (req, res) => {
  try {
    await Note.deleteOne({ _id: req.params.id });
    res.json({ message: 'Note deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT (update) a note by ID
router.put('/:id', getNote, async (req, res) => {
  if (req.body.title != null) {
    res.note.title = req.body.title;
  }
  if (req.body.content != null) {
    res.note.content = req.body.content;
  }
  try {
    const updatedNote = await res.note.save();
    res.json(updatedNote);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/*
// GET all notes by author ID
router.get('/author/:authorId', async (req, res) => {
  try {
    const notes = await Note.find({ author: req.params.authorId });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
*/

// Middleware function to get note by ID
async function getNote(req, res, next) {
  let note;
  try {
    note = await Note.findById(req.params.id);
    if (note == null) {
      return res.status(404).json({ message: 'Note not found' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.note = note;
  next();
}

module.exports = router;
