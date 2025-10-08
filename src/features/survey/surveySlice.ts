import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SurveyState {
  responses: {
    stressLevel: string;
    workSatisfaction: string;
    inclusionFeeling: string;
  } | null;
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
