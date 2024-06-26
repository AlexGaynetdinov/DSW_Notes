const mongoose = require('mongoose');

const listItemSchema = new mongoose.Schema({
  text: { type: String, required: true },
  checked: { type: Boolean, default: false }
});

const noteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: false },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
  lists: [[listItemSchema]], // Nested arrays of list items
  pictures: [{ type: String }], // Array of strings to store image URLs or paths
  collection: { type: mongoose.Schema.Types.ObjectId, ref: 'Collection' } // Reference to Collection
  // Any more properties?
});

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;
