import { call, put, takeLatest } from "redux-saga/effects";
import { SurveysApi } from "../../utils/api";
import {
  SurveyDtoApiResponse,
  SurveyResponseDtoApiResponse,
} from "../../utils/apiTypes";
import {
  fetchActiveSurveyFailed,
  fetchActiveSurveyRequested,
  fetchActiveSurveySucceeded,
  saveSurveyResponses,
  submitSurveyFailed,
  submitSurveyRequested,
  submitSurveySucceeded,
} from "./surveySlice";

function* fetchActiveSurvey(): Generator<unknown, void, unknown> {
  try {
    const data: SurveyDtoApiResponse = (yield call(
      SurveysApi.getActive
    )) as SurveyDtoApiResponse;
    if (data?.success) {
      yield put(fetchActiveSurveySucceeded(data.data ?? null));
    } else {
      yield put(
        fetchActiveSurveyFailed(data?.message || "Failed to load survey")
      );
    }
  } catch (err: any) {
    yield put(fetchActiveSurveyFailed(err?.message || "Network error"));
  }
}

function* submitSurvey(
  action: ReturnType<typeof submitSurveyRequested>
): Generator<unknown, void, unknown> {
  try {
    const resp: SurveyResponseDtoApiResponse = (yield call(
      SurveysApi.submit,
      action.payload
    )) as SurveyResponseDtoApiResponse;
    if (resp?.success && resp.data) {
      yield put(submitSurveySucceeded(resp.data));
    } else {
      yield put(submitSurveyFailed(resp?.message || "Submit failed"));
    }
  } catch (err: any) {
    yield put(submitSurveyFailed(err?.message || "Network error"));
  }
}

export function* watchSurveySaga() {
  yield takeLatest(fetchActiveSurveyRequested.type, fetchActiveSurvey);
  yield takeLatest(submitSurveyRequested.type, submitSurvey);
  // Legacy local save path still supported if used elsewhere
  yield takeLatest(saveSurveyResponses.type, function* () {});
}
