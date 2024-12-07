import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import './SignUp.css'; // Add CSS styling in a separate file

const ApplyForInternship = () => {
    const location = useLocation();
    const internship = location.state;
    const[user,setUserdata]=useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
        
      try {

        const response = await fetch("http://localhost:1350/api/users/me", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "email": localStorage.getItem("email"),
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUserdata(data); 
          console.log(data);
          console.log(internship);
        } else {
          throw new Error("Failed to fetch user data");
        }
      } catch (err) {
        // setError("An error occurred while fetching user data.");
        console.error(err);
      }
    };

    fetchUserInfo();
  }, []);

  const [formData, setFormData] = useState({
    skills: '',
    interestedrole: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const { skills, interestedrole } = formData;
  
    if (!skills ||  !interestedrole ) {
      setErrorMessage('All fields are required.');
      return;
    }
  
   
  
    try {
      const response = await fetch('http://localhost:1350/api/users/applyinternship', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ skills, interestedrole,internship,user }),
      });
  
      if (response.ok) {
        alert('Registration successful!');
        setErrorMessage('');
        window.location.href = '/internships';
      } else {
        setErrorMessage('Registration failed.');
      }
    } catch (error) {
      console.error(error);
      setErrorMessage('An error occurred.');
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit} className="signup-form">
        <div className="form-group">
          <label htmlFor="name">skills</label>
          <input
            type="text"
            id="skills"
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            placeholder="Enter your skills"
          />
        </div>
        <div className="form-group">
          <label htmlFor="interestedrole">Interested Role:</label>
          <input
            type="text"
            id="interestedrole"
            name="interestedrole"
            value={formData.interestedrole}
            onChange={handleChange}
            placeholder="Enter your Role"
          />
        </div>
      
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button type="submit" className="signup-button">Apply</button>
      </form>
    </div>
  );
};

export default ApplyForInternship;
