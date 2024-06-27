const express = require('express');
const router = express.Router();
const Collection = require('../models/collection');
const Note = require('../models/note');
const authenticateToken = require('../middleware/authenticateToken');

// GET all collections from the currently logged-in user
router.get('/user', authenticateToken, async (req, res) => {
    try {
        const collections = await Collection.find({ author: req.user._id });
        res.json(collections);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET all notes in a specific collection
router.get('/:collectionId/notes', authenticateToken, async (req, res) => {
    const { collectionId } = req.params;

    try {
        const collection = await Collection.findById(collectionId).populate('notes');
        if (!collection) {
            return res.status(404).json({ message: 'Collection not found' });
        }
        if (collection.author.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized to view this collection' });
        }
        res.status(200).json(collection.notes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST a new collection for the currently logged-in user
router.post('/', authenticateToken, async (req, res) => {
    const collection = new Collection({
        name: req.body.name,
        author: req.user._id, // User ID from the currently logged-in user
    });
    try {
        const newCollection = await collection.save();
        res.status(201).json(newCollection);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE a collection by ID
router.delete('/:id', authenticateToken, async (req, res) => {
    try {
        const collection = await Collection.findById(req.params.id);
        if (!collection) {
            return res.status(404).json({ message: 'Collection not found' });
        }
        if (collection.author.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized to delete this collection' });
        }
        await collection.deleteOne({ _id: req.params.id });
        res.json({ message: 'Collection deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST a note to a collection
router.post('/:collectionId/notes', authenticateToken, async (req, res) => {
    const { collectionId } = req.params;
    const { noteId } = req.body;

    try {
        const collection = await Collection.findById(collectionId);
        const note = await Note.findById(noteId);

        if (!collection || !note) {
            return res.status(404).json({ message: 'Collection or Note not found' });
        }
        if (collection.author.toString() !== req.user._id.toString() || note.author.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized to modify this collection or note' });
        }

        collection.notes.push(noteId);
        note.collection = collectionId;

        await collection.save();
        await note.save();

        res.status(200).json({ message: 'Note added to collection' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE a note from a collection
router.delete('/:collectionId/notes/:noteId', authenticateToken, async (req, res) => {
    const { collectionId, noteId } = req.params;

    try {
        const collection = await Collection.findById(collectionId);
        const note = await Note.findById(noteId);

        if (!collection || !note) {
            return res.status(404).json({ message: 'Collection or Note not found' });
        }
        if (collection.author.toString() !== req.user._id.toString() || note.author.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized to modify this collection or note' });
        }

        collection.notes.pull(noteId);
        note.collection = null;

        await collection.save();
        await note.save();

        res.status(200).json({ message: 'Note removed from collection' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// UPDATE the name of a collection by ID
router.put('/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    try {
        const collection = await Collection.findById(id);
        if (!collection) {
            return res.status(404).json({ message: 'Collection not found' });
        }
        if (collection.author.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized to update this collection' });
        }

        collection.name = name;
        const updatedCollection = await collection.save();

        res.json(updatedCollection);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
