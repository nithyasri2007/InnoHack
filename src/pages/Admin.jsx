import React, { useState } from "react";

const styles = {
  page: {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "2rem",
    minHeight: "calc(100vh - 140px)",
  },
  header: { textAlign: "center", marginBottom: "2rem" },
  h1: { color: "#1a1a2e", fontSize: "2.5rem", margin: "0 0 0.5rem 0" },
  p: { color: "#7f8c8d", fontSize: "1.1rem" },
  formContainer: {
    background: "#fff",
    borderRadius: "8px",
    padding: "2rem",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  form: { display: "flex", flexDirection: "column", gap: "1.5rem" },
  formGroup: { display: "flex", flexDirection: "column" },
  label: { color: "#1a1a2e", fontWeight: 500, marginBottom: "0.5rem" },
  input: {
    padding: "0.8rem",
    border: "2px solid #ddd",
    borderRadius: "8px",
    fontSize: "1rem",
  },
  textarea: {
    padding: "0.8rem",
    border: "2px solid #ddd",
    borderRadius: "8px",
    fontSize: "1rem",
    resize: "vertical",
  },
  errorMsg: { color: "#e74c3c", fontSize: "0.85rem", marginTop: "0.25rem" },
  formActions: { display: "flex", gap: "1rem" },
  submitBtn: {
    background: "#0f4c81",
    color: "#fff",
    padding: "1rem 2rem",
    border: "none",
    borderRadius: "8px",
    fontSize: "1rem",
    fontWeight: 500,
    cursor: "pointer",
  },
  resetBtn: {
    background: "#7f8c8d",
    color: "#fff",
    padding: "1rem 2rem",
    border: "none",
    borderRadius: "8px",
    fontSize: "1rem",
    cursor: "pointer",
  },
  previewSection: {
    marginTop: "2rem",
    padding: "1.5rem",
    background: "#f9fafb",
    borderRadius: "8px",
    border: "2px solid #e5e7eb",
  },
  previewTitle: {
    color: "#1a1a2e",
    fontWeight: 600,
    marginBottom: "1rem",
    fontSize: "1.1rem",
  },
  posterPreview: {
    maxHeight: "400px",
    maxWidth: "100%",
    borderRadius: "8px",
    objectFit: "contain",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  },
  noPreview: {
    color: "#7f8c8d",
    fontStyle: "italic",
    padding: "2rem",
    textAlign: "center",
    background: "#fff",
    borderRadius: "8px",
    border: "2px dashed #ddd",
  },
};

const initialState = {
  name: "",
  college: "",
  domain: "",
  deadline: "",
  description: "",
  posterUrl: "",
  registrationUrl: "",
};

const Admin = () => {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const [serverError, setServerError] = useState("");
  const [posterLoaded, setPosterLoaded] = useState(false);

  const validate = () => {
    const v = {};
    if (!formData.name.trim()) v.name = "Hackathon name is required.";
    if (!formData.college.trim()) v.college = "College is required.";
    if (!formData.domain.trim()) v.domain = "Domain is required.";
    if (!formData.deadline) v.deadline = "Deadline is required.";
    if (!formData.description.trim())
      v.description = "Description is required.";
    return v;
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData({ ...formData, posterUrl: event.target.result });
        setPosterLoaded(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const resetForm = () => {
    setFormData(initialState);
    setErrors({});
    setSuccess("");
    setServerError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");
    setSuccess("");
    const v = validate();
    if (Object.keys(v).length) {
      setErrors(v);
      return;
    }

    const saveLocal = () => {
      const stored = JSON.parse(
        localStorage.getItem("createdHackathons") || "[]",
      );
      const newHackathon = { ...formData, id: Date.now() };
      localStorage.setItem(
        "createdHackathons",
        JSON.stringify([...stored, newHackathon]),
      );
      setSuccess("Hackathon added successfully!");
      resetForm();
    };

    try {
      const res = await fetch("/api/hackathons", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setSuccess("Hackathon added successfully!");
        resetForm();
      } else {
        saveLocal();
      }
    } catch {
      saveLocal();
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h1 style={styles.h1}>Add Hackathon</h1>
        <p style={styles.p}>Create a new hackathon event for students.</p>
      </div>
      <div style={styles.formContainer}>
        {success && (
          <p style={{ color: "#27ae60", marginBottom: "1rem" }}>{success}</p>
        )}
        {serverError && (
          <p style={{ color: "#e74c3c", marginBottom: "1rem" }}>
            {serverError}
          </p>
        )}
        <form onSubmit={handleSubmit} style={styles.form}>
          {[
            ["name", "Hackathon Name", "text"],
            ["college", "College", "text"],
            ["domain", "Domain", "text"],
            ["deadline", "Deadline", "date"],
            ["registrationUrl", "Registration Link", "text"],
          ].map(([field, label, type]) => (
            <div key={field} style={styles.formGroup}>
              <label style={styles.label}>{label}</label>
              <input
                type={type}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                style={styles.input}
              />
              {errors[field] && (
                <span style={styles.errorMsg}>{errors[field]}</span>
              )}
            </div>
          ))}
          <div style={styles.formGroup}>
            <label style={styles.label}>📸 Poster Image (Upload File)</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={styles.input}
            />
            <p
              style={{
                fontSize: "0.85rem",
                color: "#7f8c8d",
                marginTop: "0.25rem",
              }}
            >
              Supported formats: JPG, PNG, GIF, WebP
            </p>
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              style={styles.textarea}
            />
            {errors.description && (
              <span style={styles.errorMsg}>{errors.description}</span>
            )}
          </div>
          {formData.posterUrl && (
            <div style={styles.previewSection}>
              <div style={styles.previewTitle}>📸 Poster Preview</div>
              <img
                src={formData.posterUrl}
                alt="Poster Preview"
                style={styles.posterPreview}
                onLoad={() => setPosterLoaded(true)}
                onError={() => setPosterLoaded(false)}
              />
              {!posterLoaded && (
                <p style={{ color: "#e74c3c", marginTop: "0.5rem" }}>
                  ⚠️ Image failed to load. Please upload a valid image file.
                </p>
              )}
            </div>
          )}
          <div style={styles.formActions}>
            <button type="submit" style={styles.submitBtn}>
              Add Hackathon
            </button>
            <button type="button" style={styles.resetBtn} onClick={resetForm}>
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Admin;
