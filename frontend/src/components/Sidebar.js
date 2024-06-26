import React, { useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import '../styles/Sidebar.css'; // Import your sidebar-specific styles

const Sidebar = () => {
  const { user, logout } = useAuth();
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="sidebar">
      <div className="user-profile">
        <div className="user-name" onClick={toggleDropdown}>
          {user.username}
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
          {user.collections &&
            user.collections.map((collection, index) => (
              <li key={index}>{collection}</li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
