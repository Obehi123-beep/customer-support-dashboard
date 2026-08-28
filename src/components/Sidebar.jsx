import {
  LayoutDashboard,
  Ticket,
  Users,
  BarChart3,
  Settings,
} from "lucide-react";
import "./Sidebar.css";

function Sidebar({ activeTab, setActiveTab, userProfile }) {
  const initials = userProfile?.name
    ? userProfile.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "AG";

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="brand-mark">CS</div>
        <div>
          <h2>SupportDesk</h2>
          <span>Customer Support</span>
        </div>
      </div>

      <nav className="sidebar-navigation">
        <p className="menu-label">MAIN MENU</p>

        <button
          className={`sidebar-link ${
            activeTab === "dashboard" ? "active" : ""
          }`}
          onClick={() => setActiveTab("dashboard")}
        >
          <LayoutDashboard size={18} />
          <span>Dashboard</span>
        </button>

        <button
          className={`sidebar-link ${
            activeTab === "tickets" ? "active" : ""
          }`}
          onClick={() => setActiveTab("tickets")}
        >
          <Ticket size={18} />
          <span>Tickets</span>
          <span className="notification-count">12</span>
        </button>

        <button
          className={`sidebar-link ${
            activeTab === "customers" ? "active" : ""
          }`}
          onClick={() => setActiveTab("customers")}
        >
          <Users size={18} />
          <span>Customers</span>
        </button>

        <button
          className={`sidebar-link ${
            activeTab === "analytics" ? "active" : ""
          }`}
          onClick={() => setActiveTab("analytics")}
        >
          <BarChart3 size={18} />
          <span>Analytics</span>
        </button>

        <p className="menu-label settings-label">SYSTEM</p>

        <button
          className={`sidebar-link ${
            activeTab === "settings" ? "active" : ""
          }`}
          onClick={() => setActiveTab("settings")}
        >
          <Settings size={18} />
          <span>Settings</span>
        </button>
      </nav>

      <div className="sidebar-footer">
        <div className="agent-profile">
          <div className="agent-avatar">{initials}</div>
          <div className="agent-info">
            <strong>{userProfile?.name || "Support Agent"}</strong>
            <span>Online</span>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;