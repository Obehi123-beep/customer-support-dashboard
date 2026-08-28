import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Tickets from "./pages/Tickets";
import Customers from "./pages/Customers";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import CreateTicketModal from "./components/CreateTicketModal";
import TicketDetailDrawer from "./components/TicketDetailDrawer";
import { ticketsData } from "./data/tickets";
import "./App.css";

function App() {
  const [activeTab, setActiveTab] = useState("tickets");
  const [tickets, setTickets] = useState(ticketsData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // User Profile State
  const [userProfile, setUserProfile] = useState({
    name: "Obehi",
    email: "obehi@supportdesk.com",
    role: "Support Agent",
    notifications: true,
  });

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      isDarkMode ? "dark" : "light"
    );
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  const handleAddTicket = (newTicket) => {
    setTickets((prev) => [newTicket, ...prev]);
  };

  const handleStatusChange = (ticketId, newStatus) => {
    setTickets((prev) =>
      prev.map((t) => (t.id === ticketId ? { ...t, status: newStatus } : t))
    );
    if (selectedTicket && selectedTicket.id === ticketId) {
      setSelectedTicket((prev) => ({ ...prev, status: newStatus }));
    }
  };

  const currentTab = activeTab.toLowerCase();

  return (
    <div className="app-container">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        userProfile={userProfile}
      />
      
      <div className="main-content">
        <Navbar 
          onOpenModal={() => setIsModalOpen(true)} 
          isDarkMode={isDarkMode}
          onToggleDarkMode={toggleDarkMode}
          userProfile={userProfile}
        />

        <main className="content-area">
          {currentTab === "dashboard" && (
            <Dashboard
              tickets={tickets}
              onStatusChange={handleStatusChange}
              onSelectTicket={setSelectedTicket}
            />
          )}
          {currentTab === "tickets" && (
            <Tickets
              tickets={tickets}
              onStatusChange={handleStatusChange}
              onOpenModal={() => setIsModalOpen(true)}
              onSelectTicket={setSelectedTicket}
            />
          )}
          {currentTab === "customers" && <Customers />}
          {currentTab === "analytics" && <Analytics tickets={tickets} />}
          {currentTab === "settings" && (
            <Settings 
              userProfile={userProfile} 
              setUserProfile={setUserProfile} 
            />
          )}
        </main>
      </div>

      {isModalOpen && (
        <CreateTicketModal
          onClose={() => setIsModalOpen(false)}
          onAddTicket={handleAddTicket}
        />
      )}

      {selectedTicket && (
        <TicketDetailDrawer
          ticket={selectedTicket}
          onClose={() => setSelectedTicket(null)}
          onStatusChange={handleStatusChange}
        />
      )}
    </div>
  );
}

export default App;