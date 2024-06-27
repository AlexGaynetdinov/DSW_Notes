import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import NotesList from '../components/NotesList';
import { useAuth } from '../auth/AuthContext';
import { updateCollectionName } from '../api';

const NotesPage = () => {
  const { notes, collections, fetchUserCollections } = useAuth();
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [editingName, setEditingName] = useState(false);
  const [newName, setNewName] = useState('');

  const handleCollectionSelect = (collection) => {
    setSelectedCollection(collection);
    setNewName(collection.name); // Set the new name when a collection is selected
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
      await updateCollectionName(selectedCollection._id, newName);
      await fetchUserCollections(); // Fetch updated collections after name change
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

  return (
    <div className="notes-page">
      <Sidebar collections={collections} onSelectCollection={handleCollectionSelect} />
      <div className="main-content">
        <h1>Notes Page</h1>
        {selectedCollection && (
          <NotesList
            collection={selectedCollection}
            notes={notes}
            editingName={editingName}
            newName={newName}
            onNameChange={handleNameChange}
            onNameEditStart={handleNameEditStart}
            onNameEditEnd={handleNameEditEnd}
            onKeyDown={handleKeyDown}
          />
        )}
      </div>
    </div>
  );
};

export default NotesPage;
