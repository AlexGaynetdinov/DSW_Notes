import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './auth/AuthContext';
import './styles/App.css';
import ProtectedRoute from './auth/ProtectedRoute';
import Login from './pages/Login';
import Notes from './pages/Notes'; // Importa el componente Notes



function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/notes" element={<ProtectedRoute element={Notes} />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
