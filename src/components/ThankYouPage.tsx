import { Box, Button, Paper, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../app/store";
import logo from "../assets/logos/logo.png";

const ThankYouPage: React.FC = () => {
  const navigate = useNavigate();
  const { lastSubmission } = useSelector((state: RootState) => state.survey);

  useEffect(() => {
    if (!lastSubmission?.employeeName) {
      navigate("/");
    }
  }, [lastSubmission?.employeeName, navigate]);

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
        sx={{
          maxWidth: 440,
          mx: "auto",
          p: 5,
          borderRadius: 7,
          mt: 5,
          textAlign: "center",
          boxShadow: "0 7px 24px #70eadc44",
        }}
      >
        <img
          src={logo}
          alt="ecoWell Logo"
          style={{ width: 120, marginBottom: 16 }}
        />
        {/*<FileDownloadDoneIcon sx={{ fontSize: 52, color: "#159957", mb: 1 }} />*/}
        <Typography variant="h4" fontWeight={900} mb={1}>
          Thank you, {lastSubmission?.employeeName}!
        </Typography>
        <Typography variant="h6" color="#187459" mb={3}>
          Thanks for sharing your wellness journey with us.
        </Typography>
        <Box mt={4}>
          <Button
            variant="text"
            onClick={() => navigate("/")}
            sx={{ fontWeight: 700 }}
          >
            Back to Home
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default ThankYouPage;
