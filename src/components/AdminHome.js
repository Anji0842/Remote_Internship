import React, { useState, useEffect } from 'react';
import './Dashboard.css';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalInterns: 0,
    activeInternships: 0,
    completedEvaluations: 0,
  });
  const [recentEvaluations, setRecentEvaluations] = useState([]);

  useEffect(() => {
    // Simulate fetching data from an API
    setTimeout(() => {
      setStats({
        totalInterns: 25,
        activeInternships: 10,
        completedEvaluations: 18,
      });

      setRecentEvaluations([
        {
          id: 1,
          internName: 'Alice Johnson',
          projectTitle: 'Web Development Project',
          score: 9,
          feedback: 'Excellent work with attention to detail.',
        },
        {
          id: 2,
          internName: 'Bob Smith',
          projectTitle: 'Data Science Analysis',
          score: 8,
          feedback: 'Good performance, needs improvement in communication.',
        },
        {
          id: 3,
          internName: 'Charlie Brown',
          projectTitle: 'UI/UX Design Prototype',
          score: 7,
          feedback: 'Creative ideas but requires more polish.',
        },
      ]);
    }, 1000); // Simulate network delay
  }, []);

  return (
    <div className="dashboard-container">
      <header className="header">
        <h1>Admin Dashboard</h1>
        <p>Welcome, Admin! Here's an overview of your tasks and activities.</p>
      </header>

      <div className="stats-container">
        <div className="stat-card">
          <h3>{stats.totalInterns}</h3>
          <p>Total Interns</p>
        </div>
        <div className="stat-card">
          <h3>{stats.activeInternships}</h3>
          <p>Active Internships</p>
        </div>
        <div className="stat-card">
          <h3>{stats.completedEvaluations}</h3>
          <p>Completed Evaluations</p>
        </div>
      </div>

      <div className="recent-evaluations">
        <h3>Recent Evaluations</h3>
        {recentEvaluations.length === 0 ? (
          <p>No evaluations available.</p>
        ) : (
          <div className="evaluations-list">
            {recentEvaluations.map((evaluation) => (
              <div key={evaluation.id} className="evaluation-card">
                <p>
                  <strong>Intern:</strong> {evaluation.internName}
                </p>
                <p>
                  <strong>Project:</strong> {evaluation.projectTitle}
                </p>
                <p>
                  <strong>Score:</strong> {evaluation.score}/10
                </p>
                <p>
                  <strong>Feedback:</strong> {evaluation.feedback}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
