import React, { useState } from 'react';
import './Login.css'; // Add CSS styling in a separate file

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!email || !password) {
      setErrorMessage('Please fill out all fields.');
      return;
    }

    try {
      // Send login request to the backend
      const response = await fetch('http://localhost:1350/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        localStorage.setItem('email', email);
        onLogin("user");
        window.location.href = '/userhome'; // Redirect to user home page
      } else {
        // If login fails, show error message
        const error = await response.text();
        setErrorMessage(error);
      }
    } catch (error) {
      console.error(error);
      setErrorMessage('An error occurred while logging in.');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button type="submit" className="login-button">Login</button>
      </form>
      <p>
        Don’t have an account? <a href="/signup">Register here</a>
      </p>
    </div>
  );
};

export default Login;
