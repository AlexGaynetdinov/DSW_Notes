import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import NotesList from '../components/NotesList';
import NoteEditor from '../components/NoteEditor';
import { useAuth } from '../auth/AuthContext';
import { updateCollectionName, updateNote, createNote, deleteNote, addNoteToCollection, createCollection, deleteCollection } from '../api';

const NotesPage = () => {
    const { notes, collections, fetchUserCollections, fetchCollectionNotes } = useAuth();
    const [selectedCollection, setSelectedCollection] = useState(null);
    const [selectedNote, setSelectedNote] = useState(null);
    const [editingName, setEditingName] = useState(false);
    const [newName, setNewName] = useState('');

    const handleCollectionSelect = (collection) => {
        setSelectedCollection(collection);
        setNewName(collection.name);
        setSelectedNote(null);
    };

    const handleCreateCollection = async () => {
        try {
            console.log('Creating new collection...');
            await createCollection('New Collection');
            await fetchUserCollections();
            console.log('New collection created successfully.');
        } catch (error) {
            console.error('Failed to create collection:', error);
        }
    }

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
            await fetchCollectionNotes(selectedCollection._id);
        } catch (error) {
            console.error('Failed to update note:', error);
        }
    };

    const handleNoteCancel = () => {
        setSelectedNote(null);
    };

    const handleCreateNote = async () => {
        try {
            const newNote = await createNote('New Note', ''); // Provide default title and content
            console.log('Created new note:', newNote);

            if (selectedCollection) {
                await addNoteToCollection(selectedCollection._id, newNote._id);
                await fetchUserCollections();
                await fetchCollectionNotes(selectedCollection._id);
                console.log('Added note to collection:', selectedCollection.name);
            } else {
                console.warn('No selected collection to add the note to.');
            }
        } catch (error) {
            console.error('Failed to create or add note:', error);
        }
    };

    const handleNoteDelete = async (noteId) => {
        try {
            console.log('Deleting note:', noteId);
            await deleteNote(noteId);
            await fetchCollectionNotes(selectedCollection._id);
            setSelectedNote(null);
            console.log('Note deleted successfully:', noteId);
        } catch (error) {
            console.error('Failed to delete note:', error);
        }
    };

    const handleDeleteCollection = async () => {
        console.log('Delete button clicked');
        try {
            console.log('Deleting collection:', selectedCollection._id);
            await deleteCollection(selectedCollection._id);
            await fetchUserCollections();
            setSelectedCollection(null);
            console.log('Collection deleted successfully:', selectedCollection._id);
        } catch (error) {
            console.error('Failed to delete collection:', error);
        }
    }

    return (
        <div className="notes-page">
            <Sidebar collections={collections} onSelectCollection={handleCollectionSelect} onCreateCollection={handleCreateCollection}/>
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
                        onCreateNote={handleCreateNote} // Pass the create note handler to NotesList
                    />
                )}
                {selectedNote && (
                    <NoteEditor note={selectedNote} onSave={handleNoteSave} onCancel={handleNoteCancel} 
                    onDelete={handleNoteDelete} onDeleteCollection={handleDeleteCollection} />
                )}
            </div>
        </div>
    );
};

export default NotesPage;
