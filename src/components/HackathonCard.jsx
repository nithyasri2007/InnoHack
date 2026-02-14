import React from 'react';

const styles = {
  card: {
    background: '#fff',
    borderRadius: '8px',
    padding: '1.5rem',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    position: 'relative'
  },
  h3: {
    margin: '0 0 0.5rem 0',
    color: '#1a1a2e',
    fontSize: '1.3rem'
  },
  college: {
    color: '#7f8c8d',
    fontSize: '0.9rem',
    margin: '0.5rem 0'
  },
  cardDetails: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '1rem 0',
    flexWrap: 'wrap',
    gap: '0.5rem'
  },
  domain: {
    background: '#0f4c81',
    color: '#fff',
    padding: '0.3rem 0.8rem',
    borderRadius: '20px',
    fontSize: '0.85rem'
  },
  deadline: {
    color: '#e74c3c',
    fontSize: '0.9rem',
    fontWeight: 500
  },
  description: {
    color: '#555',
    fontSize: '0.95rem',
    margin: '1rem 0 0 0',
    lineHeight: 1.5
  },
  status: {
    position: 'absolute',
    top: '1rem',
    right: '1rem',
    background: '#27ae60',
    color: '#fff',
    padding: '0.3rem 0.8rem',
    borderRadius: '20px',
    fontSize: '0.8rem'
  }
};

const HackathonCard = ({ hackathon }) => {
  return (
    <div style={styles.card}>
      <h3 style={styles.h3}>{hackathon.name}</h3>
      <p style={styles.college}>{hackathon.college}</p>
      <div style={styles.cardDetails}>
        <span style={styles.domain}>{hackathon.domain}</span>
        <span style={styles.deadline}>Deadline: {new Date(hackathon.deadline).toLocaleDateString()}</span>
      </div>
      {hackathon.description && <p style={styles.description}>{hackathon.description}</p>}
      {hackathon.status && <span style={styles.status}>{hackathon.status}</span>}
    </div>
  );
};

export default HackathonCard;
