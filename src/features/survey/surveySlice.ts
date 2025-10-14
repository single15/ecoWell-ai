import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  SubmitSurveyRequest,
  SurveyDto,
  SurveyResponseDto,
} from "../../utils/apiTypes";

interface SurveyState {
  responses:
    | {
        sleepHours: number;
        energyLevel: number;
        stress: string | null;
        focusLevel: number;
        physicalActivity: string | null;
        socialSupport: number;
        comments: string | null;
        meetingsCount: number;
      }[]
    | null;
  activeSurvey: SurveyDto | null;
  loadingActive: boolean;
  submitRequest: SubmitSurveyRequest | null;
  submitting: boolean;
  lastSubmission: SurveyResponseDto | null;
  error?: string | null;
}

const initialState: SurveyState = {
  responses: null,
  activeSurvey: null,
  loadingActive: false,
  submitRequest: null,
  submitting: false,
  lastSubmission: null,
  error: null,
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
    // Fetch Active Survey
    fetchActiveSurveyRequested(state) {
      state.loadingActive = true;
      state.error = null;
    },
    fetchActiveSurveySucceeded(state, action: PayloadAction<SurveyDto | null>) {
      state.loadingActive = false;
      state.activeSurvey = action.payload;
    },
    fetchActiveSurveyFailed(state, action: PayloadAction<string>) {
      state.loadingActive = false;
      state.error = action.payload;
    },
    // Submit survey
    submitSurveyRequested(state, action: PayloadAction<SubmitSurveyRequest>) {
      state.submitting = true;
      state.submitRequest = action.payload;
      state.error = null;
    },
    submitSurveySucceeded(state, action: PayloadAction<SurveyResponseDto>) {
      state.submitting = false;
      state.lastSubmission = action.payload;
    },
    submitSurveyFailed(state, action: PayloadAction<string>) {
      state.submitting = false;
      state.error = action.payload;
    },
  },
});

export const {
  saveSurveyResponses,
  fetchActiveSurveyRequested,
  fetchActiveSurveySucceeded,
  fetchActiveSurveyFailed,
  submitSurveyRequested,
  submitSurveySucceeded,
  submitSurveyFailed,
} = surveySlice.actions;
export default surveySlice.reducer;
