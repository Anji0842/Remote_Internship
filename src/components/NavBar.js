import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css'; // Add styling here or in a separate CSS file

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <h1>Internship Management & Evaluation</h1>
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        {/* <li>
          <Link to="/internships">Internships</Link>
        </li>
        <li>
          <Link to="/evaluation">Evaluation</Link>
        </li> */}
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
