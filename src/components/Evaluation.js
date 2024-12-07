import React, { useState } from 'react';
import './Evaluation.css';

const Evaluation = () => {
  const [evaluations, setEvaluations] = useState([]);
  const [form, setForm] = useState({
    internName: '',
    projectTitle: '',
    score: '',
    feedback: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setEvaluations((prevEvaluations) => [...prevEvaluations, form]);
    setForm({ internName: '', projectTitle: '', score: '', feedback: '' });
    alert('Evaluation submitted successfully!');
  };

  return (
    <div className="evaluation-container">
      <h2>Intern Evaluation</h2>
      <form className="evaluation-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Intern Name:</label>
          <input
            type="text"
            name="internName"
            value={form.internName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Project Title:</label>
          <input
            type="text"
            name="projectTitle"
            value={form.projectTitle}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Score (1-10):</label>
          <input
            type="number"
            name="score"
            value={form.score}
            onChange={handleChange}
            min="1"
            max="10"
            required
          />
        </div>
        <div className="form-group">
          <label>Feedback:</label>
          <textarea
            name="feedback"
            value={form.feedback}
            onChange={handleChange}
            rows="4"
            required
          ></textarea>
        </div>
        <button type="submit" className="submit-button">
          Submit Evaluation
        </button>
      </form>

      <div className="evaluations-list">
        <h3>Previous Evaluations</h3>
        {evaluations.length === 0 ? (
          <p>No evaluations submitted yet.</p>
        ) : (
          evaluations.map((evalData, index) => (
            <div key={index} className="evaluation-card">
              <p>
                <strong>Intern Name:</strong> {evalData.internName}
              </p>
              <p>
                <strong>Project Title:</strong> {evalData.projectTitle}
              </p>
              <p>
                <strong>Score:</strong> {evalData.score}/10
              </p>
              <p>
                <strong>Feedback:</strong> {evalData.feedback}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Evaluation;
