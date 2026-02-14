import React from 'react';
import { Link } from 'react-router-dom';

const styles = {
  home: {
    minHeight: 'calc(100vh - 140px)'
  },
  hero: {
    background: 'linear-gradient(135deg, #0f4c81 0%, #1a1a2e 100%)',
    color: '#fff',
    textAlign: 'center',
    padding: '5rem 2rem'
  },
  h1: {
    fontSize: '3.5rem',
    margin: '0 0 1rem 0',
    fontWeight: 'bold'
  },
  tagline: {
    fontSize: '1.5rem',
    margin: '1rem 0 2rem 0',
    opacity: 0.95
  },
  ctaButtons: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  btn: {
    padding: '0.8rem 2rem',
    borderRadius: '25px',
    textDecoration: 'none',
    fontWeight: 500,
    transition: 'all 0.3s ease',
    display: 'inline-block'
  },
  btnPrimary: {
    background: '#fff',
    color: '#0f4c81'
  },
  btnSecondary: {
    background: 'transparent',
    color: '#fff',
    border: '2px solid #fff'
  },
  features: {
    maxWidth: '1200px',
    margin: '4rem auto',
    padding: '0 2rem',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '2rem'
  },
  feature: {
    textAlign: 'center',
    padding: '2rem',
    background: '#f8f9fa',
    borderRadius: '8px',
    transition: 'transform 0.3s ease'
  },
  featureH3: {
    color: '#1a1a2e',
    margin: '0 0 1rem 0',
    fontSize: '1.5rem'
  },
  featureP: {
    color: '#555',
    lineHeight: 1.6
  }
};

const Home = () => {
  return (
    <div style={styles.home}>
      <div style={styles.hero}>
        <h1 style={styles.h1}>InnoHack</h1>
        <p style={styles.tagline}>Discover Hackathons. Preserve Innovation.</p>
        <div style={styles.ctaButtons}>
          <Link to="/hackathons" style={{...styles.btn, ...styles.btnPrimary}}>Explore Hackathons</Link>
          <Link to="/repository" style={{...styles.btn, ...styles.btnSecondary}}>View Projects</Link>
        </div>
      </div>
      <div style={styles.features}>
        <div style={styles.feature}>
          <h3 style={styles.featureH3}>Discover Hackathons</h3>
          <p style={styles.featureP}>Find and participate in exciting hackathons from top colleges</p>
        </div>
        <div style={styles.feature}>
          <h3 style={styles.featureH3}>Track Applications</h3>
          <p style={styles.featureP}>Keep track of all your hackathon applications in one place</p>
        </div>
        <div style={styles.feature}>
          <h3 style={styles.featureH3}>Innovation Repository</h3>
          <p style={styles.featureP}>Explore amazing student projects and get inspired</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
