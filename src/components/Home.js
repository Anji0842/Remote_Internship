import React from 'react';
import './Home.css'; // Add a CSS file for styling if needed

const Home = () => {
  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Welcome to the Remote Internship Management and Evaluation System</h1>
        <p id='header'>
          Simplify the management and evaluation of internships with our comprehensive platform.
        </p>
      </header>
      <section className="home-features">
        <h2>Features</h2>
        <ul>
          <li>Track and manage remote internships efficiently.</li>
          <li>Streamlined communication between interns and supervisors.</li>
          <li>Customizable evaluation criteria and progress tracking.</li>
          <li>Dashboard with insights and analytics for internship programs.</li>
        </ul>
      </section>
      <section className="home-get-started">
        <h2>Get Started</h2>
        <p>
          Login or register to explore the platform and manage your internships effectively.
        </p>
        <div className="home-buttons">
          <button onClick={() => window.location.href = '/login'}>Login</button>
          <button onClick={() => window.location.href = '/adminlogin'}>Admin Login</button>
          <button onClick={() => window.location.href = '/signup'}>Register</button>
        </div>
      </section>
    </div>
  );
};

export default Home;
