import React, { useState } from "react";
import { X } from "lucide-react";
import "./CreateTicketModal.css";

function CreateTicketModal({ isOpen, onClose, onAddTicket }) {
  const [formData, setFormData] = useState({
    customer: "",
    email: "",
    subject: "",
    category: "General",
    priority: "Medium",
    status: "Open",
    agent: "Unassigned",
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.customer || !formData.email || !formData.subject) return;

    const newTicket = {
      ...formData,
      id: `TCK-${Math.floor(1000 + Math.random() * 9000)}`,
      created: "Just now",
    };

    onAddTicket(newTicket);
    onClose();
    setFormData({
      customer: "",
      email: "",
      subject: "",
      category: "General",
      priority: "Medium",
      status: "Open",
      agent: "Unassigned",
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h3>Create New Ticket</h3>
          <button className="close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label>Customer Name</label>
            <input
              type="text"
              name="customer"
              required
              placeholder="e.g. Jane Doe"
              value={formData.customer}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Customer Email</label>
            <input
              type="email"
              name="email"
              required
              placeholder="e.g. jane@example.com"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Subject Issue</label>
            <input
              type="text"
              name="subject"
              required
              placeholder="e.g. Unable to process payment"
              value={formData.subject}
              onChange={handleChange}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Category</label>
              <select name="category" value={formData.category} onChange={handleChange}>
                <option value="Billing">Billing</option>
                <option value="Technical">Technical</option>
                <option value="General">General</option>
                <option value="Account">Account</option>
              </select>
            </div>

            <div className="form-group">
              <label>Priority</label>
              <select name="priority" value={formData.priority} onChange={handleChange}>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
          </div>

          <div className="modal-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="submit-btn">
              Create Ticket
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateTicketModal;