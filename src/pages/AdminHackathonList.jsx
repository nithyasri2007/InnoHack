import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const styles = {
  page: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "2rem",
    minHeight: "calc(100vh - 140px)",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "2rem",
    flexWrap: "wrap",
    gap: "1rem",
  },
  headerContent: {
    flex: 1,
  },
  h1: { color: "#1a1a2e", fontSize: "2.5rem", margin: "0 0 0.5rem 0" },
  p: { color: "#7f8c8d", fontSize: "1.1rem", margin: 0 },
  backBtn: {
    padding: "0.8rem 1.5rem",
    background: "#7f8c8d",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    textDecoration: "none",
    fontSize: "1rem",
    cursor: "pointer",
    fontWeight: 500,
  },
  listContainer: {
    background: "#fff",
    borderRadius: "12px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    overflow: "hidden",
  },
  hackathonItem: {
    display: "flex",
    alignItems: "center",
    gap: "1.5rem",
    padding: "1.5rem",
    borderBottom: "1px solid #f0f0f0",
    transition: "background 0.3s ease",
  },
  hackathonItemHover: {
    background: "#f9fafb",
  },
  hackathonImage: {
    width: "120px",
    height: "80px",
    borderRadius: "12px",
    objectFit: "cover",
    background: "#f4f6fb",
    flexShrink: 0,
  },
  hackathonInfo: {
    flex: 1,
  },
  hackathonName: {
    margin: "0 0 0.5rem 0",
    color: "#1a1a2e",
    fontSize: "1.2rem",
    fontWeight: 600,
  },
  hackathonMeta: {
    color: "#7f8c8d",
    margin: 0,
    fontSize: "0.95rem",
    lineHeight: 1.5,
  },
  hackathonActions: {
    display: "flex",
    gap: "0.75rem",
    flexWrap: "wrap",
  },
  editBtn: {
    background: "#3498db",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    padding: "0.6rem 1rem",
    cursor: "pointer",
    fontWeight: 500,
    fontSize: "0.9rem",
  },
  deleteBtn: {
    background: "#e74c3c",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    padding: "0.6rem 1rem",
    cursor: "pointer",
    fontWeight: 500,
    fontSize: "0.9rem",
  },
  noHackathons: {
    textAlign: "center",
    padding: "3rem 2rem",
    color: "#7f8c8d",
    fontSize: "1.1rem",
  },
  loading: {
    textAlign: "center",
    padding: "2rem",
    color: "#7f8c8d",
  },
  successMsg: {
    color: "#27ae60",
    marginBottom: "1rem",
    padding: "1rem",
    background: "#e8f8f5",
    borderRadius: "8px",
  },
  errorMsg: {
    color: "#e74c3c",
    marginBottom: "1rem",
    padding: "1rem",
    background: "#fadbd8",
    borderRadius: "8px",
  },
};

const AdminHackathonList = () => {
  const [hackathons, setHackathons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [hoveredId, setHoveredId] = useState(null);

  const loadHackathons = async () => {
    setLoading(true);
    const localHackathons = JSON.parse(
      localStorage.getItem("createdHackathons") || "[]",
    );
    try {
      const res = await fetch("/api/hackathons");
      if (res.ok) {
        const data = await res.json();
        setHackathons([...data, ...localHackathons]);
      } else {
        setHackathons(localHackathons);
      }
    } catch {
      setHackathons(localHackathons);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHackathons();
  }, []);

  const deleteLocalHackathon = (id) => {
    const created = JSON.parse(
      localStorage.getItem("createdHackathons") || "[]",
    ).filter((h) => String(h.id) !== String(id));
    localStorage.setItem("createdHackathons", JSON.stringify(created));
  };

  const handleDelete = async (id, hackathonName) => {
    if (!window.confirm(`Delete "${hackathonName}"?`)) return;

    let removedFromBackend = false;
    try {
      const res = await fetch(`/api/hackathons/${id}`, { method: "DELETE" });
      removedFromBackend = res.ok;
    } catch {
      removedFromBackend = false;
    }

    deleteLocalHackathon(id);
    setHackathons((prev) => prev.filter((h) => String(h.id) !== String(id)));

    setSuccessMsg("hackathon deleted");

    setTimeout(() => {
      setSuccessMsg("");
      setErrorMsg("");
    }, 3000);
  };

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <div style={styles.headerContent}>
          <h1 style={styles.h1}>Manage Hackathons</h1>
          <p style={styles.p}>View and manage all hackathons in the system.</p>
        </div>
        <Link to="/admin" style={styles.backBtn}>
          ← Back to Admin
        </Link>
      </div>

      {successMsg && <p style={styles.successMsg}>{successMsg}</p>}
      {errorMsg && <p style={styles.errorMsg}>{errorMsg}</p>}

      {loading ? (
        <div style={styles.loading}>
          <p>Loading hackathons...</p>
        </div>
      ) : hackathons.length ? (
        <div style={styles.listContainer}>
          {hackathons.map((hackathon) => (
            <div
              key={hackathon.id}
              style={{
                ...styles.hackathonItem,
                ...(hoveredId === hackathon.id
                  ? styles.hackathonItemHover
                  : {}),
              }}
              onMouseEnter={() => setHoveredId(hackathon.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {hackathon.posterUrl && (
                <img
                  src={hackathon.posterUrl}
                  alt={hackathon.name}
                  style={styles.hackathonImage}
                />
              )}
              <div style={styles.hackathonInfo}>
                <h3 style={styles.hackathonName}>{hackathon.name}</h3>
                <p style={styles.hackathonMeta}>
                  <strong>College:</strong> {hackathon.college}
                </p>
                <p style={styles.hackathonMeta}>
                  <strong>Domain:</strong> {hackathon.domain}
                </p>
                <p style={styles.hackathonMeta}>
                  <strong>Deadline:</strong>{" "}
                  {new Date(hackathon.deadline).toLocaleDateString()}
                </p>
              </div>
              <div style={styles.hackathonActions}>
                <button
                  style={styles.editBtn}
                  onClick={() => alert("Edit functionality coming soon!")}
                >
                  Edit
                </button>
                <button
                  style={styles.deleteBtn}
                  onClick={() => handleDelete(hackathon.id, hackathon.name)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={styles.noHackathons}>
          <p>No hackathons found. Create one to get started!</p>
          <Link to="/admin" style={styles.backBtn}>
            Add New Hackathon
          </Link>
        </div>
      )}
    </div>
  );
};

export default AdminHackathonList;
