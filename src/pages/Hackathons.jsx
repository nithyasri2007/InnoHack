import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import HackathonCard from "../components/HackathonCard.jsx";
import { hackathons as mockHackathons } from "../data/mockData";

const styles = {
  page: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "2rem 1.5rem",
    minHeight: "calc(100vh - 140px)",
  },
  header: { textAlign: "center", marginBottom: "1.75rem" },
  h1: { color: "#1a1a2e", fontSize: "2.5rem", margin: "0 0 0.5rem 0" },
  p: { color: "#7f8c8d", fontSize: "1.1rem" },
  filters: {
    display: "grid",
    gridTemplateColumns: "1fr auto auto auto",
    gap: "1rem",
    marginBottom: "1.75rem",
  },
  searchBar: {
    flex: 1,
    minWidth: "250px",
    padding: "0.9rem 1rem",
    border: "2px solid #ddd",
    borderRadius: "12px",
    fontSize: "1rem",
    outline: "none",
  },
  select: {
    padding: "0.9rem 1rem",
    border: "2px solid #ddd",
    borderRadius: "12px",
    fontSize: "1rem",
    background: "#fff",
    cursor: "pointer",
    minWidth: "150px",
  },
  banner: {
    padding: "1rem 1.25rem",
    borderRadius: "12px",
    marginBottom: "1.5rem",
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
  },
  bannerWarning: { background: "#f9e5d6", color: "#7a3f03" },
  bannerSuccess: { background: "#d6f5e9", color: "#1f5f3a" },
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

const getStatusByDeadline = (deadline) => {
  const diff = Math.ceil(
    (new Date(deadline) - new Date()) / (1000 * 60 * 60 * 24),
  );
  if (diff < 0) return "Completed";
  if (diff <= 7) return "Ongoing";
  return "Upcoming";
};

const Hackathons = () => {
  const [hackathons, setHackathons] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDomain, setSelectedDomain] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [sortOrder, setSortOrder] = useState("asc");
  const [appliedIds, setAppliedIds] = useState(new Set());
  const [bookmarkedIds, setBookmarkedIds] = useState(new Set());
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    fetch("/api/hackathons")
      .then((res) => res.json())
      .then((data) => {
        const local = JSON.parse(
          localStorage.getItem("createdHackathons") || "[]",
        );
        setHackathons([...data, ...local]);
      })
      .catch(() => {
        const local = JSON.parse(
          localStorage.getItem("createdHackathons") || "[]",
        );
        setHackathons([...mockHackathons, ...local]);
      });

    if (userId) {
      fetch(`/api/applications/user/${userId}`)
        .then((res) => res.json())
        .then((data) => setAppliedIds(new Set(data.map((a) => a.hackathon.id))))
        .catch(() => {});
    }

    const storedBookmarks = JSON.parse(
      localStorage.getItem("bookmarkedHackathons") || "[]",
    );
    setBookmarkedIds(new Set(storedBookmarks.map((h) => String(h.id))));
  }, [userId]);

  const domains = useMemo(
    () => ["All", ...new Set(hackathons.map((h) => h.domain))],
    [hackathons],
  );

  const filteredHackathons = hackathons
    .filter((h) => {
      const term = searchTerm.trim().toLowerCase();
      const matchesSearch = [h.name, h.college, h.domain].some((f) =>
        f.toLowerCase().includes(term),
      );
      const matchesDomain =
        selectedDomain === "All" || h.domain === selectedDomain;
      const matchesStatus =
        selectedStatus === "All" ||
        getStatusByDeadline(h.deadline) === selectedStatus;
      return matchesSearch && matchesDomain && matchesStatus;
    })
    .sort((a, b) => {
      const diff = new Date(a.deadline) - new Date(b.deadline);
      return sortOrder === "asc" ? diff : -diff;
    });

  const closeDeadlines = hackathons.filter((h) => {
    const diff = Math.ceil(
      (new Date(h.deadline) - new Date()) / (1000 * 60 * 60 * 24),
    );
    return diff >= 0 && diff <= 3;
  });
  const expiredHackathons = hackathons.filter(
    (h) => new Date(h.deadline) < new Date(),
  );

  const handleBookmark = (hackathon) => {
    const stored = JSON.parse(
      localStorage.getItem("bookmarkedHackathons") || "[]",
    );
    if (!stored.some((h) => String(h.id) === String(hackathon.id))) {
      const updated = [...stored, hackathon];
      localStorage.setItem("bookmarkedHackathons", JSON.stringify(updated));
      setBookmarkedIds(new Set(updated.map((h) => String(h.id))));
      window.dispatchEvent(new Event("bookmarksUpdated"));
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h1 style={styles.h1}>Discover Hackathons</h1>
        <p style={styles.p}>
          Find and participate in exciting hackathons with smart filters and
          deadline alerts.
        </p>
      </div>
      {expiredHackathons.length > 0 && (
        <div style={{ ...styles.banner, ...styles.bannerWarning }}>
          <strong>Notice:</strong> {expiredHackathons.length} hackathon
          {expiredHackathons.length > 1 ? "s have" : " has"} passed the
          deadline.
        </div>
      )}
      {closeDeadlines.length > 0 && (
        <div style={{ ...styles.banner, ...styles.bannerSuccess }}>
          <strong>Heads up:</strong> {closeDeadlines.length} hackathon
          {closeDeadlines.length > 1 ? "s are" : " is"} closing soon.
        </div>
      )}
      <div style={styles.filters}>
        <input
          type="text"
          placeholder="Search by name, college, or domain"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={styles.searchBar}
        />
        <select
          value={selectedDomain}
          onChange={(e) => setSelectedDomain(e.target.value)}
          style={styles.select}
        >
          {domains.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          style={styles.select}
        >
          <option value="All">All Statuses</option>
          <option value="Upcoming">Upcoming</option>
          <option value="Ongoing">Ongoing</option>
          <option value="Completed">Completed</option>
        </select>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          style={styles.select}
        >
          <option value="asc">Deadline: Earliest First</option>
          <option value="desc">Deadline: Latest First</option>
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
              secondaryActionLabel={
                bookmarkedIds.has(String(hackathon.id))
                  ? "Bookmarked ✓"
                  : "Bookmark"
              }
              onSecondaryAction={() => handleBookmark(hackathon)}
              secondaryDisabled={bookmarkedIds.has(String(hackathon.id))}
              isApplied={appliedIds.has(hackathon.id)}
              showStatus
            />
          ))
        ) : (
          <p style={styles.noResults}>
            No hackathons found. Try adjusting your filters.
          </p>
        )}
      </div>
    </div>
  );
};

export default Hackathons;
