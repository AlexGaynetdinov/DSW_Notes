import React from 'react';

const NoteCollections = ({ user }) => {
  // Mock data for user's collections
  const collections = ['Collection 1', 'Collection 2', 'Collection 3'];

  return (
    <div className="note-collections">
      <h2>Your collections:</h2>
      <ul>
        {collections.map((collection, index) => (
          <li key={index}>{collection}</li>
        ))}
      </ul>
    </div>
  );
};

export default NoteCollections;
