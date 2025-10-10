import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  InputAdornment,
  Paper,
  Radio,
  RadioGroup,
  Slider,
  TextField,
  Typography,
} from "@mui/material";
import { keyframes } from "@mui/system";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../app/store";
import { saveSurveyResponses } from "../features/survey/surveySlice";

const submitGlow = keyframes`
  0%,100%{ box-shadow:0 0 12px 2px #1599573c,0 1px 9px 1px #70eadc59; }
  50%{ box-shadow:0 0 22px 6px #70eadc70,0 3px 16px 5px #15995721; }
`;

const SurveyForm: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const role = useSelector((state: RootState) => state.user.role);

  const initialResponses = {
    sleepHours: 0,
    energyLevel: 0,
    stress: null as string | null,
    focusLevel: 0,
    physicalActivity: null as string | null,
    socialSupport: 0,
    comments: null as string | null,
    meetingsCount: 0,
    userName: "",
    userId: "",
  };

  const [responses, setResponses] = useState(initialResponses);

  const isFormValid = (() => {
    const isEmployeeIdentityValid =
      role !== "employee" ||
      (responses.userName.trim().length > 0 &&
        responses.userId.trim().length > 0);
    return isEmployeeIdentityValid;
  })();

  const handleChange = (name: string, value: any) => {
    setResponses((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    dispatch(saveSurveyResponses([responses]));
    navigate("/thank-you");
  };

  const handleReset = () => {
    setResponses(initialResponses);
  };

  return (
    <Paper
      elevation={6}
      sx={{
        p: { xs: 2, sm: 5 },
        pt: { xs: 3, sm: 7 },
        mt: 6,
        maxWidth: 730,
        mx: "auto",
        borderRadius: 7,
        background:
          "linear-gradient(115deg,#f5fffa 13%,#e1fff4 52%,#ddf5e9 100%)",
        boxShadow: "0 10px 28px #15995721",
        position: "relative",
      }}
    >
      <Box sx={{ mb: 1 }}>
        <IconButton
          aria-label="Back to Home"
          onClick={() => navigate("/")}
          sx={{ color: "#159957" }}
        >
          <HomeOutlinedIcon />
        </IconButton>
      </Box>
      <Typography
        variant="h4"
        gutterBottom
        align="center"
        sx={{
          fontWeight: 900,
          letterSpacing: 0.5,
          background: "linear-gradient(91deg, #159957 18%, #70eadc 85%)",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        🌿 Wellness Survey
      </Typography>
      {role === "employee" && (
        <Box mb={3}>
          <Paper
            sx={{
              my: 2,
              background: "#e9fff4",
              px: 3,
              py: 2,
              borderRadius: 4,
              border: "1px solid #70eadc66",
              boxShadow: "0 2px 10px #70eadc21",
            }}
          >
            <Typography sx={{ color: "#0a5d61", fontWeight: 600 }}>
              Your wellbeing matters to us. Your responses are confidential and
              will only be used to support you better.
            </Typography>
          </Paper>
          <TextField
            label="Your Preferred Name"
            placeholder="e.g., Alex Johnson"
            fullWidth
            value={responses.userName || ""}
            onChange={(e) => handleChange("userName", e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonOutlineIcon sx={{ color: "#159957" }} />
                </InputAdornment>
              ),
            }}
            sx={{
              mt: 2,
              mb: 2,
              borderRadius: 3,
              background: "#f5fff7",
              "& .MuiOutlinedInput-root": { borderRadius: 3 },
            }}
          />
          <TextField
            label="Your Employee ID"
            placeholder="e.g., EMP-1024"
            fullWidth
            value={responses.userId || ""}
            onChange={(e) => handleChange("userId", e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <BadgeOutlinedIcon sx={{ color: "#1db482" }} />
                </InputAdornment>
              ),
            }}
            sx={{
              mt: 2,
              mb: 2,
              borderRadius: 3,
              background: "#f5fff7",
              "& .MuiOutlinedInput-root": { borderRadius: 3 },
            }}
          />
        </Box>
      )}
      {/* Section: Sleep Quality */}
      <Divider sx={{ my: 3, borderColor: "#70eadc77" }} />
      <Box>
        <Typography variant="h6" sx={{ fontWeight: 700, color: "#159957" }}>
          🛌 Sleep Quality
        </Typography>
        <TextField
          label="How many hours did you sleep last night?"
          type="number"
          inputProps={{ min: 0, max: 12 }}
          fullWidth
          margin="normal"
          value={responses.sleepHours}
          onChange={(e) => handleChange("sleepHours", Number(e.target.value))}
          sx={{ borderRadius: 4, background: "#f9fff8", mt: 1 }}
        />
      </Box>
      {/* Section: Energy */}
      <Divider sx={{ my: 3, borderColor: "#15995722" }} />
      <Box>
        <Typography variant="h6" sx={{ fontWeight: 700, color: "#1db482" }}>
          ⚡ Energy
        </Typography>
        <Typography gutterBottom>
          Rate your physical energy level today
        </Typography>
        <Slider
          value={responses.energyLevel}
          onChange={(e, val) => handleChange("energyLevel", val)}
          step={1}
          marks
          min={0}
          max={5}
          valueLabelDisplay="auto"
          sx={{
            color: "linear-gradient(90deg, #70eadc 0%, #159957 100%)",
            height: 8,
            borderRadius: 5,
            mt: 2,
          }}
        />
      </Box>
      {/* Section: Stress */}
      <Divider sx={{ my: 3, borderColor: "#70eadc77" }} />
      <Box>
        <Typography variant="h6" sx={{ fontWeight: 700, color: "#f0a958" }}>
          😟 Stress
        </Typography>
        <FormControl component="fieldset" sx={{ mt: 1 }}>
          <FormLabel>
            Are you experiencing signs of stress or anxiety today?
          </FormLabel>
          <RadioGroup
            row
            value={responses.stress}
            onChange={(e) => handleChange("stress", e.target.value)}
            sx={{ mt: 1 }}
          >
            <FormControlLabel
              value="yes"
              control={<Radio color="success" />}
              label="Yes"
            />
            <FormControlLabel
              value="no"
              control={<Radio color="primary" />}
              label="No"
            />
          </RadioGroup>
        </FormControl>
      </Box>
      {/* Section: Focus */}
      <Divider sx={{ my: 3, borderColor: "#15995722" }} />
      <Box>
        <Typography variant="h6" sx={{ fontWeight: 700, color: "#1c6ed2" }}>
          🎯 Cognitive Engagement
        </Typography>
        <Typography gutterBottom>
          How focused or productive do you feel today?
        </Typography>
        <Slider
          value={responses.focusLevel}
          onChange={(e, val) => handleChange("focusLevel", val)}
          step={1}
          marks
          min={0}
          max={5}
          valueLabelDisplay="auto"
          sx={{ color: "#159957", height: 8, borderRadius: 5, mt: 2 }}
        />
      </Box>
      {/* Section: Recovery / Physical Activity */}
      <Divider sx={{ my: 3, borderColor: "#70eadc77" }} />
      <Box>
        <Typography variant="h6" sx={{ fontWeight: 700, color: "#e05757" }}>
          🏃 Recovery
        </Typography>
        <FormControl component="fieldset" sx={{ mt: 1 }}>
          <FormLabel>
            Have you taken any breaks or done physical activity today?
          </FormLabel>
          <RadioGroup
            row
            value={responses.physicalActivity}
            onChange={(e) => handleChange("physicalActivity", e.target.value)}
            sx={{ mt: 1 }}
          >
            <FormControlLabel
              value="yes"
              control={<Radio color="success" />}
              label="Yes"
            />
            <FormControlLabel
              value="no"
              control={<Radio color="primary" />}
              label="No"
            />
          </RadioGroup>
        </FormControl>
      </Box>
      {/* Section: Social Support */}
      <Divider sx={{ my: 3, borderColor: "#70eadc77" }} />
      <Box>
        <Typography variant="h6" sx={{ fontWeight: 700, color: "#159957" }}>
          🤝 Social Support
        </Typography>
        <Typography gutterBottom>
          Do you feel emotionally supported by your team/manager?
        </Typography>
        <Slider
          value={responses.socialSupport}
          onChange={(e, val) => handleChange("socialSupport", val)}
          step={1}
          marks
          min={0}
          max={5}
          valueLabelDisplay="auto"
          sx={{ color: "#70eadc", height: 8, borderRadius: 5, mt: 2 }}
        />
      </Box>
      {/* Section: Meetings Count */}
      <Divider sx={{ my: 3, borderColor: "#70eadc77" }} />
      <Box>
        <Typography variant="h6" sx={{ fontWeight: 700, color: "#735bcb" }}>
          📅 Meetings
        </Typography>
        <TextField
          label="How many meetings did you have today?"
          type="number"
          inputProps={{ min: 0 }}
          fullWidth
          required
          margin="normal"
          value={responses.meetingsCount || 0}
          onChange={(e) =>
            handleChange("meetingsCount", Number(e.target.value))
          }
          sx={{ borderRadius: 4, background: "#f6f7fc", mt: 1 }}
        />
      </Box>
      {/* Section: Comments */}
      <Divider sx={{ my: 3, borderColor: "#70eadc77" }} />
      <Box>
        <Typography variant="h6" sx={{ fontWeight: 700, color: "#1db482" }}>
          💬 Sentiment Input
        </Typography>
        <TextField
          label="Any additional comments or feedback?"
          multiline
          rows={4}
          fullWidth
          value={responses.comments}
          onChange={(e) => handleChange("comments", e.target.value)}
          sx={{ borderRadius: 3, background: "#fcfffd", mt: 1 }}
        />
      </Box>
      <Button
        variant="contained"
        color="primary"
        sx={{
          mt: 4,
          py: 1.6,
          borderRadius: 99,
          fontSize: 22,
          fontWeight: 900,
          letterSpacing: 0.9,
          background: "linear-gradient(90deg,#159957 0%,#70eadc 100%)",
          boxShadow: "0 4px 28px #70eadc61",
          animation: `${submitGlow} 2.2s infinite`,
          transition: "background 0.14s,box-shadow 0.16s",
          "&:hover": {
            background: "linear-gradient(90deg,#70eadc 0%,#159957 100%)",
            boxShadow: "0 6px 38px #15995790",
          },
        }}
        onClick={handleSubmit}
        disabled={!isFormValid}
        fullWidth
      >
        Submit Survey
      </Button>
      <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleReset}
          sx={{
            borderRadius: 99,
            px: 3,
            py: 1.1,
            fontWeight: 800,
            borderColor: "#15995755",
            color: "#1db482",
            boxShadow: "0 2px 12px #70eadc21",
            textTransform: "none",
            "&:hover": {
              borderColor: "#1db482",
              background: "#f0fffa",
              boxShadow: "0 4px 18px #70eadc33",
            },
          }}
        >
          Reset
        </Button>
      </Box>
    </Paper>
  );
};

export default SurveyForm;
