import { put, takeLatest } from "redux-saga/effects";
import { saveSurveyResponses, surveySubmitted } from "./surveySlice";

function* handleSurveySubmission(
  action: ReturnType<typeof saveSurveyResponses>
) {
  try {
    // Simulate API call or processing
    console.log("Survey data received:", action.payload);

    // Dispatch a success action (you can also handle errors here)
    yield put(surveySubmitted());
  } catch (error) {
    console.error("Survey submission failed:", error);
    // Optionally dispatch a failure action
  }
}



export function* watchSurveySaga() {
  yield takeLatest(saveSurveyResponses.type, handleSurveySubmission);
}
