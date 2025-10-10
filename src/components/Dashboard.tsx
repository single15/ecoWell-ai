// components/Dashboard.tsx
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import AdminDashboard from "./AdminDashboard";
import EmployeeDashboard from "./EmployeeDashboard";

const Dashboard: React.FC = () => {
  const user = useSelector((state: RootState) => state.user);
  if (user.role === "admin") {
    return <AdminDashboard />;
  }
  return <EmployeeDashboard />;
};

export default Dashboard;
