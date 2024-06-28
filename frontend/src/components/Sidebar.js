import React, { useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import '../styles/Sidebar.css';

const Sidebar = ({ onSelectCollection, onCreateCollection }) => {
  const { user, collections, logout, fetchCollectionNotes } = useAuth();
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible((prevVisible) => !prevVisible);
  };

  const handleLogout = () => {
    logout();
  };

  const handleCreateCollection = () => {
    onCreateCollection();
  }

  const handleCollectionClick = (collectionId) => {
    fetchCollectionNotes(collectionId);
    const selectedCollection = collections.find((c) => c._id === collectionId);
    onSelectCollection(selectedCollection); // Call onSelectCollection with selected collection
  };

  return (
    <div className="sidebar">
      <div className="user-profile">
        <div className="user-name" onClick={toggleDropdown}>
          <h3>{user.username}'s Notes</h3>
          {dropdownVisible && (
            <div className="dropdown">
              <ul>
                <li>Email: {user.email}</li>
                <li onClick={handleLogout}>Log Out</li>
              </ul>
            </div>
          )}
        </div>
      </div>
      <div className="friends-button">
        <button>Friends</button>
      </div>
      <div className="note-collections">
        <h3>Your collections:</h3>
        <ul>
          {collections.map((collection) => (
            <li
              key={collection._id}
              onClick={() => handleCollectionClick(collection._id)}
            >
              {collection.name}
            </li>
          ))}
        </ul>
      </div>
      <div className="create-collection-button" onClick={handleCreateCollection}>
        <button>New Collection</button>
      </div>
    </div>
  );
};

export default Sidebar;
