import { AppBar, Box, Button, Container, Toolbar, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import SurveyBot from './components/SurveyBot';
import SurveyForm from './components/SurveyForm';
import ThankYou from './components/ThankYou';

const App: React.FC = () => {

  useEffect(() => {
    document.title = 'EcoWell Nexus AI';
  }, []);

  return (
    <Container disableGutters maxWidth={false} sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #e0f7fa 0%, #fffde4 100%)', p: 0 }}>
      <AppBar
        position="static"
        elevation={3}
        sx={{
          background: 'linear-gradient(90deg, #26c6da 0%, #43e97b 100%)',
          mb: 3,
        }}
      >
        <Toolbar>
          <Typography
            variant="h5"
            sx={{
              flexGrow: 1,
              fontWeight: 700,
              letterSpacing: 2,
              color: '#fff',
              textShadow: '1px 1px 4px #43e97b55',
            }}
          >
            EcoWell Nexus AI
          </Typography>
          <Box>
            <Button
              color="inherit"
              component={Link}
              to="/"
              sx={{
                mx: 1,
                fontWeight: 600,
                letterSpacing: 1,
                borderRadius: 2,
                '&:hover': {
                  background: '#e0f7fa44',
                },
              }}
            >
              Home
            </Button>
            <Button
              color="inherit"
              component={Link}
              to="/dashboard"
              sx={{
                mx: 1,
                fontWeight: 600,
                letterSpacing: 1,
                borderRadius: 2,
                '&:hover': {
                  background: '#e0f7fa44',
                },
              }}
            >
              Dashboard
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Box sx={{ py: 4 }}>
        <Routes>
          <Route path="/" element={<SurveyBot />} />
          <Route path="/survey" element={<SurveyForm />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/thank-you" element={<ThankYou />} />
        </Routes>
      </Box>
    </Container>
  );
};

export default App;
