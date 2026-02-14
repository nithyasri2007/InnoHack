import React from 'react';
import ProjectCard from '../components/ProjectCard.jsx';
import { projects } from '../data/mockData';
import './Repository.css';

const Repository = () => {
  return (
    <div className="repository-page">
      <div className="page-header">
        <h1>Innovation Repository</h1>
        <p>Explore amazing student projects</p>
      </div>
      <div className="projects-grid">
        {projects.map(project => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
};

export default Repository;
