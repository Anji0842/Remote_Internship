import React, { useState } from "react";
import "./UserSettings.css";

const UserSettings = () => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const userEmail = localStorage.getItem("email"); // Get email from localStorage
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  console.log(userEmail)
  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission for updating password
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { currentPassword, newPassword, confirmPassword } = formData;

    // Validate the input
    if (!currentPassword || !newPassword || !confirmPassword) {
      setErrorMessage("All fields are required.");
      setSuccessMessage(""); // Clear success message if validation fails
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage("New passwords do not match.");
      setSuccessMessage(""); // Clear success message if passwords don't match
      return;
    }

    try {
      // Make a PUT request to update the password
      const response = await fetch("http://localhost:1350/api/users/update-password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userEmail,  // Use the email from localStorage or state,  // Replace this with dynamic user email
          currentPassword,
          newPassword,
        }),
      });

      if (response.ok) {
        setSuccessMessage("Password updated successfully.");
        setErrorMessage(""); // Clear any previous error messages
      } else {
        const error = await response.text();
        setErrorMessage(error);
      }
    } catch (error) {
      console.error("Error updating user settings:", error);
      setErrorMessage("An error occurred. Please try again.");
      setSuccessMessage(""); // Clear success message on error
    }
  };

  return (
    <div className="user-settings-container">
      <h2>User Settings</h2>
      <form onSubmit={handleSubmit} className="user-settings-form">
        <div className="form-group">
          <label htmlFor="currentPassword">Current Password</label>
          <input
            type="password"
            id="currentPassword"
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleChange}
            placeholder="Enter current password"
          />
        </div>
        <div className="form-group">
          <label htmlFor="newPassword">New Password</label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            placeholder="Enter new password"
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm New Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm new password"
          />
        </div>

        {/* Display error or success messages */}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}

        {/* Submit button */}
        <button type="submit" className="btn-submit">
          Update Password
        </button>
      </form>
    </div>
  );
};

export default UserSettings;
