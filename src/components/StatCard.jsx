import React from "react";

function StatCard({ title, value, description, type }) {
  return (
    <div className={`stat-card ${type || ""}`}>
      <p className="stat-title">{title}</p>

      <h2>{value}</h2>

      <span>{description}</span>
    </div>
  );
}

export default StatCard;