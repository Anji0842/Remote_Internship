import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import './Internships.css';

const Internships = () => {
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // const navigate = useNavigate();

  useEffect(() => {
    // Fetch internships from the backend API
    const fetchInternships = async () => {
      try {
        const response = await fetch('http://localhost:1350/api/internships'); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch internships');
        }
        const data = await response.json();
        setInternships(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchInternships();
  }, []);

  if (loading) {
    return <div className="loading">Loading internships...</div>;
  }

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  return (
    <div className="internships-container">
      <h2>Available Internships</h2>
      {internships.length === 0 ? (
        <p>No internships available at the moment.</p>
      ) : (
        <div className="internship-list">
          {internships.map((internship) => (
            <div key={internship.id} className="internship-card">
              <h3>{internship.title}</h3>
              <p>
                <strong>Description:</strong> {internship.description}
              </p>
              <p>
                <strong>Location:</strong> {internship.location}
              </p>
              <p>
                <strong>Duration:</strong> {internship.duration}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Internships;
