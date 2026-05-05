import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HackathonCard from "../components/HackathonCard.jsx";

const styles = {
  page: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "2rem 1.5rem",
    minHeight: "calc(100vh - 140px)",
  },
  header: { textAlign: "center", marginBottom: "2rem" },
  h1: { color: "#1a1a2e", fontSize: "2.5rem", margin: "0 0 0.5rem 0" },
  p: { color: "#7f8c8d", fontSize: "1.1rem" },
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
  banner: { padding: "1rem", borderRadius: "8px", marginBottom: "1.5rem" },
  bannerWarning: { background: "#f9e5d6", color: "#7a3f03" },
  bannerSuccess: { background: "#d6f5e9", color: "#1f5f3a" },
};

const Bookmarks = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const navigate = useNavigate();

  const loadBookmarks = () => {
    const stored = JSON.parse(
      localStorage.getItem("bookmarkedHackathons") || "[]",
    );
    setBookmarks(stored);
  };

  useEffect(() => {
    loadBookmarks();
    const handleUpdate = () => loadBookmarks();
    window.addEventListener("bookmarksUpdated", handleUpdate);
    window.addEventListener("storage", handleUpdate);
    return () => {
      window.removeEventListener("bookmarksUpdated", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

  const handleRemoveBookmark = (hackathonId) => {
    const updated = bookmarks.filter(
      (hackathon) => String(hackathon.id) !== String(hackathonId),
    );
    setBookmarks(updated);
    localStorage.setItem("bookmarkedHackathons", JSON.stringify(updated));
    window.dispatchEvent(new Event("bookmarksUpdated"));
  };

  const expiredCount = bookmarks.filter(
    (hackathon) => new Date(hackathon.deadline) < new Date(),
  ).length;
  const closingCount = bookmarks.filter((hackathon) => {
    const diff = Math.ceil(
      (new Date(hackathon.deadline) - new Date()) / (1000 * 60 * 60 * 24),
    );
    return diff >= 0 && diff <= 3;
  }).length;

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h1 style={styles.h1}>Bookmarks</h1>
        <p style={styles.p}>
          Your saved hackathons are shown here so you can revisit them later.
        </p>
      </div>
      {expiredCount > 0 && (
        <div style={{ ...styles.banner, ...styles.bannerWarning }}>
          {expiredCount} bookmarked hackathon
          {expiredCount > 1 ? "s have" : " has"} passed the deadline.
        </div>
      )}
      {closingCount > 0 && (
        <div style={{ ...styles.banner, ...styles.bannerSuccess }}>
          {closingCount} bookmarked hackathon
          {closingCount > 1 ? "s are" : " is"} closing soon!
        </div>
      )}
      <div style={styles.grid}>
        {bookmarks.length > 0 ? (
          bookmarks.map((hackathon) => (
            <HackathonCard
              key={hackathon.id}
              hackathon={hackathon}
              actionLabel="View Details"
              onAction={() => navigate(`/hackathons/${hackathon.id}`)}
              secondaryActionLabel="Remove Bookmark"
              onSecondaryAction={() => handleRemoveBookmark(hackathon.id)}
              showStatus
            />
          ))
        ) : (
          <p style={styles.noResults}>
            You don't have any bookmarked hackathons yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default Bookmarks;
