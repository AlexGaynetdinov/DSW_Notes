import React, { createContext, useContext, useState } from 'react';
import { login as loginUser, getUserData } from '../api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);

  const login = async (username, password) => {
    try {
      const { token } = await loginUser(username, password);
      localStorage.setItem('token', token);
      setToken(token);

      // Get user data
      const userData = await getUserData(token);
      console.log('Received user data:', userData);
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);

      setIsAuthenticated(true);
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
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
