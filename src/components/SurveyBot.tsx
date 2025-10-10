import PsychologyIcon from "@mui/icons-material/Psychology";
import { Avatar, Box, Button, Paper, Typography } from "@mui/material";
import { keyframes } from "@mui/system";
import React from "react";
import { useNavigate } from "react-router-dom";

const botGlow = keyframes`
  0%, 100% { box-shadow: 0 0 20px 2px #70eadc55, 0 2px 16px 0px #84fab071; }
  50% { box-shadow: 0 0 32px 4px #15995755, 0 2px 14px 7px #70c9ff44; }
`;

const SurveyBot: React.FC = () => {
  const navigate = useNavigate();

  const handleStartSurvey = () => {
    navigate("/survey");
  };

  return (
    <Paper
      elevation={6}
      sx={{
        py: 5,
        px: { xs: 3, sm: 5 },
        maxWidth: 440,
        mx: "auto",
        mt: 7,
        borderRadius: 8,
        background:
          "linear-gradient(110deg, #f8fffe 6%, #e0fff7 50%, #70eadc1a 100%)",
        boxShadow: "0 8px 28px #15995733",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Soft decorative background element (SVG wave) */}
      <Box
        sx={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          width: "100%",
          height: 30,
          opacity: 0.23,
          zIndex: 0,
        }}
      >
        <svg width="100%" height="30" viewBox="0 0 200 30">
          <path
            fill="#70eadc"
            fillOpacity=".35"
            d="M0 20 Q50 5 100 20T200 20V30H0V20Z"
          />
        </svg>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mb: 2,
          position: "relative",
          zIndex: 1,
        }}
      >
        <Avatar
          sx={{
            bgcolor: "primary.main",
            width: 70,
            height: 70,
            boxShadow: "0 0 0 7px #70eadc26",
            animation: `${botGlow} 2.7s infinite`,
          }}
        >
          <PsychologyIcon sx={{ fontSize: 39 }} />
        </Avatar>
      </Box>
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          fontWeight: 800,
          background: "linear-gradient(91deg, #159957 20%, #70eadc 80%)",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Wellness Survey Bot
      </Typography>
      <Typography
        variant="body1"
        sx={{
          mb: 3,
          zIndex: 1,
          position: "relative",
          color: "#23524a",
          fontWeight: 500,
        }}
      >
        Ready to improve your wellness? Click below to start the survey!
      </Typography>
      <Button
        variant="contained"
        color="success"
        fullWidth
        onClick={handleStartSurvey}
        size="large"
        sx={{
          py: 1.5,
          borderRadius: 99,
          fontSize: 21,
          fontWeight: 700,
          background: "linear-gradient(88deg, #159957 0%, #70eadc 100%)",
          boxShadow: "0 2px 13px #70eadc55",
          letterSpacing: 0.7,
          transition: "background 0.16s, box-shadow 0.19s",
          "&:hover": {
            background: "linear-gradient(90deg, #70eadc 0%, #159957 100%)",
            boxShadow: "0 4px 16px #15995799",
          },
        }}
      >
        Start Survey
      </Button>
    </Paper>
  );
};

export default SurveyBot;
