import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./UserNavbar.css"; // Make sure to create the corresponding CSS for styling

const UserNavbar = ({ onLogout }) => {
  const navigate = useNavigate();

  // Handle logout functionality
  const handleLogout = () => {
    // Call the onLogout passed as prop to reset the role state in App component
    onLogout();
    // Redirect to home page after logout
    navigate("/");
  };

  return (
    <nav className="user-navbar">
      <div className="navbar-container">
        <div className="logo">
          <Link to="/" className="navbar-logo">
            Remote Internship Management
          </Link>
        </div>

        <ul className="navbar-links">
          <li>
            <Link to="/userhome" className="navbar-link">
              Home
            </Link>
          </li>
          <li>
            <Link to="/internships" className="navbar-link">
              Internships
            </Link>
          </li>
          <li>
            <Link to="/userappliedInternships" className="navbar-link">
              Applied Internships
            </Link>
          </li>
          <li>
            <Link to="/profile" className="navbar-link">
              Profile
            </Link>
          </li>
          <li>
            <Link to="/usersettings" className="navbar-link">
              Settings
            </Link>
          </li>
        </ul>

        <div className="navbar-actions">
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default UserNavbar;
