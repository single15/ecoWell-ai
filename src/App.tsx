import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import SurveyForm from "./components/SurveyForm";
import ThankYouPage from "./components/ThankYouPage";

const App: React.FC = () => {
  useEffect(() => {
    document.title = "EcoWell Nexus AI";
  }, []);

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/survey" element={<SurveyForm />} />
      <Route path="/thank-you" element={<ThankYouPage />} />
      <Route path="*" element={<LandingPage />} />
    </Routes>
  );
};

export default App;
