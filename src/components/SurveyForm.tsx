import Diversity3Icon from '@mui/icons-material/Diversity3';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import WorkIcon from '@mui/icons-material/Work';
import { Box, Button, Divider, FormControl, FormControlLabel, FormLabel, Paper, Radio, RadioGroup, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { saveSurveyResponses } from '../features/survey/surveySlice';

const SurveyForm: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [responses, setResponses] = useState({
    stressLevel: '',
    workSatisfaction: '',
    inclusionFeeling: '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setResponses({
      ...responses,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = () => {
    dispatch(saveSurveyResponses(responses));
    navigate('/thank-you');
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
      <Paper elevation={5} sx={{ p: 5, maxWidth: 480, width: '100%', borderRadius: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <EmojiEmotionsIcon color="primary" sx={{ fontSize: 36, mr: 1 }} />
          <Typography variant="h4" fontWeight={700} color="primary.main">
            Wellness Survey
          </Typography>
        </Box>
        <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 3 }}>
          Your responses help us improve your experience. Please answer honestly.
        </Typography>
        <Divider sx={{ mb: 3 }} />

        <FormControl component="fieldset" sx={{ mb: 4, width: '100%' }}>
          <FormLabel component="legend" sx={{ fontWeight: 600, mb: 1, display: 'flex', alignItems: 'center' }}>
            <EmojiEmotionsIcon sx={{ mr: 1 }} color="info" /> How stressed do you feel today?
          </FormLabel>
          <RadioGroup row name="stressLevel" value={responses.stressLevel} onChange={handleChange}>
            <FormControlLabel value="low" control={<Radio color="success" />} label="Low" />
            <FormControlLabel value="moderate" control={<Radio color="warning" />} label="Moderate" />
            <FormControlLabel value="high" control={<Radio color="error" />} label="High" />
          </RadioGroup>
        </FormControl>

        <FormControl component="fieldset" sx={{ mb: 4, width: '100%' }}>
          <FormLabel component="legend" sx={{ fontWeight: 600, mb: 1, display: 'flex', alignItems: 'center' }}>
            <WorkIcon sx={{ mr: 1 }} color="secondary" /> How satisfied are you with your work?
          </FormLabel>
          <RadioGroup row name="workSatisfaction" value={responses.workSatisfaction} onChange={handleChange}>
            <FormControlLabel value="unsatisfied" control={<Radio color="error" />} label="Unsatisfied" />
            <FormControlLabel value="neutral" control={<Radio color="warning" />} label="Neutral" />
            <FormControlLabel value="satisfied" control={<Radio color="success" />} label="Satisfied" />
          </RadioGroup>
        </FormControl>

        <FormControl component="fieldset" sx={{ mb: 4, width: '100%' }}>
          <FormLabel component="legend" sx={{ fontWeight: 600, mb: 1, display: 'flex', alignItems: 'center' }}>
            <Diversity3Icon sx={{ mr: 1 }} color="primary" /> Do you feel included in your team?
          </FormLabel>
          <RadioGroup row name="inclusionFeeling" value={responses.inclusionFeeling} onChange={handleChange}>
            <FormControlLabel value="no" control={<Radio color="error" />} label="No" />
            <FormControlLabel value="somewhat" control={<Radio color="warning" />} label="Somewhat" />
            <FormControlLabel value="yes" control={<Radio color="success" />} label="Yes" />
          </RadioGroup>
        </FormControl>

        <Button
          variant="contained"
          color="primary"
          size="large"
          fullWidth
          sx={{ mt: 2, fontWeight: 700, borderRadius: 2, boxShadow: 2 }}
          onClick={handleSubmit}
          disabled={
            !responses.stressLevel ||
            !responses.workSatisfaction ||
            !responses.inclusionFeeling
          }
        >
          Submit Survey
        </Button>
      </Paper>
    </Box>
  );
};

export default SurveyForm;
