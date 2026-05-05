import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const styles = {
  home: {
    minHeight: "calc(100vh - 140px)",
  },
  hero: {
    background: "linear-gradient(135deg, #0f4c81 0%, #1a1a2e 100%)",
    color: "#fff",
    textAlign: "center",
    padding: "5rem 2rem",
  },
  h1: {
    fontSize: "3.5rem",
    margin: "0 0 1rem 0",
    fontWeight: "bold",
  },
  tagline: {
    fontSize: "1.5rem",
    margin: "1rem 0 2rem 0",
    opacity: 0.95,
  },
  ctaButtons: {
    display: "flex",
    gap: "1rem",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  btn: {
    padding: "0.8rem 2rem",
    borderRadius: "25px",
    textDecoration: "none",
    fontWeight: 500,
    transition: "all 0.3s ease",
    display: "inline-block",
  },
  btnPrimary: {
    background: "#fff",
    color: "#0f4c81",
  },
  btnSecondary: {
    background: "transparent",
    color: "#fff",
    border: "2px solid #fff",
  },
  features: {
    maxWidth: "1200px",
    margin: "4rem auto",
    padding: "0 2rem",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "2rem",
  },
  feature: {
    textAlign: "center",
    padding: "2rem",
    background: "#f8f9fa",
    borderRadius: "8px",
    transition: "transform 0.3s ease",
  },
  featureH3: {
    color: "#1a1a2e",
    margin: "0 0 1rem 0",
    fontSize: "1.5rem",
  },
  featureP: {
    color: "#555",
    lineHeight: 1.6,
  },
  // Admin Dashboard Styles
  adminDashboard: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "2rem",
    minHeight: "calc(100vh - 140px)",
  },
  adminHeader: {
    textAlign: "center",
    marginBottom: "3rem",
  },
  sectionHeader: {
    margin: "3rem 0 1.5rem",
    fontSize: "2rem",
    color: "#1a1a2e",
  },
  cardGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "1.5rem",
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 2rem",
  },
  adminTitle: {
    color: "#1a1a2e",
    fontSize: "2.5rem",
    margin: "0 0 0.5rem 0",
  },
  adminSubtitle: {
    color: "#7f8c8d",
    fontSize: "1.2rem",
  },
  adminCards: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "2rem",
    marginTop: "2rem",
  },
  adminCard: {
    background: "#fff",
    borderRadius: "12px",
    padding: "2rem",
    textAlign: "center",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    textDecoration: "none",
    color: "inherit",
    display: "block",
  },
  adminCardHover: {
    transform: "translateY(-5px)",
    boxShadow: "0 8px 30px rgba(0, 0, 0, 0.12)",
  },
  adminCardTitle: {
    fontSize: "1.5rem",
    color: "#1a1a2e",
    margin: "0 0 0.5rem 0",
    fontWeight: "bold",
  },
  adminCardDesc: {
    color: "#7f8c8d",
    fontSize: "1rem",
    margin: 0,
  },
};

const Home = () => {
  const [userType, setUserType] = useState(null);

  useEffect(() => {
    const type = localStorage.getItem("userType")?.toUpperCase() || null;
    setUserType(type);
  }, []);

  // Admin Dashboard Component
  const AdminDashboard = () => (
    <div style={styles.adminDashboard}>
      <div style={styles.adminHeader}>
        <h1 style={styles.adminTitle}>Admin Dashboard</h1>
        <p style={styles.adminSubtitle}>
          Welcome back! Manage hackathons and achievements from your dashboard.
        </p>
      </div>
      <div style={styles.adminCards}>
        <Link to="/admin" style={styles.adminCard}>
          <h3 style={styles.adminCardTitle}>Add Hackathon</h3>
          <p style={styles.adminCardDesc}>
            Create new hackathon events for students to participate in
          </p>
        </Link>
        <Link to="/admin-hackathon-list" style={styles.adminCard}>
          <h3 style={styles.adminCardTitle}>Manage Hackathons</h3>
          <p style={styles.adminCardDesc}>
            View, edit, and delete existing hackathons
          </p>
        </Link>
        <Link to="/add-achievement" style={styles.adminCard}>
          <h3 style={styles.adminCardTitle}>Add Achievement</h3>
          <p style={styles.adminCardDesc}>
            Add innovative student projects to the repository
          </p>
        </Link>
      </div>
    </div>
  );

  // Student Home Component (existing)
  const StudentHome = () => (
    <div style={styles.home}>
      <div style={styles.hero}>
        <h1 style={styles.h1}>InnoHack</h1>
        <p style={styles.tagline}>Discover Hackathons. Preserve Innovation.</p>
        <div style={styles.ctaButtons}>
          <Link
            to="/hackathons"
            style={{ ...styles.btn, ...styles.btnPrimary }}
          >
            Explore Hackathons
          </Link>
          <Link
            to="/repository"
            style={{ ...styles.btn, ...styles.btnSecondary }}
          >
            View Projects
          </Link>
        </div>
      </div>
      <div style={styles.features}>
        <div style={styles.feature}>
          <h3 style={styles.featureH3}>Discover Hackathons</h3>
          <p style={styles.featureP}>
            Find and participate in exciting hackathons from top colleges
          </p>
        </div>
        <div style={styles.feature}>
          <h3 style={styles.featureH3}>Track Applications</h3>
          <p style={styles.featureP}>
            Keep track of all your hackathon applications in one place
          </p>
        </div>
        <div style={styles.feature}>
          <h3 style={styles.featureH3}>Innovation Repository</h3>
          <p style={styles.featureP}>
            Explore amazing student projects and get inspired
          </p>
        </div>
      </div>
    </div>
  );

  return userType === "ADMIN" ? <AdminDashboard /> : <StudentHome />;
};

export default Home;
