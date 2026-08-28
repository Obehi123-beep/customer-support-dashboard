import React from "react";
import { Sun, Moon, Plus, Search, Bell } from "lucide-react";
import "./Navbar.css";

function Navbar({ onOpenModal, isDarkMode, onToggleDarkMode, userProfile }) {
  // Generate initials (e.g., "Obehi" -> "O")
  const initials = userProfile?.name
    ? userProfile.name.slice(0, 2).toUpperCase()
    : "AG";

  return (
    <header className="navbar">
      <div className="search-container">
        <Search size={18} className="search-icon" />
        <input type="text" placeholder="Search..." className="search-input" />
      </div>

      <div className="navbar-actions">
        <button 
          className="theme-toggle-btn" 
          onClick={onToggleDarkMode} 
          title="Toggle Dark/Light Mode"
        >
          {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        <button className="icon-btn">
          <Bell size={18} />
        </button>

        <div className="user-badge" title={userProfile?.email}>
          <span className="avatar-circle">{initials}</span>
          <div className="user-info">
            <span className="user-name">{userProfile?.name}</span>
            <span className="user-role">{userProfile?.role}</span>
          </div>
        </div>

        <button className="primary-btn" onClick={onOpenModal}>
          <Plus size={16} /> New Ticket
        </button>
      </div>
    </header>
  );
}

export default Navbar;