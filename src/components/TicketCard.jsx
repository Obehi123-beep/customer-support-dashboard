import React from "react";
import "./TicketCard.css";

function TicketCard({ ticket }) {
  if (!ticket) {
    return null;
  }

  return (
    <div className="ticket-card">
      <div className="ticket-card-header">
        <strong>{ticket.id}</strong>

        <span className={`ticket-priority ${ticket.priority.toLowerCase()}`}>
          {ticket.priority}
        </span>
      </div>

      <h3>{ticket.subject}</h3>

      <p className="ticket-customer">
        {ticket.customer}
      </p>

      <p className="ticket-category">
        {ticket.category}
      </p>

      <div className="ticket-card-footer">
        <span>{ticket.status}</span>
        <span>{ticket.agent}</span>
      </div>
    </div>
  );
}

export default TicketCard;