import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      await login(username, password);
      navigate('/notes');
    } catch (error) {
      console.error('Login failed:', error);
      alert('Invalid credentials. Please try again.');
    }
  };

  return (
    <div style={styles.body}>
      <div className="login-container" style={styles.loginContainer}>
        <form className="login-form" style={styles.loginForm} onSubmit={handleLogin}>
          <h2>Login</h2>
          <div className="form-group" style={styles.formGroup}>
            <input
              type="text"
              id="username"
              name="username"
              required
              placeholder="Username"
              style={styles.input}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <span className="underline" style={styles.underline}></span>
            <span className="icon"><i className="fas fa-user"></i></span>
          </div>
          <div className="form-group" style={styles.formGroup}>
            <input
              type="password"
              id="password"
              name="password"
              required
              placeholder="Password"
              style={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className="underline" style={styles.underline}></span>
            <span className="icon"><i className="fas fa-lock"></i></span>
          </div>
          <div className="form-group" style={styles.formGroup}>
            <button type="submit" style={styles.button}>Login</button>
          </div>
          <div className="options" style={styles.options}>
            <a href="#" className="register-link">Register</a> | <a href="#" className="forgot-password-link">Forgot Password?</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;

const styles = {
  body: {
    fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
    background: '#f9f9f9',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    margin: 0,
  },
  loginContainer: {
    background: '#fff',
    padding: '40px',
    borderRadius: '12px',
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
  },
  loginForm: {
    maxWidth: '300px',
    margin: '0 auto',
  },
  formGroup: {
    position: 'relative',
    marginBottom: '20px',
  },
  input: {
    width: '100%',
    padding: '14px 20px',
    fontSize: '16px',
    border: 'none',
    background: 'transparent',
    transition: 'background-color 0.3s',
  },
  underline: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: '2px',
    backgroundColor: '#007bff',
    transform: 'scaleX(0)',
    transformOrigin: 'bottom right',
    transition: 'transform 0.3s ease',
  },
  button: {
    width: '100%',
    padding: '14px',
    fontSize: '16px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  options: {
    textAlign: 'center',
    marginTop: '20px',
  },
};
