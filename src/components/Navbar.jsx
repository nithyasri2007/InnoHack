import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const styles = {
  navbar: {
    background: "#1a1a2e",
    height: "70px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "sticky",
    top: 0,
    zIndex: 999,
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
  },
  navContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    maxWidth: "1200px",
    padding: "0 20px",
  },
  navLogo: {
    color: "#fff",
    fontSize: "1.8rem",
    fontWeight: "bold",
    textDecoration: "none",
    cursor: "pointer",
  },
  navMenu: {
    display: "flex",
    listStyle: "none",
    margin: 0,
    padding: 0,
    gap: "1rem",
    alignItems: "center",
  },
  navMenuMobile: {
    flexDirection: "column",
    width: "100%",
    position: "absolute",
    top: "70px",
    left: 0,
    background: "#1a1a2e",
    padding: "1rem 0",
    gap: 0,
  },
  navItem: {
    height: "70px",
    display: "flex",
    alignItems: "center",
  },
  navLink: {
    color: "#fff",
    textDecoration: "none",
    padding: "0.5rem 1rem",
    borderRadius: "4px",
    transition: "background 0.25s ease",
  },
  navLinkActive: {
    background: "#0f4c81",
  },
  loginBtn: {
    background: "#0f4c81",
    padding: "0.5rem 1.2rem",
    borderRadius: "20px",
    color: "#fff",
    textDecoration: "none",
  },
  logoutBtn: {
    background: "#e74c3c",
    border: "none",
    cursor: "pointer",
    fontSize: "1rem",
    color: "#fff",
    padding: "0.5rem 1rem",
    borderRadius: "4px",
  },
  menuIcon: {
    display: "flex",
    flexDirection: "column",
    cursor: "pointer",
  },
  menuIconSpan: {
    width: "25px",
    height: "3px",
    background: "#fff",
    margin: "3px 0",
  },
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userType, setUserType] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const type = localStorage.getItem("userType");
    setUserType(type);

    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userType");
    setUserType(null);
    navigate("/login");
  };

  const renderLink = (to, label) => {
    const isActive = location.pathname === to;
    return (
      <li style={styles.navItem}>
        <Link
          to={to}
          style={{
            ...styles.navLink,
            ...(isActive ? styles.navLinkActive : {}),
          }}
          onClick={() => setIsOpen(false)}
        >
          {label}
        </Link>
      </li>
    );
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.navContainer}>
        <Link to="/" style={styles.navLogo}>
          InnoHack
        </Link>
        {isMobile && (
          <div style={styles.menuIcon} onClick={() => setIsOpen(!isOpen)}>
            <span style={styles.menuIconSpan}></span>
            <span style={styles.menuIconSpan}></span>
            <span style={styles.menuIconSpan}></span>
          </div>
        )}
        <ul
          style={
            isMobile && isOpen
              ? { ...styles.navMenu, ...styles.navMenuMobile }
              : styles.navMenu
          }
        >
          {renderLink("/", "Home")}
          {userType === "STUDENT" && renderLink("/hackathons", "Hackathons")}
          {userType === "STUDENT" && renderLink("/bookmarks", "Bookmarks")}
          {userType === "STUDENT" && renderLink("/repository", "Repository")}
          {userType === "ADMIN" && renderLink("/admin", "Add Hackathon")}
          {userType === "ADMIN" &&
            renderLink("/add-achievement", "Add Achievement")}
          {!userType ? (
            <li style={styles.navItem}>
              <Link
                to="/login"
                style={styles.loginBtn}
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
            </li>
          ) : (
            <li style={styles.navItem}>
              <button style={styles.logoutBtn} onClick={handleLogout}>
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
