import React from "react";
import { X, Send, User, Clock, AlertCircle } from "lucide-react";
import "./TicketDetailDrawer.css";

function TicketDetailDrawer({ ticket, onClose, onStatusChange }) {
  if (!ticket) return null;

  return (
    <div className="drawer-overlay" onClick={onClose}>
      <div className="drawer-container" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-header">
          <div>
            <span className="drawer-ticket-id">#{ticket.id}</span>
            <h2>{ticket.subject}</h2>
          </div>
          <button className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="drawer-body">
          <div className="drawer-section meta-grid">
            <div>
              <label>Status</label>
              <select
                value={ticket.status}
                onChange={(e) => onStatusChange(ticket.id, e.target.value)}
                className={`status-select ${ticket.status.toLowerCase()}`}
              >
                <option value="Open">Open</option>
                <option value="Pending">Pending</option>
                <option value="Resolved">Resolved</option>
                <option value="Escalated">Escalated</option>
              </select>
            </div>

            <div>
              <label>Priority</label>
              <span className={`priority-badge ${ticket.priority.toLowerCase()}`}>
                {ticket.priority}
              </span>
            </div>

            <div>
              <label>Category</label>
              <span className="info-text">{ticket.category}</span>
            </div>

            <div>
              <label>Assigned Agent</label>
              <span className="info-text">{ticket.agent}</span>
            </div>
          </div>

          <div className="drawer-section">
            <h3>Customer Info</h3>
            <div className="customer-card">
              <div className="c-avatar">{ticket.customer.split(" ").map((n) => n[0]).join("")}</div>
              <div>
                <strong>{ticket.customer}</strong>
                <span>{ticket.email}</span>
              </div>
            </div>
          </div>

          <div className="drawer-section timeline">
            <h3>Activity History</h3>
            <div className="message-bubble customer">
              <div className="msg-header">
                <strong>{ticket.customer}</strong>
                <span>{ticket.created}</span>
              </div>
              <p>Hi team, I encountered an issue with this ticket: {ticket.subject}. Could you please assist?</p>
            </div>

            <div className="message-bubble agent">
              <div className="msg-header">
                <strong>{ticket.agent}</strong>
                <span>Just now</span>
              </div>
              <p>Hello {ticket.customer.split(" ")[0]}, we are looking into this for you right now.</p>
            </div>
          </div>
        </div>

        <div className="drawer-footer">
          <input type="text" placeholder="Type a response to customer..." />
          <button className="submit-btn">
            <Send size={16} /> Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default TicketDetailDrawer;