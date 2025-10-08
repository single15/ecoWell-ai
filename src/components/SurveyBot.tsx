import PsychologyIcon from '@mui/icons-material/Psychology';
import { Avatar, Box, Button, Paper, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const SurveyBot: React.FC = () => {
  const navigate = useNavigate()

  const handleStartSurvey = () => {
    navigate('/survey');
  };

  return (
    <Paper elevation={4} sx={{ p: 4, maxWidth: 400, mx: 'auto' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
          <PsychologyIcon />
        </Avatar>
        <Typography variant="h5">
          Wellness Survey Bot
        </Typography>
      </Box>
      <Typography variant="body1" sx={{ mb: 2 }}>
        Ready to improve your wellness? Click below to start the survey!
      </Typography>
      <Button variant="contained" color="success" fullWidth onClick={handleStartSurvey}>
        Start Survey
      </Button>
    </Paper>
  );
};

export default SurveyBot;
