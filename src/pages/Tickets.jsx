import React, { useState } from "react";
import { Plus } from "lucide-react";
import "./Tickets.css";

function Tickets({ tickets = [], onStatusChange, onOpenModal, onSelectTicket }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");

  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch =
      ticket.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.subject.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "All" || ticket.status === statusFilter;
    const matchesPriority = priorityFilter === "All" || ticket.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  return (
    <div className="tickets-page">
      <div className="page-heading">
        <div>
          <h1>Support Tickets</h1>
          <p>Manage customer requests and track support activity.</p>
        </div>

        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          {onOpenModal && (
            <button className="submit-btn" onClick={onOpenModal} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <Plus size={16} /> New Ticket
            </button>
          )}
          <div className="ticket-total">{filteredTickets.length} Tickets</div>
        </div>
      </div>

      <div className="ticket-controls">
        <input
          type="text"
          placeholder="Search customer or subject..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="All">All Statuses</option>
          <option value="Open">Open</option>
          <option value="Pending">Pending</option>
          <option value="Resolved">Resolved</option>
          <option value="Escalated">Escalated</option>
        </select>

        <select value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)}>
          <option value="All">All Priorities</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>

      <div className="tickets-table-card">
        <div className="table-wrapper">
          <table className="tickets-table">
            <thead>
              <tr>
                <th>Ticket ID</th>
                <th>Customer</th>
                <th>Subject</th>
                <th>Category</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Agent</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredTickets.length > 0 ? (
                filteredTickets.map((ticket) => (
                  <tr 
                    key={ticket.id} 
                    onClick={() => onSelectTicket(ticket)}
                    style={{ cursor: "pointer" }}
                  >
                    <td><strong>#{ticket.id}</strong></td>
                    <td>
                      <div className="customer-name">{ticket.customer}</div>
                      <span className="customer-email">{ticket.email}</span>
                    </td>
                    <td>{ticket.subject}</td>
                    <td>{ticket.category}</td>
                    <td>
                      <span className={`priority-badge ${ticket.priority.toLowerCase().replace(" ", "-")}`}>
                        {ticket.priority}
                      </span>
                    </td>
                    <td>
                      <span className={`status-badge ${ticket.status.toLowerCase().replace(" ", "-")}`}>
                        {ticket.status}
                      </span>
                    </td>
                    <td>{ticket.agent}</td>
                    <td onClick={(e) => e.stopPropagation()}>
                      <select
                        className="status-select"
                        value={ticket.status}
                        onChange={(e) => onStatusChange(ticket.id, e.target.value)}
                      >
                        <option value="Open">Open</option>
                        <option value="Pending">Pending</option>
                        <option value="Resolved">Resolved</option>
                        <option value="Escalated">Escalated</option>
                      </select>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="no-tickets">
                    No tickets match your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Tickets;