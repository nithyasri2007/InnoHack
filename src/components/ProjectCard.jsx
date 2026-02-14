import React from 'react';

const styles = {
  card: {
    background: '#fff',
    borderRadius: '8px',
    padding: '1.5rem',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease'
  },
  h3: {
    margin: '0 0 0.8rem 0',
    color: '#1a1a2e',
    fontSize: '1.2rem'
  },
  techStack: {
    color: '#0f4c81',
    fontSize: '0.9rem',
    fontWeight: 500,
    margin: '0.5rem 0'
  },
  description: {
    color: '#555',
    fontSize: '0.95rem',
    lineHeight: 1.6,
    margin: '1rem 0 0 0'
  }
};

const ProjectCard = ({ project }) => {
  return (
    <div style={styles.card}>
      <h3 style={styles.h3}>{project.title}</h3>
      <p style={styles.techStack}>{project.techStack}</p>
      <p style={styles.description}>{project.description}</p>
    </div>
  );
};

export default ProjectCard;
