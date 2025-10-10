import { all, fork } from "redux-saga/effects";
import { watchSurveySaga } from "../features/survey/surveySaga";
import { watchDashboardSaga } from "../features/dashboard/dashboardSaga";


export default function* rootSage() {
  yield all([fork(watchSurveySaga), fork(watchDashboardSaga)]);
};

