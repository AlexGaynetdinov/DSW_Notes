import React from 'react';
import Sidebar from '../components/Sidebar';
import NoteCollections from '../components/NoteCollections';

const NotesPage = ({ user }) => {
  return (
    <div className="notes-page">
      <Sidebar user={user} />
      <div className="main-content">
        <h1>Notes Page</h1>
        <NoteCollections user={user} />
      </div>
    </div>
  );
};

export default NotesPage;
