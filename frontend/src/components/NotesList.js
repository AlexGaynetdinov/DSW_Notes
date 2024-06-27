import React from 'react';
import '../styles/NotesList.css';

const NotesList = ({ collection, notes, editingName, newName, onNameChange, onNameEditStart, onNameEditEnd, onKeyDown, onNoteSelect }) => {
  return (
    <div className="notes-list">
      {editingName ? (
        <input
          type="text"
          className="collection-name-input"
          value={newName}
          onChange={onNameChange}
          onBlur={onNameEditEnd}
          onKeyDown={onKeyDown}
          autoFocus
        />
      ) : (
        <h2 className="collection-name" onClick={onNameEditStart}>
          {collection.name}
        </h2>
      )}
      <div className="notes-grid">
        {notes.map((note) => (
          <div key={note._id} className="note-card" onClick={() => onNoteSelect(note)}>
            <h3>{note.title}</h3>
            <p>{note.content}...</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotesList;
