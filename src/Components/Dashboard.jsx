import React from "react";
import {
  FaCalendarPlus,
  FaRegCalendarAlt,
  FaTachometerAlt,
  FaUsers,
  FaBell,
  FaChartLine,
  FaCog,
} from "react-icons/fa";
import { Link } from "react-router";

const Dashboard = () => {
  const menuItems = [
    {
      label: "Schedule Meeting",
      icon: FaCalendarPlus,
      path: "/schedule-meeting",
    },
    {
      label: "Manage Meetings",
      icon: FaRegCalendarAlt,
      path: "/manage-meetings",
    },
    { label: "Users & Permissions", icon: FaUsers, path: "/users-permissions" },
    { label: "Notifications", icon: FaBell, path: "/notifications" },
    { label: "Analytics", icon: FaChartLine, path: "/analytics" },
    { label: "Settings", icon: FaCog, path: "/settings" },
  ];

  return (
    <div className="dashboard bg-black text-white rounded-3">
      <h2 className="text-center py-3" style={{ fontWeight: "bold" }}>
        <FaTachometerAlt className="me-2 mb-2" />
        Dashboard
      </h2>

      <ul className="list-group list">
        {menuItems.map((item, index) => (
          <li
            key={index}
            className="list-group-item d-flex align-items-center text-black "
            style={{
              cursor: "pointer",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            <Link
              to={item.path}
              className="d-flex align-items-center text-decoration-none text-dark"
            >
              <item.icon className="me-3" />
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
