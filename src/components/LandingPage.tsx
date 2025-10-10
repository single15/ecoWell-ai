import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import NaturePeopleIcon from "@mui/icons-material/NaturePeople";
import { Box, Grid, Paper, Typography } from "@mui/material";
import React from "react";

interface LandingPageProps {
  setRole: (role: "employee" | "admin") => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ setRole }) => {
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
        elevation={6}
        sx={{
          p: { xs: 3, sm: 6 },
          borderRadius: 7,
          maxWidth: 600,
          mx: "auto",
          mt: { xs: 4, md: 0 },
          textAlign: "center",
          boxShadow: "0 6px 24px #70eadc44",
        }}
      >
        <Typography
          variant="h3"
          fontWeight={900}
          mb={2}
          sx={{
            background: "linear-gradient(91deg, #159957 18%, #70eadc 85%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Welcome to EcoWell Nexus
        </Typography>
        <Typography variant="h6" mb={4} sx={{ color: "#245b36" }}>
          Start your journey:
          <br />
          Choose your role to continue.
        </Typography>
        <Grid container spacing={5} justifyContent="center">
          <Grid item xs={12} sm={6}>
            <Paper
              elevation={3}
              sx={{
                borderRadius: 5,
                p: 3,
                bgColor: "#f9fff9",
                "&:hover": {
                  boxShadow: "0 4px 28px #70eadc26",
                  background: "#e8fff3",
                },
                transition: "all 0.24s",
                cursor: "pointer",
              }}
              onClick={() => setRole("employee")}
            >
              <NaturePeopleIcon
                sx={{ fontSize: 56, color: "#159957", mb: 1 }}
              />
              <Typography variant="h5" fontWeight={700} mb={1} color="#159957">
                I’m an Employee
              </Typography>
              <Typography variant="body1" color="#325b3d">
                Take a wellness survey with care and trust.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper
              elevation={3}
              sx={{
                borderRadius: 5,
                p: 3,
                bgColor: "#eefafe",
                "&:hover": {
                  boxShadow: "0 4px 28px #15995717",
                  background: "#e5f3fa",
                },
                transition: "all 0.24s",
                cursor: "pointer",
              }}
              onClick={() => setRole("admin")}
            >
              <AdminPanelSettingsIcon
                sx={{ fontSize: 56, color: "#2182b0", mb: 1 }}
              />
              <Typography variant="h5" fontWeight={700} mb={1} color="#2182b0">
                I’m an Admin
              </Typography>
              <Typography variant="body1" color="#325b3d">
                Access insights and manage wellness results.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default LandingPage;
