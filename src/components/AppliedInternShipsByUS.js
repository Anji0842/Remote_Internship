import React, { useEffect, useState } from "react";
//import { Link } from "react-router-dom";
import "./ManageUsers.css"; // Import CSS for styling

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userInfo, setUserInfo] = useState(null); // Uncomment this line
  const [userID, setUserID] = useState(0);

  const fetchUsers = async (userid) => {
    try {
      const response = await fetch(`http://localhost:1350/api/users/appliedintenships/${userid}`);
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

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
          setUserInfo(data); // No error here since setUserInfo is now defined
          setUserID(data.id);
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

  useEffect(() => {
    if (userID !== 0) {
      fetchUsers(userID);
    }
  }, [userID]);

  const renderUsers = () => {
    if (loading) {
      return <p>Loading users...</p>;
    }

    if (error) {
      return <p style={{ color: "red" }}>{error}</p>;
    }

    if (users.length === 0) {
      return <p>No users found.</p>;
    }

    return users.map((user) => (
      <tr key={user.id}>
        <td>{user.user.name}</td>
        <td>{user.user.email}</td>
        <td>{user.skills}</td>
        <td>{user.interestedrole}</td>
        <td>{user.status}</td>
        <td>{user.applieddate}</td>
        <td>{user.internship.title}</td>
      </tr>
    ));
  };

  return (
    <div className="manage-users-container">
      <h2>Manage Users</h2>
      <table className="users-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Skills</th>
            <th>Role</th>
            <th>Status</th>
            <th>Applied Date</th>
            <th>Title</th>
          </tr>
        </thead>
        <tbody>{renderUsers()}</tbody>
      </table>
    </div>
  );
};

export default ManageUsers;
