import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { Box, Card, CardContent, Divider, Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';


function capitalize(word: string) {
  return word ? word.charAt(0).toUpperCase() + word.slice(1) : '';
}

const Dashboard: React.FC = () => {
  const responses = useSelector((state: any) => state.survey.responses);

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
      <Card sx={{ minWidth: 400, p: 3, boxShadow: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <EmojiEventsIcon color="success" sx={{ fontSize: 36, mr: 1 }} />
            <Typography variant="h5" fontWeight={700}>
              Your Wellness Dashboard
            </Typography>
          </Box>
          <Divider sx={{ mb: 2 }} />
          <Typography variant="body1" color="text.secondary" gutterBottom>
            Here’s a summary of your recent wellness survey:
          </Typography>
          <Typography sx={{ mt: 2 }}>
            <strong>Stress Level:</strong> {responses?.stressLevel ? capitalize(responses.stressLevel) : 'N/A'}
          </Typography>
          <Typography>
            <strong>Work Satisfaction:</strong> {responses?.workSatisfaction ? capitalize(responses.workSatisfaction) : 'N/A'}
          </Typography>
          <Typography>
            <strong>Team Inclusion:</strong> {responses?.inclusionFeeling ? capitalize(responses.inclusionFeeling) : 'N/A'}
          </Typography>
          {!responses && (
            <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: 'block' }}>
              (No survey data found. Please complete the survey.)
            </Typography>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default Dashboard;
