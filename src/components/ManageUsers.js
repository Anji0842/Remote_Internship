import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./ManageUsers.css"; // Import CSS for styling

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:1350/api/admin/users"); // Replace with your API endpoint
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

    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        const response = await fetch(`http://localhost:1350/api/admin/users/${userId}`, {
          method: "DELETE",
        });
        if (response.ok) {
          setUsers(users.filter((user) => user.id !== userId)); // Remove user from state
          alert("User deleted successfully!");
        } else {
          throw new Error("Failed to delete user");
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
        <td>{user.name}</td> {/* Displaying the name field instead of username */}
        <td>{user.email}</td>
        <td>
          <button
            onClick={() => handleDelete(user.id)}
            className="btn btn-delete"
          >
            Delete
          </button>
        </td>
      </tr>
    ));
  };

  return (
    <div className="manage-users-container">
      <h2>Manage Users</h2>
      <div className="add-user-button-container">
        <Link to="/admin/users/new" className="btn btn-new-user">
          Add New User
        </Link>
      </div>
      <table className="users-table">
        <thead>
          <tr>
            <th>Name</th> {/* Changed Username to Name */}
            <th>Email</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>{renderUsers()}</tbody>
      </table>
    </div>
  );
};

export default ManageUsers;
