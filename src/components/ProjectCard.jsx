import React from "react";

const styles = {
  card: {
    background: "#fff",
    borderRadius: "18px",
    overflow: "hidden",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    display: "flex",
    flexDirection: "column",
    minHeight: "100%",
  },
  image: {
    width: "100%",
    height: "180px",
    objectFit: "cover",
  },
  body: {
    padding: "1.5rem",
    display: "flex",
    flexDirection: "column",
    flex: 1,
    gap: "0.9rem",
  },
  h3: {
    margin: 0,
    color: "#1a1a2e",
    fontSize: "1.4rem",
  },
  techStack: {
    color: "#0f4c81",
    fontSize: "0.95rem",
    fontWeight: 600,
    margin: 0,
  },
  description: {
    color: "#555",
    fontSize: "0.95rem",
    lineHeight: 1.6,
    margin: 0,
    flex: 1,
  },
  viewButton: {
    width: "fit-content",
    padding: "0.85rem 1rem",
    borderRadius: "12px",
    border: "none",
    background: "#0f4c81",
    color: "#fff",
    cursor: "pointer",
    transition: "transform 0.2s ease, background 0.2s ease",
  },
};

const ProjectCard = ({ project, onView }) => {
  return (
    <div style={styles.card}>
      {project.imageUrl && (
        <img src={project.imageUrl} alt={project.title} style={styles.image} />
      )}
      <div style={styles.body}>
        <h3 style={styles.h3}>{project.title}</h3>
        <p style={styles.techStack}>{project.techStack}</p>
        <p style={styles.description}>{project.description}</p>
        {onView && (
          <button style={styles.viewButton} onClick={onView}>
            View Details
          </button>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
