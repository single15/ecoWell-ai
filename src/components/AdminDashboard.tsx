import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { RootState } from "../app/store";
import { fetchDashboardStatsRequested } from "../features/dashboard/dashboardSlice";
import { setRole } from "../features/users/userSlice";
import { getDummyEmployees } from "../utils/mockEmployees";
import AdminNavBar from "./AdminNavBar";

const AdminDashboard: React.FC = () => {
  const dispatch = useDispatch();
  const { stats, loading } = useSelector((s: RootState) => s.dashboard);
  useEffect(() => {
    if (!stats && !loading) {
      dispatch(fetchDashboardStatsRequested());
    }
  }, [stats, loading, dispatch]);
  const allEmployeeData = useSelector(
    (state: RootState) => state.survey.responses
  );
  const demoResponses = useMemo(() => {
    const employees = getDummyEmployees(40);
    const randomInRange = (min: number, max: number) =>
      Math.floor(Math.random() * (max - min + 1)) + min;
    const pick = <T,>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];
    const sampleNotes = [
      "Feeling motivated this week",
      "Busy with deadlines, but manageable",
      "Trying to improve hydration",
      "Could use more sleep",
      "Team collaboration felt great",
      "Focused and productive",
    ];
    return employees.map((e) => ({
      userName: e.userName,
      userId: e.userId,
      sleepHours: randomInRange(5, 9),
      energyLevel: randomInRange(2, 5),
      stressLevel: randomInRange(1, 5),
      hydrationLevel: randomInRange(2, 5),
      nutritionQuality: randomInRange(2, 5),
      physicalActivity: String(randomInRange(0, 90)),
      mood: randomInRange(2, 5),
      focusLevel: randomInRange(2, 5),
      socialSupport: randomInRange(2, 5),
      meetingsCount: randomInRange(0, 12),
      notes: pick(sampleNotes),
    }));
  }, []);

  const dataToDisplay =
    allEmployeeData && allEmployeeData.length ? allEmployeeData : demoResponses;
  const entriesAny = dataToDisplay as any[];
  const viewEntries = useMemo(() => {
    return (entriesAny || []).map((entry: any, idx: number) => ({
      userId: entry.userId ?? `U${idx + 1}`,
      userName: entry.userName ?? `User ${idx + 1}`,
      sleepHours: entry.sleepHours ?? 0,
      energyLevel: entry.energyLevel ?? 0,
      focusLevel: entry.focusLevel ?? 0,
      physicalActivity: String(entry.physicalActivity ?? 0),
      socialSupport: entry.socialSupport ?? 0,
      meetingsCount: entry.meetingsCount ?? 0,
      stressLevel: entry.stressLevel ?? 0,
      hydrationLevel: entry.hydrationLevel,
      nutritionQuality: entry.nutritionQuality,
      mood: entry.mood,
      notes: entry.notes ?? null,
    }));
  }, [entriesAny]);
  const [selectedUserId, setSelectedUserId] = useState<string>(
    (viewEntries?.[0]?.userId as string) || ""
  );
  useEffect(() => {
    if (!selectedUserId && viewEntries?.length) {
      setSelectedUserId(viewEntries[0].userId as string);
    }
  }, [viewEntries, selectedUserId]);
  const selectedEntry = useMemo(() => {
    return viewEntries?.find((e: any) => e.userId === selectedUserId);
  }, [viewEntries, selectedUserId]);
  // Helper: Prepare chart data, flattening and labeling for Recharts
  function prepareChartData(data: any[]) {
    if (!data?.length) return [];
    return data.map((entry, idx) => ({
      name: entry.userName || `User ${entry.userId || idx + 1}`,
      ...entry,
    }));
  }
  const chartData = prepareChartData(viewEntries || []);

  const handleLogout = () => {
    dispatch(setRole(undefined));
    window.location.href = "/";
  };

  const handleDownloadSelected = () => {
    if (!selectedEntry) return;
    alert(`Downloading report for ${selectedEntry.userName}`);
  };

  return (
    <Box
      sx={{
        minHeight: "85vh",
        background: "linear-gradient(120deg,#e1fff4 40%,#84fab0 100%)",
        pt: 0,
        pb: 6,
      }}
    >
      <AdminNavBar onLogout={handleLogout} />
      <Paper
        elevation={5}
        sx={{
          p: { xs: 2, md: 6 },
          maxWidth: 1400,
          mx: "auto",
          borderRadius: 7,
          boxShadow: "0 10px 28px #70eadc44",
          mb: 5,
        }}
      >
        <Typography
          variant="h3"
          fontWeight={900}
          mb={3}
          sx={{
            background: "linear-gradient(90deg,#159957 0%,#70eadc 100%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Admin Dashboard
        </Typography>
        {/* Stats Cards */}
        <Grid container spacing={2} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                borderRadius: 4,
                py: 2,
                background: "#f7fdfc",
                boxShadow: "0 3px 18px #70eadc26",
              }}
            >
              <CardContent sx={{ textAlign: "center" }}>
                <Typography variant="subtitle1">Avg Sleep</Typography>
                <Typography variant="h5" fontWeight={800} color="#159957">
                  {chartData.length
                    ? (
                        chartData.reduce(
                          (sum, d) => sum + (d.sleepHours || 0),
                          0
                        ) / chartData.length
                      ).toFixed(1)
                    : "–"}{" "}
                  hrs
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                borderRadius: 4,
                py: 2,
                background: "#f9f7fc",
                boxShadow: "0 3px 18px #bfa7fe28",
              }}
            >
              <CardContent sx={{ textAlign: "center" }}>
                <Typography variant="subtitle1">Avg Energy Level</Typography>
                <Typography variant="h5" fontWeight={800} color="#4550e6">
                  {chartData.length
                    ? (
                        chartData.reduce(
                          (sum, d) => sum + (d.energyLevel || 0),
                          0
                        ) / chartData.length
                      ).toFixed(1)
                    : "–"}{" "}
                  / 5
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                borderRadius: 4,
                py: 2,
                background: "#f6fdfd",
                boxShadow: "0 3px 18px #70eadc14",
              }}
            >
              <CardContent sx={{ textAlign: "center" }}>
                <Typography variant="subtitle1">Avg Focus Level</Typography>
                <Typography variant="h5" fontWeight={800} color="#1db482">
                  {chartData.length
                    ? (
                        chartData.reduce(
                          (sum, d) => sum + (d.focusLevel || 0),
                          0
                        ) / chartData.length
                      ).toFixed(1)
                    : "–"}{" "}
                  / 5
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                borderRadius: 4,
                py: 2,
                background: "#fafcf7",
                boxShadow: "0 3px 18px #eafcaa33",
              }}
            >
              <CardContent sx={{ textAlign: "center" }}>
                <Typography variant="subtitle1">Total Activities</Typography>
                <Typography variant="h5" fontWeight={800} color="#f0a958">
                  {chartData.reduce(
                    (sum, d) => sum + (parseInt(d.physicalActivity) || 0),
                    0
                  )}{" "}
                  mins
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        {/* Charts */}
        <Grid container spacing={4} sx={{ mb: 5 }}>
          <Grid item xs={12} md={6}>
            <Paper
              sx={{
                boxShadow: "0 1px 13px #70eadc22",
                borderRadius: 5,
                p: 2,
                mb: 2,
              }}
            >
              <Typography variant="h5" fontWeight={700} color="#159957" mb={1}>
                Sleep Hours (All Employees)
              </Typography>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="sleepHours"
                    stroke="#159957"
                    strokeWidth={3}
                    name="Sleep Hours"
                  />
                </LineChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper
              sx={{
                boxShadow: "0 1px 13px #bfa7fe34",
                borderRadius: 5,
                p: 2,
                mb: 2,
              }}
            >
              <Typography variant="h5" fontWeight={700} color="#4550e6" mb={1}>
                Energy Levels (All Employees)
              </Typography>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="energyLevel"
                    fill="#4550e6"
                    name="Energy Level"
                    radius={[7, 7, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
        </Grid>
        {/* Employee Selection and Details */}
        <Typography variant="h5" fontWeight={800} color="#159957" mb={2} mt={4}>
          Employee Details
        </Typography>
        {viewEntries?.length ? (
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Paper
                sx={{
                  p: 3,
                  borderRadius: 4,
                  background: "#f8fefb",
                  border: "1.5px solid #70eadc33",
                  boxShadow: "0 1px 6px #15995714",
                }}
              >
                <FormControl fullWidth size="medium">
                  <InputLabel id="employee-select-label">
                    Select Employee
                  </InputLabel>
                  <Select
                    labelId="employee-select-label"
                    label="Select Employee"
                    value={selectedUserId}
                    onChange={(e) =>
                      setSelectedUserId(e.target.value as string)
                    }
                  >
                    {viewEntries.map((e: any) => (
                      <MenuItem key={e.userId} value={e.userId}>
                        {e.userName} ({e.userId})
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Paper>
            </Grid>
            <Grid item xs={12} md={8}>
              <Paper
                sx={{
                  p: 3,
                  borderRadius: 4,
                  background: "#f9fffd",
                  border: "1.5px solid #70eadc33",
                  boxShadow: "0 1px 6px #15995714",
                }}
              >
                {selectedEntry ? (
                  <>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        mb: 1,
                      }}
                    >
                      <Typography variant="h6" fontWeight={800} color="#159957">
                        {selectedEntry.userName}{" "}
                        <Typography component="span" color="#7aa399">
                          ({selectedEntry.userId})
                        </Typography>
                      </Typography>
                      <Button
                        variant="outlined"
                        startIcon={<FileDownloadOutlinedIcon />}
                        sx={{ borderRadius: 99, fontWeight: 700 }}
                        onClick={handleDownloadSelected}
                      >
                        Download Report
                      </Button>
                    </Box>
                    <Divider sx={{ mb: 2 }} />
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <Typography>
                          <strong>Sleep:</strong> {selectedEntry.sleepHours} hrs
                        </Typography>
                        <Typography>
                          <strong>Energy:</strong> {selectedEntry.energyLevel}/5
                        </Typography>
                        <Typography>
                          <strong>Focus:</strong> {selectedEntry.focusLevel}/5
                        </Typography>
                        <Typography>
                          <strong>Stress:</strong> {selectedEntry.stressLevel}/5
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography>
                          <strong>Hydration:</strong>{" "}
                          {selectedEntry.hydrationLevel ?? "–"}/5
                        </Typography>
                        <Typography>
                          <strong>Nutrition:</strong>{" "}
                          {selectedEntry.nutritionQuality ?? "–"}/5
                        </Typography>
                        <Typography>
                          <strong>Physical Activity:</strong>{" "}
                          {selectedEntry.physicalActivity} mins
                        </Typography>
                        <Typography>
                          <strong>Meetings Attended:</strong>{" "}
                          {selectedEntry.meetingsCount}
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography>
                          <strong>Social Support:</strong>{" "}
                          {selectedEntry.socialSupport}
                        </Typography>
                        <Typography>
                          <strong>Mood:</strong> {selectedEntry.mood ?? "–"}/5
                        </Typography>
                        <Typography sx={{ mt: 1 }}>
                          <strong>Notes:</strong> {selectedEntry.notes}
                        </Typography>
                      </Grid>
                    </Grid>
                  </>
                ) : (
                  <Typography>Select an employee to view details.</Typography>
                )}
              </Paper>
            </Grid>
          </Grid>
        ) : (
          <Typography>No data available.</Typography>
        )}
      </Paper>
    </Box>
  );
};

export default AdminDashboard;
