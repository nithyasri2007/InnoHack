import React, { useEffect, useState } from "react";
import HackathonCard from "../components/HackathonCard.jsx";

const styles = {
  page: { maxWidth: "1200px", margin: "0 auto", padding: "2rem", minHeight: "calc(100vh - 140px)" },
  header: { textAlign: "center", marginBottom: "2rem" },
  h1: { color: "#1a1a2e", fontSize: "2.5rem", margin: "0 0 0.5rem 0" },
  p: { color: "#7f8c8d", fontSize: "1.1rem" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "1.5rem" },
  noResults: { textAlign: "center", color: "#7f8c8d", fontSize: "1.2rem", gridColumn: "1 / -1", padding: "3rem" },
  banner: { padding: "1rem", borderRadius: "8px", marginBottom: "1.5rem" },
  bannerWarning: { background: "#f9e5d6", color: "#7a3f03" },
  bannerSuccess: { background: "#d6f5e9", color: "#1f5f3a" },
};

const MyHackathons = () => {
  const [myHackathons, setMyHackathons] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!userId) return;
    fetch(`/api/applications/user/${userId}`)
      .then((res) => res.json())
      .then((data) => setMyHackathons(data))
      .catch(() => setMyHackathons([]));
  }, [userId]);

  const handleWithdraw = async (applicationId) => {
    await fetch(`/api/applications/${applicationId}`, { method: "DELETE" });
    setMyHackathons((prev) => prev.filter((a) => a.id !== applicationId));
  };

  const expiredCount = myHackathons.filter((a) => new Date(a.hackathon.deadline) < new Date()).length;
  const closingCount = myHackathons.filter((a) => {
    const diff = Math.ceil((new Date(a.hackathon.deadline) - new Date()) / (1000 * 60 * 60 * 24));
    return diff >= 0 && diff <= 3;
  }).length;

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h1 style={styles.h1}>My Hackathons</h1>
        <p style={styles.p}>Track your hackathon applications and deadlines.</p>
      </div>
      {expiredCount > 0 && (
        <div style={{ ...styles.banner, ...styles.bannerWarning }}>
          {expiredCount} hackathon{expiredCount > 1 ? "s have" : " has"} passed the deadline.
        </div>
      )}
      {closingCount > 0 && (
        <div style={{ ...styles.banner, ...styles.bannerSuccess }}>
          {closingCount} hackathon{closingCount > 1 ? "s are" : " is"} closing soon!
        </div>
      )}
      <div style={styles.grid}>
        {myHackathons.length > 0 ? (
          myHackathons.map((application) => (
            <HackathonCard
              key={application.id}
              hackathon={application.hackathon}
              actionLabel="Withdraw"
              onAction={() => handleWithdraw(application.id)}
              isApplied
              showStatus
            />
          ))
        ) : (
          <p style={styles.noResults}>You haven't applied to any hackathons yet.</p>
        )}
      </div>
    </div>
  );
};

export default MyHackathons;
