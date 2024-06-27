import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import NotesList from '../components/NotesList';
import NoteEditor from '../components/NoteEditor';
import { useAuth } from '../auth/AuthContext';
import { updateCollectionName, updateNote } from '../api';

const NotesPage = () => {
  const { notes, collections, fetchUserCollections } = useAuth();
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [selectedNote, setSelectedNote] = useState(null);
  const [editingName, setEditingName] = useState(false);
  const [newName, setNewName] = useState('');

  const handleCollectionSelect = (collection) => {
    setSelectedCollection(collection);
    setNewName(collection.name);
    setSelectedNote(null);
  };

  const handleNoteSelect = (note) => {
    setSelectedNote(note);
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNameEditStart = () => {
    setEditingName(true);
  };

  const handleNameEditEnd = async () => {
    setEditingName(false);
    try {
      console.log(`Updating collection ${selectedCollection._id} with new name: ${newName}`);
      const response = await updateCollectionName(selectedCollection._id, newName);
      console.log('API response: ', response);
      await fetchUserCollections();
      console.log('Collection name updated successfully:', newName);
    } catch (error) {
      console.error('Failed to update collection name:', error);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleNameEditEnd();
    }
  };

  const handleNoteSave = async (updatedNote) => {
    try {
      await updateNote(updatedNote._id, updatedNote);
      console.log('Note updated successfully:', updatedNote);
      setSelectedNote(null);
    } catch (error) {
      console.error('Failed to update note:', error);
    }
  };

  const handleNoteCancel = () => {
    setSelectedNote(null);
  };

  return (
    <div className="notes-page">
      <Sidebar collections={collections} onSelectCollection={handleCollectionSelect} />
      <div className="main-content">
        <h1>Notes Page</h1>
        {selectedCollection && !selectedNote && (
          <NotesList
            collection={selectedCollection}
            notes={notes}
            editingName={editingName}
            newName={newName}
            onNameChange={handleNameChange}
            onNameEditStart={handleNameEditStart}
            onNameEditEnd={handleNameEditEnd}
            onKeyDown={handleKeyDown}
            onNoteSelect={handleNoteSelect}
          />
        )}
        {selectedNote && (
          <NoteEditor note={selectedNote} onSave={handleNoteSave} onCancel={handleNoteCancel} />
        )}
      </div>
    </div>
  );
};

export default NotesPage;
