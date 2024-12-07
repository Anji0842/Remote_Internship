import React from "react";
import { Link } from "react-router-dom";
import "./UserHome.css"; // Ensure to have corresponding CSS for styling

const UserHome = () => {
  return (
    <div className="userhome">
    <div className="user-home-container">
      <h1>Remote Internship Management</h1>
      <p className="tagline">Your gateway to discovering and managing internships remotely.</p>

      {/* Action buttons or links */}
      <div className="action-buttons">
        <Link to="/internships" className="btn">
          View Available Internships
        </Link>
        <Link to="/profile" className="btn">
          View Profile
        </Link>
        <Link to="/usersettings" className="btn">
          Account Settings
        </Link>
      </div>
    </div>
    </div>
  );
};

export default UserHome;
