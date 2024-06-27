import React, { createContext, useContext, useState, useEffect } from 'react';
import { login as loginUser, getUserData, getUserCollections, getCollectionNotes } from '../api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);
  const [collections, setCollections] = useState([]);
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    if (token) {
      fetchUserData();
      fetchUserCollections();
    }
  }, [token]);

  const fetchUserData = async () => {
    try {
      const userData = await getUserData(token);
      console.log('Fetched user data:', userData);
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
    } catch (error) {
      console.error('Failed to fetch user data:', error);
    }
  };

  const fetchUserCollections = async () => {
    try {
      const collectionsData = await getUserCollections();
      console.log('Fetched collections data:', collectionsData);
      setCollections(collectionsData);
    } catch (error) {
      console.error('Failed to fetch collections:', error);
    }
  };

  const fetchCollectionNotes = async (collectionId) => {
    try {
      const notesData = await getCollectionNotes(collectionId);
      console.log('Fetched notes data:', notesData);
      setNotes(notesData);
    } catch (error) {
      console.error('Failed to fetch notes:', error);
    }
  };

  const login = async (username, password) => {
    try {
      const { token } = await loginUser(username, password);
      localStorage.setItem('token', token);
      setToken(token);
      setIsAuthenticated(true);
      await fetchUserData(); // Fetch and set user data after login (relogin error fix)
      await fetchUserCollections(); // Fetch collections after login
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
    setCollections([]);
    setNotes([]);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, collections, notes, login, logout, fetchCollectionNotes, fetchUserCollections }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
