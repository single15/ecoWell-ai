import { Box } from "@mui/material";
import { keyframes } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { RootState } from "./app/store";
import AdminLoginPage from "./components/AdminLoginPage";
import Dashboard from "./components/Dashboard";
import LandingPage from "./components/LandingPage";
import ReportPage from "./components/ReportPage";
import SurveyForm from "./components/SurveyForm";
import ThankYouPage from "./components/ThankYouPage";
import { setRole } from "./features/users/userSlice";

const glow = keyframes`
  0%, 100% { box-shadow: 0 0 14px 4px #70eadc33, 0 2px 20px 2px #84fab071; }
  50% { box-shadow: 0 0 30px 8px #70eadc55, 0 2px 20px 7px #70c9ff44; }
`;

const App: React.FC = () => {
  const dispatch = useDispatch();
  const role = useSelector((state: RootState) => state.user.role);
  const [adminLoggedIn, setAdminLoggedIn] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "EcoWell Nexus AI";
  }, []);

  // Prevent navigation to other pages when role is not specified
  useEffect(() => {
    if (!role && location.pathname !== "/") {
      navigate("/", { replace: true });
    }
  }, [role, location.pathname, navigate]);

  // App Routing Logic
  if (!role || location.pathname === "/") {
    return (
      <LandingPage
        setRole={(r) => {
          dispatch(setRole(r));
          if (r === "admin") navigate("/admin-login");
          else navigate("/survey");
        }}
      />
    );
  }
  if (role === "employee") {
    // Employee flow: survey then thank you + download
    return (
      <Routes>
        <Route path="/survey" element={<SurveyForm />} />
        <Route path="/thank-you" element={<ThankYouPage />} />
        <Route path="*" element={<SurveyForm />} />
      </Routes>
    );
  }
  if (role === "admin") {
    if (!adminLoggedIn && location.pathname !== "/admin-login") {
      navigate("/admin-login");
      return null;
    }
    return (
      <Box>
        {/* Admin AppBar/Nav here if desired */}
        <Routes>
          <Route
            path="/admin-login"
            element={
              <AdminLoginPage
                onLogin={() => {
                  setAdminLoggedIn(true);
                  navigate("/dashboard");
                }}
              />
            }
          />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/reports" element={<ReportPage />} />
          <Route path="*" element={<Dashboard />} />
        </Routes>
      </Box>
    );
  }
  return null;
};

export default App;
