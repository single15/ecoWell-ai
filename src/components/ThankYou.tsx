import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { Box, Button, Paper, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const ThankYou: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
      <Paper elevation={5} sx={{ p: 5, maxWidth: 420, borderRadius: 4, textAlign: 'center' }}>
        <EmojiEventsIcon color="success" sx={{ fontSize: 60, mb: 2 }} />
        <Typography variant="h4" fontWeight={700} color="primary.main" gutterBottom>
          Thank You!
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Your responses have been submitted. We appreciate your feedback and commitment to wellness.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/dashboard')}
        >
          Go to Dashboard
        </Button>
      </Paper>
    </Box>
  );
};

export default ThankYou;
