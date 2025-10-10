import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DashboardStatsDto } from "../../utils/apiTypes";

interface DashboardState {
  stats: DashboardStatsDto | null;
  loading: boolean;
  error?: string | null;
}

const initialState: DashboardState = {
  stats: null,
  loading: false,
  error: null,
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    fetchDashboardStatsRequested(state) {
      state.loading = true;
      state.error = null;
    },
    fetchDashboardStatsSucceeded(
      state,
      action: PayloadAction<DashboardStatsDto>
    ) {
      state.loading = false;
      state.stats = action.payload;
    },
    fetchDashboardStatsFailed(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchDashboardStatsRequested,
  fetchDashboardStatsSucceeded,
  fetchDashboardStatsFailed,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
