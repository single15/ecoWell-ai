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
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../app/store";
import logo from "../assets/logos/logo.jfif";
import {
  fetchActiveSurveyRequested,
  submitSurveyRequested,
} from "../features/survey/surveySlice";

const submitGlow = keyframes`
  0%,100%{ box-shadow:0 0 12px 2px #1599573c,0 1px 9px 1px #70eadc59; }
  50%{ box-shadow:0 0 22px 6px #70eadc70,0 3px 16px 5px #15995721; }
`;

const SurveyForm: React.FC = () => {
  const [responses, setResponses] = useState({
    userName: "",
    userId: "",
  });
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { activeSurvey, loadingActive, submitting } = useSelector(
    (state: RootState) => state.survey
  );

  const requestedRef = useRef(false);

  useEffect(() => {
    if (!requestedRef.current) {
      requestedRef.current = true;
      dispatch(fetchActiveSurveyRequested());
    }
  }, [dispatch]);

  const isQuestionAnswered = (q: any) => {
    const type = String(q.type || "");
    const val = answers[q.id];
    if (type === "Rating") {
      // Rating: valid if answer exists in map (0..5 allowed)
      return Object.prototype.hasOwnProperty.call(answers, q.id);
    }
    if (type === "Text") {
      return typeof val === "string" && val.trim().length > 0;
    }
    // YesNo / MultipleChoice: must be non-empty string
    return typeof val === "string" && val.length > 0;
  };

  const handleChange = (name: string, value: any) => {
    setResponses((prev) => ({ ...prev, [name]: value }));
  };

  const setAnswer = (questionId: number, value: string | number | boolean) => {
    setAnswers((prev) => ({ ...prev, [questionId]: String(value) }));
  };

  const questions = useMemo(() => {
    if (!activeSurvey?.questions) return [] as any[];
    // Normalize key name (questionText vs questionsText) and ensure array sorted by orderIndex
    const normalized = [...activeSurvey.questions].map((q: any) => ({
      ...q,
      questionText: q.questionText ?? q.questionsText ?? "",
    }));

    // Filter out identity-like questions to avoid duplicating Name and Employee ID fields
    const isIdentityLike = (text: string | null | undefined) => {
      if (!text) return false;
      const t = String(text).toLowerCase();
      return (
        t.includes("employee id") ||
        (t.includes("employee") && t.includes("id")) ||
        (t.includes("your") && t.includes("name")) ||
        t === "name"
      );
    };

    return normalized
      .filter((q) => !isIdentityLike(q.questionText))
      .sort((a, b) => (a.orderIndex ?? 0) - (b.orderIndex ?? 0));
  }, [activeSurvey]);

  const isFormValid = (() => {
    const isEmployeeIdentityValid =
      responses.userName.trim().length > 0 &&
      responses.userId.trim().length > 0;
    const allQuestionsAnswered = questions.every((q) => isQuestionAnswered(q));
    return isEmployeeIdentityValid && allQuestionsAnswered;
  })();

  const parseOptions = (opts: any): string[] | null => {
    if (!opts) return null;
    if (Array.isArray(opts)) return opts as string[];
    if (typeof opts === "string") {
      try {
        const parsed = JSON.parse(opts);
        return Array.isArray(parsed) ? (parsed as string[]) : null;
      } catch {
        return null;
      }
    }
    return null;
  };

  const getAccentForIndex = (idx: number) => {
    const accents = [
      { color: "#159957", bg: "#f1fffa", border: "#70eadc66" },
      { color: "#1db482", bg: "#f5fffb", border: "#b6f2e233" },
      { color: "#1c6ed2", bg: "#f2f8ff", border: "#a7c9f766" },
      { color: "#e05757", bg: "#fff5f5", border: "#ffc4c466" },
      { color: "#735bcb", bg: "#f6f3ff", border: "#c9bdf666" },
      { color: "#f0a958", bg: "#fff8ef", border: "#ffd8a666" },
    ];
    return accents[idx % accents.length];
  };

  const handleSubmit = () => {
    if (!activeSurvey) return;
    const employeeId = Number(responses.userId || 0);
    const payload = {
      surveyId: activeSurvey.id,
      employeeId,
      answers: questions.map((q: any) => ({
        questionId: q.id,
        answerText: answers[q.id] ?? "",
      })),
    };
    dispatch(submitSurveyRequested(payload));
    navigate("/thank-you");
  };

  const handleReset = () => {
    setResponses({
      userName: "",
      userId: "",
    });
    setAnswers({});
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
      <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
        <img src={logo} alt="EcoWell Nexus logo" height={60} />
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
        {activeSurvey?.title ?? "🌿 Wellness Survey"}
      </Typography>
      {loadingActive && (
        <Typography align="center" sx={{ mb: 2 }}>
          Loading survey...
        </Typography>
      )}
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
          required
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
          required
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
      {/* Dynamic Questions from Active Survey */}
      {questions.map((q: any, idx: number) => {
        const type = String(q.type || "");
        const opts = parseOptions(q.options);
        const value = answers[q.id] ?? "";
        const dividerColor = idx % 2 === 0 ? "#70eadc77" : "#15995722";
        const accent = getAccentForIndex(idx);
        return (
          <React.Fragment key={q.id}>
            <Divider sx={{ my: 3, borderColor: dividerColor }} />
            <Paper
              elevation={3}
              sx={{
                p: 2.5,
                px: { xs: 2, sm: 3 },
                py: { xs: 2, sm: 2.5 },
                borderRadius: 4,
                background: accent.bg,
                border: `1px solid ${accent.border}`,
                boxShadow: "0 6px 20px #0000000d",
                transition: "transform 120ms ease, box-shadow 140ms ease",
                "&:hover": {
                  transform: "translateY(-1px)",
                  boxShadow: "0 10px 26px #00000014",
                },
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 800,
                  color: accent.color,
                  letterSpacing: 0.2,
                }}
              >
                {q.questionText}
              </Typography>
              {type === "Rating" && (
                <>
                  <Typography gutterBottom>Rate from 0 to 5</Typography>
                  <Slider
                    value={value === "" ? 0 : Number(value)}
                    onChange={(e, val) =>
                      setAnswer(q.id, Number(val as number))
                    }
                    step={1}
                    marks
                    min={0}
                    max={5}
                    valueLabelDisplay="auto"
                    sx={{
                      color: accent.color,
                      height: 10,
                      borderRadius: 5,
                      mt: 2,
                      "& .MuiSlider-track": { border: "none" },
                      "& .MuiSlider-thumb": {
                        width: 22,
                        height: 22,
                        backgroundColor: "#fff",
                        boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
                        border: `2px solid ${accent.color}`,
                        "&:hover": { boxShadow: "0 4px 16px rgba(0,0,0,0.18)" },
                      },
                      "& .MuiSlider-rail": { opacity: 0.3 },
                    }}
                  />
                </>
              )}
              {type === "YesNo" && (
                <FormControl component="fieldset" required sx={{ mt: 1 }}>
                  <FormLabel required>Choose one</FormLabel>
                  <RadioGroup
                    row
                    value={value}
                    onChange={(e) => setAnswer(q.id, e.target.value)}
                    sx={{ mt: 1 }}
                  >
                    <FormControlLabel
                      value="Yes"
                      control={
                        <Radio
                          sx={{ "&.Mui-checked": { color: accent.color } }}
                        />
                      }
                      label="Yes"
                    />
                    <FormControlLabel
                      value="No"
                      control={
                        <Radio
                          sx={{ "&.Mui-checked": { color: accent.color } }}
                        />
                      }
                      label="No"
                    />
                  </RadioGroup>
                </FormControl>
              )}
              {type === "MultipleChoice" && (
                <FormControl component="fieldset" required sx={{ mt: 1 }}>
                  <FormLabel required>Choose one</FormLabel>
                  <RadioGroup
                    value={value}
                    onChange={(e) => setAnswer(q.id, e.target.value)}
                    sx={{ mt: 1 }}
                  >
                    {(opts ?? []).map((op) => (
                      <FormControlLabel
                        key={op}
                        value={op}
                        control={
                          <Radio
                            sx={{ "&.Mui-checked": { color: accent.color } }}
                          />
                        }
                        label={op}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
              )}
              {type === "Text" && (
                <TextField
                  placeholder="Your response"
                  multiline
                  rows={4}
                  fullWidth
                  required
                  value={value}
                  onChange={(e) => setAnswer(q.id, e.target.value)}
                  sx={{
                    borderRadius: 3,
                    background: "#fcfffd",
                    mt: 1,
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 3,
                      "& fieldset": { borderColor: accent.border },
                      "&:hover fieldset": { borderColor: accent.color },
                      "&.Mui-focused fieldset": { borderColor: accent.color },
                    },
                  }}
                />
              )}
            </Paper>
          </React.Fragment>
        );
      })}
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
