import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { hackathons as mockHackathons } from "../data/mockData";

const styles = {
  page: {
    maxWidth: "1100px",
    margin: "0 auto",
    padding: "2rem 1.5rem",
    minHeight: "calc(100vh - 140px)",
  },
  backButton: {
    display: "inline-block",
    marginBottom: "1.5rem",
    padding: "0.75rem 1.2rem",
    borderRadius: "10px",
    background: "#f4f6fb",
    color: "#1a1a2e",
    border: "1px solid #dce4f2",
    cursor: "pointer",
    textDecoration: "none",
  },
  detailCard: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "2rem",
    background: "#fff",
    borderRadius: "18px",
    boxShadow: "0 12px 30px rgba(0,0,0,0.08)",
    overflow: "hidden",
  },
  imageContainer: {
    minHeight: "420px",
    overflow: "hidden",
    background: "#f4f6fb",
  },
  image: { width: "100%", height: "100%", objectFit: "cover" },
  content: {
    padding: "2rem",
    display: "flex",
    flexDirection: "column",
    gap: "1.25rem",
  },
  title: { fontSize: "2rem", color: "#1a1a2e", margin: 0 },
  metaRow: {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: "1rem",
  },
  metaItem: {
    padding: "1rem",
    background: "#f4f6fb",
    borderRadius: "12px",
    color: "#3b4a68",
    fontSize: "0.95rem",
  },
  description: { color: "#4b5563", lineHeight: 1.75, fontSize: "1rem" },
  applyBtn: {
    marginTop: "auto",
    alignSelf: "flex-start",
    padding: "0.95rem 1.5rem",
    borderRadius: "12px",
    border: "none",
    background: "#0f4c81",
    color: "#fff",
    fontSize: "1rem",
    fontWeight: 600,
    cursor: "pointer",
  },
  appliedBtn: { background: "#27ae60", cursor: "default" },
  disabledBtn: { background: "#bdc3c7", cursor: "not-allowed" },
  successMsg: { color: "#27ae60", fontWeight: 500 },
  errorMsg: { color: "#e74c3c", fontWeight: 500 },
  emptyState: {
    padding: "4rem 2rem",
    textAlign: "center",
    background: "#fff",
    borderRadius: "18px",
    boxShadow: "0 12px 30px rgba(0,0,0,0.08)",
  },
};

const HackathonDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hackathon, setHackathon] = useState(null);
  const [isApplied, setIsApplied] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [message, setMessage] = useState("");
  const [bookmarkMessage, setBookmarkMessage] = useState("");

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    fetch(`/api/hackathons/${id}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data) {
          setHackathon(data);
          return;
        }
        const local = JSON.parse(
          localStorage.getItem("createdHackathons") || "[]",
        );
        const all = [...mockHackathons, ...local];
        setHackathon(all.find((h) => String(h.id) === String(id)) || null);
      })
      .catch(() => {
        const local = JSON.parse(
          localStorage.getItem("createdHackathons") || "[]",
        );
        const all = [...mockHackathons, ...local];
        setHackathon(all.find((h) => String(h.id) === String(id)) || null);
      });

    if (userId) {
      fetch(`/api/applications/user/${userId}`)
        .then((res) => res.json())
        .then((data) => {
          const applied = data.some(
            (a) => String(a.hackathon.id) === String(id),
          );
          setIsApplied(applied);
        })
        .catch(() => {});
    }

    const bookmarked = JSON.parse(
      localStorage.getItem("bookmarkedHackathons") || "[]",
    );
    setIsBookmarked(bookmarked.some((h) => String(h.id) === String(id)));
  }, [id, userId]);

  const handleApply = () => {
    if (!userId) {
      navigate("/login");
      return;
    }

    const applied = JSON.parse(
      localStorage.getItem("appliedHackathons") || "[]",
    );
    if (!applied.find((a) => String(a.id) === String(id))) {
      applied.push({ id: hackathon.id, hackathon });
      localStorage.setItem("appliedHackathons", JSON.stringify(applied));
    }

    if (hackathon.registrationUrl) {
      setMessage("Redirecting to registration page...");
      setTimeout(() => {
        window.location.href = hackathon.registrationUrl;
      }, 500);
    } else {
      setMessage("Successfully applied!");
    }
  };

  const handleBookmark = () => {
    if (!hackathon) return;
    const stored = JSON.parse(
      localStorage.getItem("bookmarkedHackathons") || "[]",
    );
    if (!stored.some((h) => String(h.id) === String(hackathon.id))) {
      const updated = [...stored, hackathon];
      localStorage.setItem("bookmarkedHackathons", JSON.stringify(updated));
      setIsBookmarked(true);
      setBookmarkMessage("Saved to bookmarks.");
      window.dispatchEvent(new Event("bookmarksUpdated"));
    }
  };

  if (!hackathon) {
    return (
      <div style={styles.page}>
        <button
          style={styles.backButton}
          onClick={() => navigate("/hackathons")}
        >
          ← Back to Hackathons
        </button>
        <div style={styles.emptyState}>
          <h2 style={{ color: "#1a1a2e" }}>Hackathon not found</h2>
          <p style={{ color: "#7f8c8d" }}>
            The hackathon you're looking for could not be found.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <button style={styles.backButton} onClick={() => navigate("/hackathons")}>
        ← Back to Hackathons
      </button>
      <div style={styles.detailCard}>
        <div style={styles.imageContainer}>
          {hackathon.posterUrl && (
            <img
              src={hackathon.posterUrl}
              alt={hackathon.name}
              style={styles.image}
            />
          )}
        </div>
        <div style={styles.content}>
          <h1 style={styles.title}>{hackathon.name}</h1>
          <div style={styles.metaRow}>
            <div style={styles.metaItem}>
              <strong>College</strong>
              <div>{hackathon.college}</div>
            </div>
            <div style={styles.metaItem}>
              <strong>Domain</strong>
              <div>{hackathon.domain}</div>
            </div>
            <div style={styles.metaItem}>
              <strong>Deadline</strong>
              <div>{new Date(hackathon.deadline).toLocaleDateString()}</div>
            </div>
            <div style={styles.metaItem}>
              <strong>Status</strong>
              <div>{isApplied ? "Applied" : "Open"}</div>
            </div>
          </div>
          <p style={styles.description}>{hackathon.description}</p>
          {message && (
            <p
              style={
                message.includes("Successfully")
                  ? styles.successMsg
                  : styles.errorMsg
              }
            >
              {message}
            </p>
          )}
          {bookmarkMessage && (
            <p style={styles.successMsg}>{bookmarkMessage}</p>
          )}
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <button
              style={
                isApplied
                  ? { ...styles.applyBtn, ...styles.appliedBtn }
                  : styles.applyBtn
              }
              onClick={handleApply}
            >
              {isApplied ? "Applied ✓" : "Apply Now →"}
            </button>
            <button
              style={
                isBookmarked
                  ? { ...styles.applyBtn, ...styles.appliedBtn }
                  : styles.applyBtn
              }
              onClick={handleBookmark}
              disabled={isBookmarked}
            >
              {isBookmarked ? "Bookmarked ✓" : "Bookmark"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HackathonDetails;
