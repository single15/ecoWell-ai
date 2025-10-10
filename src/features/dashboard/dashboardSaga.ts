import { call, put, takeLatest } from "redux-saga/effects";
import { DashboardApi } from "../../utils/api";
import { DashboardStatsDtoApiResponse } from "../../utils/apiTypes";
import {
  fetchDashboardStatsFailed,
  fetchDashboardStatsRequested,
  fetchDashboardStatsSucceeded,
} from "./dashboardSlice";

function* fetchStats(): Generator<unknown, void, unknown> {
  try {
    const resp: DashboardStatsDtoApiResponse = (yield call(
      DashboardApi.getStats
    )) as DashboardStatsDtoApiResponse;
    if (resp?.success && resp.data) {
      yield put(fetchDashboardStatsSucceeded(resp.data));
    } else {
      yield put(
        fetchDashboardStatsFailed(resp?.message || "Failed to fetch stats")
      );
    }
  } catch (err: any) {
    yield put(fetchDashboardStatsFailed(err?.message || "Network error"));
  }
}

export function* watchDashboardSaga() {
  yield takeLatest(fetchDashboardStatsRequested.type, fetchStats);
}
