import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const styles = {
  loginPage: {
    minHeight: 'calc(100vh - 140px)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'linear-gradient(135deg, #0f4c81 0%, #1a1a2e 100%)',
    padding: '2rem'
  },
  loginContainer: {
    background: '#fff',
    borderRadius: '12px',
    padding: '3rem',
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)',
    maxWidth: '450px',
    width: '100%'
  },
  h1: {
    color: '#1a1a2e',
    textAlign: 'center',
    margin: '0 0 0.5rem 0',
    fontSize: '2rem'
  },
  subtitle: {
    textAlign: 'center',
    color: '#7f8c8d',
    margin: '0 0 2rem 0',
    fontSize: '1rem'
  },
  userTypeToggle: {
    display: 'flex',
    gap: 0,
    marginBottom: '2rem',
    background: '#f5f6fa',
    borderRadius: '8px',
    padding: '4px'
  },
  toggleButton: {
    flex: 1,
    padding: '0.8rem',
    border: 'none',
    background: 'transparent',
    color: '#7f8c8d',
    fontSize: '1rem',
    fontWeight: 500,
    cursor: 'pointer',
    borderRadius: '6px',
    transition: 'all 0.3s ease'
  },
  toggleButtonActive: {
    background: '#0f4c81',
    color: '#fff'
  },
  loginForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem'
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column'
  },
  label: {
    color: '#1a1a2e',
    fontWeight: 500,
    marginBottom: '0.5rem',
    fontSize: '0.95rem'
  },
  input: {
    padding: '0.9rem',
    border: '2px solid #ddd',
    borderRadius: '8px',
    fontSize: '1rem',
    transition: 'border-color 0.3s ease'
  },
  loginBtn: {
    background: '#0f4c81',
    color: '#fff',
    padding: '1rem',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1.1rem',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    marginTop: '0.5rem'
  }
};

const Login = () => {
  const [userType, setUserType] = useState('student');
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (userType === 'admin') {
      localStorage.setItem('userType', 'admin');
      alert('Admin login successful!');
      navigate('/admin');
    } else {
      localStorage.setItem('userType', 'student');
      alert('Student login successful!');
      navigate('/hackathons');
    }
    
    window.location.reload();
  };

  return (
    <div style={styles.loginPage}>
      <div style={styles.loginContainer}>
        <h1 style={styles.h1}>Welcome to InnoHack</h1>
        <p style={styles.subtitle}>Discover Hackathons. Preserve Innovation.</p>
        
        <div style={styles.userTypeToggle}>
          <button
            style={userType === 'student' ? {...styles.toggleButton, ...styles.toggleButtonActive} : styles.toggleButton}
            onClick={() => setUserType('student')}
          >
            Student
          </button>
          <button
            style={userType === 'admin' ? {...styles.toggleButton, ...styles.toggleButtonActive} : styles.toggleButton}
            onClick={() => setUserType('admin')}
          >
            Admin
          </button>
        </div>

        <form onSubmit={handleSubmit} style={styles.loginForm}>
          <div style={styles.formGroup}>
            <label htmlFor="email" style={styles.label}>Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder={userType === 'admin' ? 'admin@innohack.com' : 'student@example.com'}
              style={styles.input}
              required
            />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="password" style={styles.label}>Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              style={styles.input}
              required
            />
          </div>
          <button type="submit" style={styles.loginBtn}>
            Login as {userType === 'admin' ? 'Admin' : 'Student'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
