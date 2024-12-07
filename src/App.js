import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar"; // For user navbar
import AdminNavBar from "./components/AdminNavBar"; // For admin navbar
import Home from "./components/Home";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Internships from "./components/Internships";
import InternshipDetails from "./components/InternshipDetails";
import Evaluation from "./components/Evaluation";
import Dashboard from "./components/Dashboard";
import AdminHome from "./components/AdminHome";
import AdminLogin from "./components/AdminLogin";
import ManageUsers from "./components/ManageUsers";
import NewUser from "./components/NewUser";
import Settings from "./components/Settings";
import UserNavbar from "./components/UserNavbar";
import UserHome from "./components/UserHome";
import Profile from "./components/Profile";
import AddInternships from "./components/AddInternships";
import AdminIntern from "./components/AdminIntern";
import UserSettings from "./components/UserSettings";
import ViewInternships from "./components/viewInternships"
import ApplyForInternShip from "./components/ApplyForInternShip"
import AppliedInternships from "./components/AppliedInternships"
import AppliedInternShipsByUS from "./components/AppliedInternShipsByUS"
import Admininternshipdetails from "./components/Admininternshipdetails"

function App() {
  // Get the role from localStorage on initial load
  const savedRole = localStorage.getItem("role");
  const [role, setRole] = useState(savedRole);

  // Function to handle login and set the role based on login
  const handleLogin = (userRole) => {
    setRole(userRole);
    localStorage.setItem("role", userRole); // Save the role to localStorage
    console.log("Logged in as:", userRole); // This log confirms the role change
  };

  // Function to handle logout and reset the role
  const handleLogout = () => {
    setRole(null);
    localStorage.removeItem("role"); // Remove the role from localStorage
  };

  return (
    <BrowserRouter>
      {/* Render appropriate Navbar based on the role */}
      {role === "admin" ? (
        <AdminNavBar onLogout={handleLogout} />
      ) : role === "user" ? (
        <UserNavbar onLogout={handleLogout} />
      ) : (
        <NavBar />
      )}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/internships" element={<Internships />} />
        <Route path="/internships/:id" element={<InternshipDetails />} />
        <Route path="/evaluation" element={<Evaluation />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/admin/dashboard" element={<AdminHome />} />
        <Route path="/adminlogin" element={<AdminLogin onLogin={handleLogin} />} />
        <Route path="/admin/users" element={<ManageUsers />} />
        <Route path="/admin/users/new" element={<NewUser />} />
        <Route path="/admin/settings" element={<Settings />} />
        <Route path="/admin/internship" element={<ViewInternships />} />
        <Route path="/userhome" element={<UserHome />} />
        <Route path="/addinternship" element={<AddInternships />} />
        <Route path="/adminintern" element={<AdminIntern />} />
        <Route path="/usersettings" element={<UserSettings />} />
        <Route path="/applyinternship/:id" element={<ApplyForInternShip />} />
        <Route path="/appliedInternships" element={<AppliedInternships />} />
        <Route path="/userappliedInternships" element={<AppliedInternShipsByUS />} />
        <Route path="/admininternshipdetails/:id" element={<Admininternshipdetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
