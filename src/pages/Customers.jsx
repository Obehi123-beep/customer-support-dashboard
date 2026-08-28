import React, { useState } from "react";
import { Search, Mail, Phone, MoreHorizontal, Users, UserCheck, AlertCircle } from "lucide-react";
import { customersData } from "../data/customers"; // ensure you have mock customer data exported here
import "./Customers.css";

function Customers() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");

  const filteredCustomers = customersData.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus =
      selectedStatus === "All" || customer.status === selectedStatus;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="customers-page">
      <div className="customers-header">
        <div>
          <h2>Customers</h2>
          <p>View, search, and manage customer account profiles.</p>
        </div>
        <div className="total-registered-badge">
          {customersData.length} Total Registered
        </div>
      </div>

      {/* Summary Cards */}
      <div className="customers-stats">
        <div className="stat-card">
          <div className="stat-icon purple"><Users size={20} /></div>
          <div>
            <span>Total Customers</span>
            <h3>{customersData.length}</h3>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon green"><UserCheck size={20} /></div>
          <div>
            <span>Active Accounts</span>
            <h3>{customersData.filter(c => c.status === "Active" || c.status === "VIP").length}</h3>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon orange"><AlertCircle size={20} /></div>
          <div>
            <span>With Open Tickets</span>
            <h3>{customersData.filter(c => c.openTickets > 0).length}</h3>
          </div>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="customers-filter-bar">
        <div className="search-box">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="status-dropdown"
        >
          <option value="All">All Statuses</option>
          <option value="Active">Active</option>
          <option value="VIP">VIP</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>

      {/* Customers Table */}
      <div className="table-container">
        <table className="customers-table">
          <thead>
            <tr>
              <th>CUSTOMER</th>
              <th>CONTACT INFORMATION</th>
              <th>TOTAL TICKETS</th>
              <th>OPEN TICKETS</th>
              <th>STATUS</th>
              <th>MEMBER SINCE</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.map((c) => (
              <tr key={c.id}>
                <td className="customer-cell">
                  <div className="avatar-small">{c.name.split(" ").map(n=>n[0]).join("")}</div>
                  <div>
                    <strong>{c.name}</strong>
                    <span className="customer-id">{c.id}</span>
                  </div>
                </td>
                <td className="contact-cell">
                  <div><Mail size={14} /> {c.email}</div>
                  <div><Phone size={14} /> {c.phone}</div>
                </td>
                <td>{c.totalTickets}</td>
                <td>
                  <span className={`open-badge ${c.openTickets > 0 ? "has-open" : ""}`}>
                    {c.openTickets}
                  </span>
                </td>
                <td>
                  <span className={`status-pill ${c.status.toLowerCase()}`}>
                    {c.status}
                  </span>
                </td>
                <td>{c.memberSince}</td>
                <td>
                  <button className="action-btn"><MoreHorizontal size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Customers;