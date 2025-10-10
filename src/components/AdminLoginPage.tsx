import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import React, { useState } from "react";

interface Props {
  onLogin: () => void;
}

const AdminLoginPage: React.FC<Props> = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (username === "admin" && password === "admin") {
      onLogin();
    } else {
      setError("Incorrect credentials.");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(120deg,#e1fff4 40%,#84fab0 100%)",
      }}
    >
      <Paper
        elevation={7}
        sx={{
          maxWidth: 400,
          mx: "auto",
          mt: 8,
          p: 5,
          borderRadius: 7,
          textAlign: "center",
          boxShadow: "0 8px 28px #70eadc33",
        }}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >
          <AdminPanelSettingsIcon
            sx={{ fontSize: 56, color: "#2182b0", mb: 0.5 }}
          />
          <Typography variant="h4" fontWeight={800} mb={1}>
            Admin Login
          </Typography>
          <Typography mb={3} color="#187459">
            Enter your administrator credentials below.
          </Typography>
          <TextField
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
            sx={{ mb: 2, borderRadius: 3, background: "#f4faff" }}
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            sx={{ mb: 3, borderRadius: 3, background: "#f2f9ff" }}
          />
          {error && (
            <Typography color="error" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}
          <Button
            variant="contained"
            size="large"
            fullWidth
            type="submit"
            sx={{
              py: 1.2,
              borderRadius: 99,
              fontWeight: 700,
              background: "linear-gradient(90deg,#159957 0%,#70eadc 100%)",
            }}
          >
            Login
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default AdminLoginPage;
