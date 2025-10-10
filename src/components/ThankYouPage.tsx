import FileDownloadDoneIcon from "@mui/icons-material/FileDownloadDone";
import { Box, Button, Paper, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const ThankYouPage: React.FC = () => {
  const navigate = useNavigate();
  const handleDownload = () => {
    // TODO: Implement download (use jsPDF or similar)
    alert(
      "Download functionality will generate a personalized PDF based on your survey."
    );
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
        <FileDownloadDoneIcon sx={{ fontSize: 52, color: "#159957", mb: 1 }} />
        <Typography variant="h4" fontWeight={900} mb={1}>
          Thank you!
        </Typography>
        <Typography variant="h6" color="#187459" mb={3}>
          Thanks for sharing your wellness journey with us.
          <br />
          <b>Your report is ready for download.</b>
        </Typography>
        <Button
          variant="contained"
          size="large"
          sx={{
            borderRadius: 99,
            fontSize: 20,
            background: "linear-gradient(90deg,#159957 0%,#70eadc 100%)",
            fontWeight: 700,
            px: 6,
            py: 1.3,
          }}
          onClick={handleDownload}
        >
          Download Report
        </Button>
        <Box mt={2}>
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
