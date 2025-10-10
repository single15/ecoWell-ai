import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import dashboardReducer from "../features/dashboard/dashboardSlice";
import surveyReducer from "../features/survey/surveySlice";
import userReducer from "../features/users/userSlice";
import rootSage from "./rootSaga";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    survey: surveyReducer,
    user: userReducer,
    dashboard: dashboardReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSage);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
