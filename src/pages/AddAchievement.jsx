import React, { useState } from 'react';
import './AddAchievement.css';

const AddAchievement = () => {
  const [formData, setFormData] = useState({
    title: '',
    techStack: '',
    description: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Achievement submitted:', formData);
    alert('Achievement added successfully!');
    setFormData({
      title: '',
      techStack: '',
      description: ''
    });
  };

  return (
    <div className="add-achievement-page">
      <div className="page-header">
        <h1>Add Achievement</h1>
        <p>Add student innovation projects to the repository</p>
      </div>
      <div className="form-container">
        <form onSubmit={handleSubmit} className="achievement-form">
          <div className="form-group">
            <label htmlFor="title">Project Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="techStack">Tech Stack</label>
            <input
              type="text"
              id="techStack"
              name="techStack"
              value={formData.techStack}
              onChange={handleChange}
              placeholder="e.g., React, Node.js, MongoDB"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              required
            />
          </div>
          <button type="submit" className="submit-btn">Add Achievement</button>
        </form>
      </div>
    </div>
  );
};

export default AddAchievement;
