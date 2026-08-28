import React, { useState } from "react";
import "./Settings.css";

function Settings({ userProfile, setUserProfile }) {
  const [formData, setFormData] = useState({ ...userProfile });
  const [isSaved, setIsSaved] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUserProfile(formData);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="settings-page">
      <div className="settings-header">
        <h2>Settings</h2>
        <p>Manage your account preferences and application settings.</p>
      </div>

      <form onSubmit={handleSubmit} className="settings-form">
        <div className="settings-section">
          <h3>Profile Information</h3>
          <div className="form-group">
            <label>Agent Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="settings-input"
              required
            />
          </div>
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="settings-input"
              required
            />
          </div>
        </div>

        <div className="settings-section">
          <h3>Notifications</h3>
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="notifications"
              checked={formData.notifications}
              onChange={handleChange}
            />
            Email alerts for new tickets
          </label>
        </div>

        <div className="settings-actions">
          <button type="submit" className="save-btn">
            Save Changes
          </button>
          {isSaved && <span className="save-message">Settings saved!</span>}
        </div>
      </form>
    </div>
  );
}

export default Settings;