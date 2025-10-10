import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SurveyState {
  responses: {
    sleepHours: number;
    energyLevel: number;
    stress: string | null;
    focusLevel: number;
    physicalActivity: string | null;
    socialSupport: number;
    comments: string | null;
    meetingsCount: number;
  }[] | null;
}

const initialState: SurveyState = {
  responses: null,
};

const surveySlice = createSlice({
  name: "survey",
  initialState,
  reducers: {
    saveSurveyResponses(
      state,
      action: PayloadAction<SurveyState["responses"]>
    ) {
      state.responses = action.payload;
    },
    surveySubmitted(state) {
      console.log("Survey successfully submitted!");
    },
  },
});

export const { saveSurveyResponses, surveySubmitted } = surveySlice.actions;
export default surveySlice.reducer;
