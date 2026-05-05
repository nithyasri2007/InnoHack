import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const styles = {
  loginPage: {
    minHeight: "calc(100vh - 140px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #0f4c81 0%, #1a1a2e 100%)",
    padding: "2rem",
  },
  loginContainer: {
    background: "#fff",
    borderRadius: "12px",
    padding: "3rem",
    boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
    maxWidth: "450px",
    width: "100%",
  },
  h1: { color: "#1a1a2e", textAlign: "center", margin: "0 0 0.5rem 0", fontSize: "2rem" },
  subtitle: { textAlign: "center", color: "#7f8c8d", margin: "0 0 2rem 0", fontSize: "1rem" },
  form: { display: "flex", flexDirection: "column", gap: "1.5rem" },
  formGroup: { display: "flex", flexDirection: "column" },
  label: { color: "#1a1a2e", fontWeight: 500, marginBottom: "0.5rem", fontSize: "0.95rem" },
  input: { padding: "0.9rem", border: "2px solid #ddd", borderRadius: "8px", fontSize: "1rem" },
  btn: {
    background: "#0f4c81", color: "#fff", padding: "1rem",
    border: "none", borderRadius: "8px", fontSize: "1.1rem",
    fontWeight: 600, cursor: "pointer", marginTop: "0.5rem",
  },
  error: {
    background: "#fdecea", color: "#c0392b", padding: "0.8rem",
    borderRadius: "8px", fontSize: "0.9rem", textAlign: "center",
  },
  registerLink: { textAlign: "center", marginTop: "1.5rem", fontSize: "0.95rem", color: "#7f8c8d" },
  registerLinkA: { color: "#0f4c81", textDecoration: "none", fontWeight: 600 },
};

const ADMIN_CREDENTIALS = { email: "admin@innohack.com", password: "admin123", name: "Admin", role: "ADMIN", id: 1 };

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const checkLocalCredentials = () => {
      // Check admin
      if (formData.email === ADMIN_CREDENTIALS.email && formData.password === ADMIN_CREDENTIALS.password) {
        localStorage.setItem("userType", "ADMIN");
        localStorage.setItem("userId", "1");
        localStorage.setItem("userName", "Admin");
        navigate("/admin");
        window.location.reload();
        return true;
      }
      // Check registered students
      const users = JSON.parse(localStorage.getItem("registeredUsers") || "[]");
      const user = users.find((u) => u.email === formData.email && u.password === formData.password);
      if (user) {
        localStorage.setItem("userType", "STUDENT");
        localStorage.setItem("userId", user.id);
        localStorage.setItem("userName", user.name);
        navigate("/hackathons");
        window.location.reload();
        return true;
      }
      return false;
    };

    try {
      const res = await fetch("/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email, password: formData.password }),
      });

      if (res.ok) {
        const data = await res.json();
        const role = data.role?.toUpperCase();
        localStorage.setItem("userType", role);
        localStorage.setItem("userId", data.id);
        localStorage.setItem("userName", data.name);
        navigate(role === "ADMIN" ? "/admin" : "/hackathons");
        window.location.reload();
        return;
      }
    } catch {
      // backend unavailable
    }

    // Always fall back to local credentials
    if (!checkLocalCredentials()) {
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    <div style={styles.loginPage}>
      <div style={styles.loginContainer}>
        <h1 style={styles.h1}>Welcome to InnoHack</h1>
        <p style={styles.subtitle}>Discover Hackathons. Preserve Innovation.</p>

        {error && <p style={{ ...styles.error, marginBottom: "1rem" }}>{error}</p>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              style={styles.input}
              required
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              style={styles.input}
              required
            />
          </div>
          <button type="submit" style={styles.btn}>Login</button>
        </form>

        <div style={styles.registerLink}>
          Don't have an account?{" "}
          <Link to="/register" style={styles.registerLinkA}>Register here</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
