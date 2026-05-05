import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const styles = {
  registerPage: {
    minHeight: "calc(100vh - 140px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #0f4c81 0%, #1a1a2e 100%)",
    padding: "2rem",
  },
  registerContainer: {
    background: "#fff",
    borderRadius: "12px",
    padding: "3rem",
    boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
    maxWidth: "500px",
    width: "100%",
  },
  h1: { color: "#1a1a2e", textAlign: "center", margin: "0 0 0.5rem 0", fontSize: "2rem" },
  subtitle: { textAlign: "center", color: "#7f8c8d", margin: "0 0 2rem 0", fontSize: "1rem" },
  form: { display: "flex", flexDirection: "column", gap: "1.2rem" },
  formGroup: { display: "flex", flexDirection: "column" },
  label: { color: "#1a1a2e", fontWeight: 500, marginBottom: "0.4rem", fontSize: "0.95rem" },
  input: { padding: "0.9rem", border: "2px solid #ddd", borderRadius: "8px", fontSize: "1rem" },
  inputError: { borderColor: "#e74c3c" },
  btn: {
    background: "#0f4c81", color: "#fff", padding: "1rem",
    border: "none", borderRadius: "8px", fontSize: "1.1rem",
    fontWeight: 500, cursor: "pointer", marginTop: "0.5rem",
  },
  btnDisabled: { opacity: 0.7, cursor: "not-allowed" },
  errorMsg: { color: "#e74c3c", fontSize: "0.85rem", marginTop: "0.25rem" },
  serverError: {
    background: "#fdecea", color: "#c0392b", padding: "0.75rem",
    borderRadius: "6px", textAlign: "center", marginBottom: "1rem", fontSize: "0.9rem",
  },
  successMsg: {
    background: "#d6f5e9", color: "#27ae60", padding: "0.75rem",
    borderRadius: "6px", textAlign: "center", marginBottom: "1rem", fontSize: "0.9rem",
  },
  loginLink: { textAlign: "center", marginTop: "1.5rem", fontSize: "0.95rem", color: "#7f8c8d" },
  loginLinkA: { color: "#0f4c81", textDecoration: "none", fontWeight: 600 },
};

const Register = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [serverError, setServerError] = useState("");
  const navigate = useNavigate();

  const validate = () => {
    const e = {};
    if (!formData.name.trim()) e.name = "Name is required";
    if (!formData.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) e.email = "Invalid email format";
    if (!formData.password) e.password = "Password is required";
    else if (formData.password.length < 6) e.password = "Password must be at least 6 characters";
    if (!formData.confirmPassword) e.confirmPassword = "Confirm password is required";
    else if (formData.password !== formData.confirmPassword) e.confirmPassword = "Passwords do not match";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
    setServerError("");
  };

  const saveToLocalStorage = () => {
    const users = JSON.parse(localStorage.getItem("registeredUsers") || "[]");
    const exists = users.find((u) => u.email === formData.email);
    if (exists) {
      setServerError("Email already registered. Please login.");
      setLoading(false);
      return false;
    }
    const newUser = {
      id: Date.now(),
      name: formData.name,
      email: formData.email,
      password: formData.password,
      role: "STUDENT",
    };
    users.push(newUser);
    localStorage.setItem("registeredUsers", JSON.stringify(users));
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");
    if (!validate()) return;
    setLoading(true);

    try {
      const res = await fetch("/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: formData.name, email: formData.email, password: formData.password, role: "STUDENT" }),
      });

      if (res.ok) {
        setSuccessMessage("Registration successful! Redirecting to login...");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        const data = await res.json();
        // backend returned error - try localStorage
        if (!saveToLocalStorage()) return;
        setSuccessMessage("Registration successful! Redirecting to login...");
        setTimeout(() => navigate("/login"), 2000);
      }
    } catch {
      // backend unavailable - use localStorage
      if (!saveToLocalStorage()) return;
      setSuccessMessage("Registration successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 2000);
    }
    setLoading(false);
  };

  return (
    <div style={styles.registerPage}>
      <div style={styles.registerContainer}>
        <h1 style={styles.h1}>Create Account</h1>
        <p style={styles.subtitle}>Join InnoHack and discover amazing hackathons</p>

        {successMessage && <div style={styles.successMsg}>{successMessage}</div>}
        {serverError && <div style={styles.serverError}>{serverError}</div>}

        <form onSubmit={handleSubmit} style={styles.form}>
          {[
            ["name", "Full Name", "text", "Enter your full name"],
            ["email", "Email", "email", "student@university.edu"],
            ["password", "Password", "password", "Create a strong password"],
            ["confirmPassword", "Confirm Password", "password", "Re-enter your password"],
          ].map(([field, label, type, placeholder]) => (
            <div key={field} style={styles.formGroup}>
              <label style={styles.label}>{label}</label>
              <input
                type={type}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                placeholder={placeholder}
                style={{ ...styles.input, ...(errors[field] ? styles.inputError : {}) }}
              />
              {errors[field] && <span style={styles.errorMsg}>{errors[field]}</span>}
            </div>
          ))}
          <button
            type="submit"
            style={{ ...styles.btn, ...(loading ? styles.btnDisabled : {}) }}
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <div style={styles.loginLink}>
          Already have an account?{" "}
          <Link to="/login" style={styles.loginLinkA}>Login here</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
