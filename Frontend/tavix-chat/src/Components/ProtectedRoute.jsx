import React from "react";
import { Navigate } from "react-router-dom";
import { useLoginStore } from "../Store/useLoginStore";

const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("User"));
  return user ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;
