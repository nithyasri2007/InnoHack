import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const styles = {
  navbar: {
    background: '#1a1a2e',
    height: '70px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'sticky',
    top: 0,
    zIndex: 999,
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
  },
  navContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    maxWidth: '1200px',
    padding: '0 20px'
  },
  navLogo: {
    color: '#fff',
    fontSize: '1.8rem',
    fontWeight: 'bold',
    textDecoration: 'none',
    cursor: 'pointer'
  },
  navMenu: {
    display: 'flex',
    listStyle: 'none',
    margin: 0,
    padding: 0,
    gap: '2rem'
  },
  navMenuMobile: {
    flexDirection: 'column',
    width: '100%',
    position: 'absolute',
    top: '70px',
    left: 0,
    background: '#1a1a2e',
    padding: 0,
    gap: 0
  },
  navItem: {
    height: '70px',
    display: 'flex',
    alignItems: 'center'
  },
  navLink: {
    color: '#fff',
    textDecoration: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '4px'
  },
  loginBtn: {
    background: '#0f4c81',
    padding: '0.5rem 1.2rem',
    borderRadius: '20px',
    color: '#fff',
    textDecoration: 'none'
  },
  logoutBtn: {
    background: '#e74c3c',
    border: 'none',
    cursor: 'pointer',
    fontSize: '1rem',
    color: '#fff',
    padding: '0.5rem 1rem',
    borderRadius: '4px'
  },
  menuIcon: {
    display: 'none',
    flexDirection: 'column',
    cursor: 'pointer'
  },
  menuIconSpan: {
    width: '25px',
    height: '3px',
    background: '#fff',
    margin: '3px 0'
  }
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userType, setUserType] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const navigate = useNavigate();

  useEffect(() => {
    const type = localStorage.getItem('userType');
    setUserType(type);

    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userType');
    setUserType(null);
    navigate('/login');
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.navContainer}>
        <Link to="/" style={styles.navLogo}>InnoHack</Link>
        {isMobile && (
          <div style={styles.menuIcon} onClick={() => setIsOpen(!isOpen)}>
            <span style={styles.menuIconSpan}></span>
            <span style={styles.menuIconSpan}></span>
            <span style={styles.menuIconSpan}></span>
          </div>
        )}
        <ul style={isMobile && isOpen ? {...styles.navMenu, ...styles.navMenuMobile} : styles.navMenu}>
          <li style={styles.navItem}>
            <Link to="/" style={styles.navLink} onClick={() => setIsOpen(false)}>Home</Link>
          </li>
          
          {userType === 'student' && (
            <>
              <li style={styles.navItem}>
                <Link to="/hackathons" style={styles.navLink} onClick={() => setIsOpen(false)}>Hackathons</Link>
              </li>
              <li style={styles.navItem}>
                <Link to="/my-hackathons" style={styles.navLink} onClick={() => setIsOpen(false)}>My Hackathons</Link>
              </li>
              <li style={styles.navItem}>
                <Link to="/repository" style={styles.navLink} onClick={() => setIsOpen(false)}>Repository</Link>
              </li>
            </>
          )}

          {userType === 'admin' && (
            <>
              <li style={styles.navItem}>
                <Link to="/admin" style={styles.navLink} onClick={() => setIsOpen(false)}>Add Hackathon</Link>
              </li>
              <li style={styles.navItem}>
                <Link to="/add-achievement" style={styles.navLink} onClick={() => setIsOpen(false)}>Add Achievement</Link>
              </li>
            </>
          )}

          {!userType ? (
            <li style={styles.navItem}>
              <Link to="/login" style={styles.loginBtn} onClick={() => setIsOpen(false)}>Login</Link>
            </li>
          ) : (
            <li style={styles.navItem}>
              <button style={styles.logoutBtn} onClick={handleLogout}>Logout</button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
