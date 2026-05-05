import React, { useState } from "react";

const styles = {
  page: { maxWidth: "800px", margin: "0 auto", padding: "2rem", minHeight: "calc(100vh - 140px)" },
  header: { textAlign: "center", marginBottom: "2rem" },
  h1: { color: "#1a1a2e", fontSize: "2.5rem", margin: "0 0 0.5rem 0" },
  p: { color: "#7f8c8d", fontSize: "1.1rem" },
  formContainer: { background: "#fff", borderRadius: "8px", padding: "2rem", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" },
  form: { display: "flex", flexDirection: "column", gap: "1.5rem" },
  formGroup: { display: "flex", flexDirection: "column" },
  label: { color: "#1a1a2e", fontWeight: 500, marginBottom: "0.5rem" },
  input: { padding: "0.8rem", border: "2px solid #ddd", borderRadius: "8px", fontSize: "1rem" },
  textarea: { padding: "0.8rem", border: "2px solid #ddd", borderRadius: "8px", fontSize: "1rem", resize: "vertical" },
  errorMsg: { color: "#e74c3c", fontSize: "0.85rem", marginTop: "0.25rem" },
  formActions: { display: "flex", gap: "1rem" },
  submitBtn: { background: "#27ae60", color: "#fff", padding: "1rem 2rem", border: "none", borderRadius: "8px", fontSize: "1rem", fontWeight: 500, cursor: "pointer" },
  resetBtn: { background: "#7f8c8d", color: "#fff", padding: "1rem 2rem", border: "none", borderRadius: "8px", fontSize: "1rem", cursor: "pointer" },
};

const initialState = { title: "", techStack: "", description: "" };

const AddAchievement = () => {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const [serverError, setServerError] = useState("");

  const validate = () => {
    const v = {};
    if (!formData.title.trim()) v.title = "Project title is required.";
    if (formData.title.length > 80) v.title = "Title should be under 80 characters.";
    if (!formData.techStack.trim()) v.techStack = "Tech stack is required.";
    if (!formData.description.trim()) v.description = "Description is required.";
    return v;
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const resetForm = () => { setFormData(initialState); setErrors({}); setSuccess(""); setServerError(""); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError(""); setSuccess("");
    const v = validate();
    if (Object.keys(v).length) { setErrors(v); return; }

    const saveLocal = () => {
      const stored = JSON.parse(localStorage.getItem("createdAchievements") || "[]");
      const newProject = { ...formData, id: Date.now() };
      localStorage.setItem("createdAchievements", JSON.stringify([...stored, newProject]));
      setSuccess("Achievement added successfully!");
      resetForm();
    };

    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setSuccess("Achievement added successfully!");
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
        <h1 style={styles.h1}>Add Achievement</h1>
        <p style={styles.p}>Add student innovation projects to the repository.</p>
      </div>
      <div style={styles.formContainer}>
        {success && <p style={{ color: "#27ae60", marginBottom: "1rem" }}>{success}</p>}
        {serverError && <p style={{ color: "#e74c3c", marginBottom: "1rem" }}>{serverError}</p>}
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Project Title</label>
            <input type="text" name="title" value={formData.title} onChange={handleChange} style={styles.input} />
            {errors.title && <span style={styles.errorMsg}>{errors.title}</span>}
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Tech Stack</label>
            <input type="text" name="techStack" value={formData.techStack} onChange={handleChange} placeholder="e.g., React, Node.js, MongoDB" style={styles.input} />
            {errors.techStack && <span style={styles.errorMsg}>{errors.techStack}</span>}
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Description</label>
            <textarea name="description" value={formData.description} onChange={handleChange} rows="4" style={styles.textarea} />
            {errors.description && <span style={styles.errorMsg}>{errors.description}</span>}
          </div>
          <div style={styles.formActions}>
            <button type="submit" style={styles.submitBtn}>Add Achievement</button>
            <button type="button" style={styles.resetBtn} onClick={resetForm}>Reset</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAchievement;
