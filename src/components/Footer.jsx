import React from 'react';

const styles = {
  footer: {
    background: '#1a1a2e',
    color: '#fff',
    padding: '2rem 0',
    marginTop: 'auto',
    textAlign: 'center'
  },
  footerContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px'
  },
  footerP: {
    margin: '0.5rem 0',
    fontSize: '0.9rem'
  }
};

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.footerContent}>
        <p style={styles.footerP}>&copy; 2024 InnoHack. All rights reserved.</p>
        <p style={styles.footerP}>Empowering student innovation through hackathons</p>
      </div>
    </footer>
  );
};

export default Footer;
