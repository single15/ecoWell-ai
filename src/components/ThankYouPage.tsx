import FileDownloadDoneIcon from "@mui/icons-material/FileDownloadDone";
import { Box, Button, Paper, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../app/store";

const ThankYouPage: React.FC = () => {
  const navigate = useNavigate();
  const { lastSubmission } = useSelector((state: RootState) => state.survey);

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
          Thank you, {lastSubmission?.employeeName}!
        </Typography>
        <Typography variant="h6" color="#187459" mb={3}>
          Thanks for sharing your wellness journey with us.
        </Typography>

        {lastSubmission && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: 3,
            }}
          >
            <Box
              sx={{
                backgroundColor: "#f0fff9",
                borderRadius: 4,
                p: 3,
                boxShadow: "0 4px 12px rgba(21, 153, 87, 0.2)",
                textAlign: "center",
                maxWidth: 400,
              }}
            >
              <Typography variant="h5" fontWeight={700} color="#159957" mb={2}>
                🌿 AI Wellness Insight
              </Typography>
              <Typography variant="body1" mb={2}>
                <strong>📊 Sentiment Score:</strong>{" "}
                <span style={{ color: "#159957", fontWeight: 600 }}>
                  {lastSubmission.sentimentScore}
                </span>
              </Typography>
              <Typography variant="body1" mb={2}>
                <strong>🧠 Sentiment:</strong>{" "}
                <span style={{ color: "#187459", fontWeight: 600 }}>
                  {lastSubmission.sentimentLabel}
                </span>
              </Typography>
              <Typography variant="body2" mb={2}>
                <strong>🔍 AI Analysis:</strong>
                <br />
                <br />
                <span style={{ fontStyle: "italic", color: "#444" }}>
                  {lastSubmission.aiAnalysis}
                </span>
              </Typography>
            </Box>
          </Box>
        )}

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
