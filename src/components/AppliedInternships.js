import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./ManageUsers.css"; // Import CSS for styling

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:1350/api/admin/appliedinternships"); // Replace with your API endpoint
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
    fetchUsers();
  }, []);

  const handleUpdateStatus = async (id,status) => {
    // window.confirm("Are you sure you want to delete this user?")
    if (true) {
      try {
        console.log(id);
        console.log(status);
        const response = await fetch(`http://localhost:1350/api/admin/internship/${id}/${status}`, {
          method: "PUT",
        });
        if (response.ok) {
            fetchUsers();
        } else {
          throw new Error("Failed to Update");
        }
      } catch (error) {
        alert(error.message);
      }
    }
  };

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
        
        <td>
          <button
            onClick={() => handleUpdateStatus(user.id,"Approved")}
            className="btn btn-delete"
          >
            Approve
          </button>
        </td>
        <td>
          <button
            onClick={() => handleUpdateStatus(user.id,"Rejected")}
            className="btn btn-delete"
          >
            Reject
          </button>
        </td>
      </tr>
    ));
  };

  return (
    <div className="manage-users-container">
      <h2>Manage Users</h2>
      <div className="add-user-button-container">
      </div>
      <table className="users-table">
        <thead>
          <tr>
            <th>Name</th> {/* Changed Username to Name */}
            <th>Email</th>
            <th>Skills</th>
            <th>Role</th>
            <th>Status</th>
            <th>Applied Date</th>
            <th>Title</th>
            <th>Approve</th>
            <th>Reject</th>
          </tr>
        </thead>
        <tbody>{renderUsers()}</tbody>
      </table>
    </div>
  );
};

export default ManageUsers;
