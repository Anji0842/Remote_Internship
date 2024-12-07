import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import './InternshipsDetails.css';

const InternshipDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const internship = location.state; // Passed via navigate state

  const[userdata,setUserdata]=useState(null);

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



  if (!internship) {
    return <div className="error-message">No internship details available.</div>;
  }

  // Function to handle the alert button click
  /*const handleAlertClick = () => {
    // alert(`You have selected the "${internship.title}" internship.`);
    console.log(userdata);
    console.log(internship)
  };*/

  return (
    <div className="internship-details-container">
      <h2>{internship.title}</h2>
      <p>
        <strong>Description:</strong> {internship.description}
      </p>
      <p>
        <strong>Location:</strong> {internship.location}
      </p>
      <p>
        <strong>Duration:</strong> {internship.duration}
      </p>
      <div className="button-group">
        <button className="back-button" onClick={() => navigate(-1)}>
          Back to Internships
        </button>
        <button  className="alert-button" onClick={() => navigate(`/applyinternship/${internship.id}`, { state: internship })}>
          Apply Internship
        </button>
        
      </div>
    </div>
  );
};

export default InternshipDetails;
