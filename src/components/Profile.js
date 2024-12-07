import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css"; // Ensure you create corresponding CSS for styling

const Profile = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const[userdata,setUserdata]=useState(null);

  // Fetch user information on component mount
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
          setUserInfo(data); 
          console.log(data);
        } else {
          throw new Error("Failed to fetch user data");
        }
      } catch (err) {
        setError("An error occurred while fetching user data.");
        console.error(err);
      }
    };

    fetchUserInfo();
  }, []);

  // Redirect if the user is not logged in
  if (!localStorage.getItem("email")) {
    navigate("/login");
  }

  return (
    <div className="profile-container">
      <h1>User Profile</h1>

      {/* Show error if there is any */}
      {error && <p className="error-message">{error}</p>}

      {/* Display user info if available */}
      {userInfo ? (
        <div className="profile-info">
          <p><strong>Name:</strong> {userInfo.name}</p>
          <p><strong>Email:</strong> {userInfo.email}</p>
          <p><strong>Role:</strong> User</p>
        </div>
      ) : (
        <p>Loading your profile...</p>
      )}

      {/* Action buttons */}
      <div className="action-buttons">
        <button className="btn" onClick={() => navigate("/usersettings")}>
          Account Settings
        </button>
        <button className="btn" onClick={() => navigate("/userhome")}>
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default Profile;
