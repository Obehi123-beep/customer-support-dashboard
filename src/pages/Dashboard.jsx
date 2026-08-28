import React, { useState } from "react";
import { 
  Ticket, 
  Clock3, 
  CheckCircle2, 
  AlertTriangle, 
  MoreHorizontal,
  ArrowUpRight 
} from "lucide-react";
import "./Dashboard.css";

function Dashboard({ tickets = [], onStatusChange }) {
  const [statusFilter, setStatusFilter] = useState("All");

  const totalTickets = tickets.length;
  const openTickets = tickets.filter((t) => t.status === "Open").length;
  const pendingTickets = tickets.filter((t) => t.status === "Pending").length;
  const resolvedTickets = tickets.filter((t) => t.status === "Resolved").length;
  const escalatedTickets = tickets.filter((t) => t.status === "Escalated").length;

  const filteredTickets =
    statusFilter === "All"
      ? tickets
      : tickets.filter((ticket) => ticket.status === statusFilter);

  return (
    <div className="dashboard-page">
      <div className="dashboard-heading">
        <div>
          <h2>Overview</h2>
          <p>Here's what's happening with your customer support team today.</p>
        </div>
        <div className="date-display">
          <span>Today</span>
          <strong>Support Operations</strong>
        </div>
      </div>

      <section className="stats-grid">
        <div className="dashboard-stat-card">
          <div className="stat-card-top">
            <div className="stat-icon purple">
              <Ticket size={19} />
            </div>
            <span className="stat-change positive">
              +12.5% <ArrowUpRight size={13} />
            </span>
          </div>
          <p className="stat-label">Total Tickets</p>
          <h3>{totalTickets}</h3>
          <span className="stat-description">Compared with last month</span>
        </div>

        <div className="dashboard-stat-card">
          <div className="stat-card-top">
            <div className="stat-icon orange">
              <Clock3 size={19} />
            </div>
            <span className="stat-change warning">Needs attention</span>
          </div>
          <p className="stat-label">Open Tickets</p>
          <h3>{openTickets}</h3>
          <span className="stat-description">Currently awaiting response</span>
        </div>

        <div className="dashboard-stat-card">
          <div className="stat-card-top">
            <div className="stat-icon green">
              <CheckCircle2 size={19} />
            </div>
            <span className="stat-change positive">87.4%</span>
          </div>
          <p className="stat-label">Resolution Rate</p>
          <h3>87.4%</h3>
          <span className="stat-description">Tickets resolved successfully</span>
        </div>

        <div className="dashboard-stat-card">
          <div className="stat-card-top">
            <div className="stat-icon red">
              <AlertTriangle size={19} />
            </div>
            <span className="stat-change danger">{escalatedTickets} active</span>
          </div>
          <p className="stat-label">Escalated Tickets</p>
          <h3>{escalatedTickets}</h3>
          <span className="stat-description">Require supervisor attention</span>
        </div>
      </section>

      <section className="dashboard-grid">
        <div className="status-card">
          <div className="section-heading">
            <div>
              <h3>Ticket Status</h3>
              <p>Current support workload</p>
            </div>
            <button className="more-button">
              <MoreHorizontal size={19} />
            </button>
          </div>

          <div className="status-content">
            <div className="status-total">
              <strong>{totalTickets}</strong>
              <span>Total tickets</span>
            </div>

            <div className="status-list">
              <div className="status-row">
                <span><i className="status-dot open"></i> Open</span>
                <strong>{openTickets}</strong>
              </div>
              <div className="status-row">
                <span><i className="status-dot pending"></i> Pending</span>
                <strong>{pendingTickets}</strong>
              </div>
              <div className="status-row">
                <span><i className="status-dot resolved"></i> Resolved</span>
                <strong>{resolvedTickets}</strong>
              </div>
              <div className="status-row">
                <span><i className="status-dot escalated"></i> Escalated</span>
                <strong>{escalatedTickets}</strong>
              </div>
            </div>
          </div>

          <div className="progress-bar">
            <span className="progress-open" style={{ width: `${totalTickets ? (openTickets / totalTickets) * 100 : 0}%` }}></span>
            <span className="progress-pending" style={{ width: `${totalTickets ? (pendingTickets / totalTickets) * 100 : 0}%` }}></span>
            <span className="progress-resolved" style={{ width: `${totalTickets ? (resolvedTickets / totalTickets) * 100 : 0}%` }}></span>
            <span className="progress-escalated" style={{ width: `${totalTickets ? (escalatedTickets / totalTickets) * 100 : 0}%` }}></span>
          </div>
        </div>

        <div className="performance-card">
          <div className="section-heading">
            <div>
              <h3>Response Performance</h3>
              <p>Average support response time</p>
            </div>
            <span className="performance-badge">This week</span>
          </div>

          <div className="performance-main">
            <strong>18m</strong>
            <span>Average response time</span>
          </div>

          <div className="performance-chart">
            <div className="chart-lines">
              <span></span><span></span><span></span><span></span>
            </div>
            <div className="chart-bars">
              <div style={{ height: "42%" }}></div>
              <div style={{ height: "58%" }}></div>
              <div style={{ height: "48%" }}></div>
              <div style={{ height: "72%" }}></div>
              <div style={{ height: "62%" }}></div>
              <div style={{ height: "84%" }}></div>
              <div style={{ height: "67%" }}></div>
            </div>
          </div>

          <div className="chart-days">
            <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
          </div>
        </div>
      </section>

      <section className="tickets-section">
        <div className="tickets-header">
          <div>
            <h3>Recent Support Tickets</h3>
            <p>Manage and monitor your latest customer requests.</p>
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="ticket-filter"
          >
            <option value="All">All Tickets</option>
            <option value="Open">Open</option>
            <option value="Pending">Pending</option>
            <option value="Resolved">Resolved</option>
            <option value="Escalated">Escalated</option>
          </select>
        </div>

        <div className="table-wrapper">
          <table className="tickets-table">
            <thead>
              <tr>
                <th>Ticket</th>
                <th>Customer</th>
                <th>Subject</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Agent</th>
                <th>Created</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filteredTickets.map((ticket) => (
                <tr key={ticket.id}>
                  <td><strong className="ticket-id">#{ticket.id}</strong></td>
                  <td>
                    <div className="customer-cell">
                      <div className="customer-avatar">
                        {ticket.customer ? ticket.customer.split(" ").map((n) => n[0]).join("") : "U"}
                      </div>
                      <div>
                        <strong>{ticket.customer}</strong>
                        <span>{ticket.email}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="subject-cell">
                      <strong>{ticket.subject}</strong>
                      <span>{ticket.category}</span>
                    </div>
                  </td>
                  <td>
                    <span className={`priority-badge ${ticket.priority.toLowerCase()}`}>
                      {ticket.priority}
                    </span>
                  </td>
                  <td>
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
                  </td>
                  <td>{ticket.agent}</td>
                  <td className="created-cell">{ticket.created}</td>
                  <td>
                    <button className="row-more-button">
                      <MoreHorizontal size={17} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredTickets.length === 0 && (
            <div className="empty-state">
              <Ticket size={30} />
              <h4>No tickets found</h4>
              <p>There are no tickets matching this filter.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Dashboard;