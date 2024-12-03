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

const Dashboard = () => {
  const menuItems = [
    { label: "Schedule Meeting", icon: FaCalendarPlus },
    { label: "Manage Meetings", icon: FaRegCalendarAlt },
    { label: "Users & Permissions", icon: FaUsers },
    { label: "Notifications", icon: FaBell },
    { label: "Analytics", icon: FaChartLine },
    { label: "Settings", icon: FaCog },
  ];

  const handleClick = (item) => {
    alert(`${item.label} clicked!`);
  };

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
            onClick={() => handleClick(item)}
          >
            <item.icon className="me-3" />
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
