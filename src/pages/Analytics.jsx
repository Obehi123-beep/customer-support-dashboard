import React from "react";
import { TrendingUp, Clock, CheckCircle, MessageSquare } from "lucide-react";
import "./Analytics.css";

function Analytics({ tickets = [] }) {
  const total = tickets.length || 1;
  const resolved = tickets.filter((t) => t.status === "Resolved").length;
  const escalated = tickets.filter((t) => t.status === "Escalated").length;
  const resolutionRate = Math.round((resolved / total) * 100);

  const chartData = [
    { day: "Mon", height: 60, value: 12 },
    { day: "Tue", height: 75, value: 18 },
    { day: "Wed", height: 50, value: 9 },
    { day: "Thu", height: 90, value: 24 },
    { day: "Fri", height: 80, value: 20 },
    { day: "Sat", height: 95, value: 28 },
    { day: "Sun", height: 70, value: 16 },
  ];

  return (
    <div className="analytics-page">
      <div className="page-heading">
        <div>
          <h1>Performance Analytics</h1>
          <p>Key metrics and resolution statistics for your support team.</p>
        </div>
      </div>

      <div className="analytics-grid">
        <div className="metric-card">
          <div className="metric-icon blue">
            <TrendingUp size={22} />
          </div>
          <div>
            <span className="metric-title">Resolution Rate</span>
            <h2>{resolutionRate}%</h2>
            <span className="metric-subtext">+4.2% from last week</span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon green">
            <CheckCircle size={22} />
          </div>
          <div>
            <span className="metric-title">Total Resolved</span>
            <h2>{resolved}</h2>
            <span className="metric-subtext">
              Out of {tickets.length} total tickets
            </span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon orange">
            <Clock size={22} />
          </div>
          <div>
            <span className="metric-title">Avg Response Time</span>
            <h2>18 mins</h2>
            <span className="metric-subtext">Target: &lt; 30 mins</span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon red">
            <MessageSquare size={22} />
          </div>
          <div>
            <span className="metric-title">Escalation Count</span>
            <h2>{escalated}</h2>
            <span className="metric-subtext">Needs supervisor review</span>
          </div>
        </div>
      </div>

      <div className="analytics-chart-section">
        <h3>Ticket Volume Overview</h3>
        <p className="chart-placeholder-text">
          Weekly ticket resolution and response volume stats
        </p>

        <div className="chart-bars">
          {chartData.map((item, index) => (
            <div key={index} className="chart-col">
              <div className="bar-wrapper">
                <div
                  className="bar"
                  style={{ height: `${item.height}%` }}
                  data-value={item.value}
                ></div>
              </div>
              <span>{item.day}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Analytics;