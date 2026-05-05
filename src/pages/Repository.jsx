import React, { useEffect, useMemo, useState } from "react";
import ProjectCard from "../components/ProjectCard.jsx";

const styles = {
  page: { maxWidth: "1200px", margin: "0 auto", padding: "2rem", minHeight: "calc(100vh - 140px)" },
  header: { textAlign: "center", marginBottom: "2rem" },
  h1: { color: "#1a1a2e", fontSize: "2.5rem", margin: "0 0 0.5rem 0" },
  p: { color: "#7f8c8d", fontSize: "1.1rem" },
  controls: { display: "flex", gap: "1rem", marginBottom: "2rem", flexWrap: "wrap" },
  input: { flex: 1, minWidth: "250px", padding: "0.9rem 1rem", border: "2px solid #ddd", borderRadius: "12px", fontSize: "1rem" },
  select: { padding: "0.9rem 1rem", border: "2px solid #ddd", borderRadius: "12px", fontSize: "1rem", background: "#fff", cursor: "pointer" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "1.5rem" },
  noResults: { textAlign: "center", color: "#7f8c8d", fontSize: "1.2rem", gridColumn: "1 / -1", padding: "3rem" },
};

const Repository = () => {
  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => {
        const local = JSON.parse(localStorage.getItem("createdAchievements") || "[]");
        setProjects([...data, ...local]);
      })
      .catch(() => {
        const local = JSON.parse(localStorage.getItem("createdAchievements") || "[]");
        setProjects(local);
      });
  }, []);

  const filteredProjects = projects.filter((p) => {
    const term = searchTerm.trim().toLowerCase();
    return [p.title, p.description, p.techStack].some((f) => f.toLowerCase().includes(term));
  });

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h1 style={styles.h1}>Innovation Repository</h1>
        <p style={styles.p}>Explore amazing student projects.</p>
      </div>
      <div style={styles.controls}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search projects by title, description or tech stack"
          style={styles.input}
        />
      </div>
      <div style={styles.grid}>
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))
        ) : (
          <p style={styles.noResults}>No projects found.</p>
        )}
      </div>
    </div>
  );
};

export default Repository;
