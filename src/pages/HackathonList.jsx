import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import HackathonCard from "../components/HackathonCard.jsx";
import { hackathons as mockHackathons } from "../data/mockData";

const styles = {
  page: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "2rem",
    minHeight: "calc(100vh - 140px)",
  },
  header: { textAlign: "center", marginBottom: "2rem" },
  h1: { color: "#1a1a2e", fontSize: "2.5rem", margin: "0 0 0.5rem 0" },
  p: { color: "#7f8c8d", fontSize: "1.1rem", margin: 0 },
  controls: {
    display: "flex",
    gap: "1rem",
    marginBottom: "2rem",
    flexWrap: "wrap",
  },
  input: {
    flex: 1,
    minWidth: "250px",
    padding: "0.9rem 1rem",
    border: "2px solid #ddd",
    borderRadius: "12px",
    fontSize: "1rem",
  },
  select: {
    padding: "0.9rem 1rem",
    border: "2px solid #ddd",
    borderRadius: "12px",
    fontSize: "1rem",
    background: "#fff",
    cursor: "pointer",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
    gap: "1.5rem",
  },
  noResults: {
    textAlign: "center",
    color: "#7f8c8d",
    fontSize: "1.2rem",
    gridColumn: "1 / -1",
    padding: "3rem",
  },
};

const HackathonList = () => {
  const [hackathons, setHackathons] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDomain, setSelectedDomain] = useState("All");
  const navigate = useNavigate();

  useEffect(() => {
    const loadHackathons = async () => {
      const localHackathons = JSON.parse(
        localStorage.getItem("createdHackathons") || "[]",
      );
      try {
        const res = await fetch("/api/hackathons");
        if (res.ok) {
          const data = await res.json();
          setHackathons([...data, ...localHackathons]);
          return;
        }
      } catch {
        // ignore
      }
      setHackathons([...mockHackathons, ...localHackathons]);
    };
    loadHackathons();
  }, []);

  const domains = useMemo(
    () => ["All", ...new Set(hackathons.map((h) => h.domain))],
    [hackathons],
  );

  const filteredHackathons = hackathons
    .filter((h) => {
      const term = searchTerm.trim().toLowerCase();
      const matchesSearch = [h.name, h.college, h.domain].some((field) =>
        field.toLowerCase().includes(term),
      );
      const matchesDomain =
        selectedDomain === "All" || h.domain === selectedDomain;
      return matchesSearch && matchesDomain;
    })
    .sort((a, b) => new Date(a.deadline) - new Date(b.deadline));

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h1 style={styles.h1}>Hackathon Lists</h1>
        <p style={styles.p}>Explore all hackathons available right now.</p>
      </div>
      <div style={styles.controls}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by name, college, or domain"
          style={styles.input}
        />
        <select
          value={selectedDomain}
          onChange={(e) => setSelectedDomain(e.target.value)}
          style={styles.select}
        >
          {domains.map((domain) => (
            <option key={domain} value={domain}>
              {domain}
            </option>
          ))}
        </select>
      </div>
      <div style={styles.grid}>
        {filteredHackathons.length > 0 ? (
          filteredHackathons.map((hackathon) => (
            <HackathonCard
              key={hackathon.id}
              hackathon={hackathon}
              actionLabel="View Details"
              onAction={() => navigate(`/hackathons/${hackathon.id}`)}
              showStatus
            />
          ))
        ) : (
          <p style={styles.noResults}>
            No hackathons found. Adjust your search or filters.
          </p>
        )}
      </div>
    </div>
  );
};

export default HackathonList;
