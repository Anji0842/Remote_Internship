import React, { useState } from 'react';
import './AddInternships.css'; // Optional: Add CSS for styling

const AddInternships = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [duration, setDuration] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!title || !description || !location || !duration) {
      setErrorMessage('All fields are required.');
      return;
    }

    try {
      const response = await fetch('http://localhost:1350/api/internships', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          description,
          location,
          duration,
        }),
      });

      if (response.ok) {
        setSuccessMessage('Internship added successfully!');
        setErrorMessage('');
        setTitle('');
        setDescription('');
        setLocation('');
        setDuration('');
      } else {
        const error = await response.text();
        setErrorMessage(error || 'Failed to add internship.');
        setSuccessMessage('');
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('An error occurred while adding the internship.');
      setSuccessMessage('');
    }
  };

  return (
    <div className="add-internship-container">
      <h2>Add Internship</h2>
      <form onSubmit={handleSubmit} className="add-internship-form">
        <div className="form-group">
          <label id="titleid">Internship Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter internship title"
            required
          />
        </div>
        <div className="form-group">
          <label id="descriptionid">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter internship description"
            required
          />
        </div>
        <div className="form-group">
          <label id="locationid">Location:</label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter location"
            required
          />
        </div>
        <div className="form-group">
          <label id="durationid">Duration (e.g., 3 months):</label>
          <input
            type="text"
            id="duration"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            placeholder="Enter duration"
            required
          />
        </div>
        {successMessage && <p className="success-message">{successMessage}</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button type="submit" className="add-internship-button">
          Add Internship
        </button>
      </form>
    </div>
  );
};

export default AddInternships;
