import React from "react";
import { Link } from "react-router-dom";
import "../Styles/Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <nav className="sidebar-nav">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/add-scenario">Add Scenarios</Link>
          </li>
          <li>
            <Link to="/all-scenario">All Scenarios</Link>
          </li>
          <li>
            <Link to="/create-vehicle">Add Vehicle</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
