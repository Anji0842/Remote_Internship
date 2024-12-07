import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './AdminLogin.css';  // Import external CSS

const AdminLogin = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate(); // Hook to navigate programmatically

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = formData;

    // Basic validation
    if (!username || !password) {
      setErrorMessage("Both fields are required.");
      return;
    }

    try {
      // Send login request to the backend
      const response = await fetch("http://localhost:1350/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        // Notify the parent App component of successful login
        onLogin("admin");
        // alert("Login successful!");
        // Navigate to the admin dashboard without page reload
        navigate("/admin/internship");
      } else {
        const error = await response.text();
        setErrorMessage(error);
      }
    } catch (error) {
      console.error("Error during login:", error);
      setErrorMessage("An error occurred while logging in.");
    }
  };

  return (
    <div className="admin-login-container">
      <h2>Admin Login</h2>
      <form onSubmit={handleSubmit} className="admin-login-form">
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter username"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter password"
          />
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
