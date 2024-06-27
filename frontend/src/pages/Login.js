import React from 'react';
import LoginForm from '../components/LoginForm';

const Login = () => {
  return (
    <div className="login-page">
      <header className="login-header">
        <h1>Welcome to Notes</h1>
      </header>
      <main>
        <LoginForm />
      </main>
      <footer className="login-footer">
        <p>&copy; 2024 L10 Notes</p>
      </footer>
    </div>
  );
};

export default Login;
