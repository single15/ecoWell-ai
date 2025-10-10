import LogoutIcon from "@mui/icons-material/Logout";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import { Link, useLocation } from "react-router-dom";

interface AdminNavBarProps {
  onLogout?: () => void;
}

const AdminNavBar: React.FC<AdminNavBarProps> = ({ onLogout }) => {
  const location = useLocation();
  const navLinks = [
    { label: "Dashboard", to: "/dashboard" },
    { label: "Reports", to: "/reports" },
    { label: "Admin Settings", to: "/admin-settings" },
  ];
  return (
    <AppBar
      position="static"
      elevation={4}
      sx={{
        background: "linear-gradient(90deg, #159957 0%, #70eadc 100%)",
        boxShadow: "0 6px 18px #15995722",
        borderBottomLeftRadius: 19,
        borderBottomRightRadius: 19,
        mb: 6,
      }}
    >
      <Toolbar
        sx={{
          minHeight: 66,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: { xs: 2, md: 6 },
          position: "relative",
        }}
      >
        <Typography
          variant="h5"
          fontWeight={900}
          sx={{ color: "#fff", letterSpacing: 1 }}
        >
          EcoWell Admin
        </Typography>
        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          {navLinks.map((link) => (
            <Button
              key={link.label}
              component={Link}
              to={link.to}
              variant={location.pathname === link.to ? "contained" : "outlined"}
              sx={{
                borderRadius: 99,
                fontWeight: 700,
                background:
                  location.pathname === link.to
                    ? "linear-gradient(90deg,#fff 70%,#70eadc99 100%)"
                    : "rgba(255,255,255,0)",
                color: location.pathname === link.to ? "#159957" : "#fff",
                borderColor: "#fff",
                px: 4,
                fontSize: 18,
                boxShadow:
                  location.pathname === link.to ? "0 2px 8px #fff5" : "none",
                textTransform: "none",
                transition: "all 0.2s",
                "&:hover": {
                  background: "linear-gradient(90deg,#fff 60%,#70eadc3b 100%)",
                  color: "#159957",
                  borderColor: "#fff",
                },
              }}
            >
              {link.label}
            </Button>
          ))}
          {onLogout && (
            <IconButton
              color="inherit"
              sx={{
                ml: 2,
                borderRadius: 99,
                background: "rgba(255,255,255,0.14)",
                "&:hover": { background: "rgba(255,255,255,0.27)" },
              }}
              onClick={onLogout}
              title="Logout"
            >
              <LogoutIcon sx={{ fontSize: 28, color: "#fff" }} />
            </IconButton>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default AdminNavBar;
