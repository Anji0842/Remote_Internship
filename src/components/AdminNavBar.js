import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./AdminNavBar.css"; // Include optional external CSS for styling

const AdminNavBar = ({ onLogout }) => {
  const navigate = useNavigate();

  // Handle logout functionality
  const handleLogout = () => {
    // Call the onLogout passed as a prop to reset the role state in the App component
    onLogout();
    navigate("/");  // This should redirect to the home page
  };

  return (
    <nav className="admin-navbar">
      <div className="navbar-brand">
        <Link to="/admin/dashboard" className="navbar-logo">
          AdminPanel
        </Link>
      </div>
      <ul className="navbar-links">
        {/* <li>
          <Link to="/admin/dashboard" className="navbar-item">
            Dashboard
          </Link>
        </li> */}
        <li>
          <Link to="/admin/internship" className="navbar-item">
            Internship
          </Link>
        </li>
        <li>
          <Link to="/admin/users" className="navbar-item">
            Manage Users
          </Link>
        </li>
        <li>
          <Link to="/admin/settings" className="navbar-item">
            Settings
          </Link>
        </li>
        <li>
          <Link to="/addinternship" className="navbar-item">
            Add Internship
          </Link>
        </li>
        <li>
          <Link to="/appliedInternships" className="navbar-item">
            Applied Internships
          </Link>
        </li>
        <li>
          <Link to="/evaluation" className="navbar-item">
            Go to Evaluation
          </Link>
        </li>
        <div className="navbar-actions">
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </ul>
    </nav>
  );
};

export default AdminNavBar;
