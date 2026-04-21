import React from "react";
import Theme from "./Components/Theme";
import Login from "./Pages/Login";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import ProtectedRoute from "./Components/ProtectedRoute";

const App = () => {
  return (
    <div className="min-h-screen bg-gray">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
