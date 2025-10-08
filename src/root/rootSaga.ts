import { all, fork } from "redux-saga/effects";
import { watchSurveySaga } from "../features/survey/surveySaga";


export default function* rootSage() {
  yield all([fork(watchSurveySaga)]);
};

