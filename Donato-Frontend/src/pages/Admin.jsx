// src/pages/Admin.jsx
import React from "react";
import { Redirect } from "react-router-dom";
import AdminDashboard from "../components/AdminDashboard/AdminDashboard";

const Admin = ({ user }) => {
  // Protect the route: only allow if user is admin
  if (!user || user.role !== "admin") {
    return <Redirect to="/FirstPage" />;
  }

  return <AdminDashboard />;
};

export default Admin;
