import { Box, Card, CardContent, Grid, Paper, Typography } from "@mui/material";
import React from "react";
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
import { setRole } from "../features/users/userSlice";
import AdminNavBar from "./AdminNavBar";

const AdminDashboard: React.FC = () => {
  const dispatch = useDispatch();
  const allEmployeeData = useSelector(
    (state: RootState) => state.survey.responses
  );
  const dataToDisplay = allEmployeeData;
  // Helper: Prepare chart data, flattening and labeling for Recharts
  function prepareChartData(data: any[]) {
    if (!data?.length) return [];
    return data.map((entry, idx) => ({
      name: entry.userName || `User ${entry.userId || idx + 1}`,
      ...entry,
    }));
  }
  const chartData = prepareChartData(dataToDisplay || []);

  const handleLogout = () => {
    dispatch(setRole(undefined));
    window.location.href = "/";
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
        {/* All Survey Data Table */}
        <Typography variant="h5" fontWeight={800} color="#159957" mb={1} mt={4}>
          All Employee Responses
        </Typography>
        {dataToDisplay?.length ? (
          <Grid container spacing={2}>
            {dataToDisplay.map((entry: any, index: number) => (
              <Grid item xs={12} md={6} key={index}>
                <Paper
                  sx={{
                    mb: 2,
                    p: 3,
                    border: "1.5px solid #70eadc33",
                    borderRadius: 4,
                    background: "#f8fefb",
                    boxShadow: "0 1px 6px #15995714",
                  }}
                >
                  <Typography>
                    <strong>User:</strong>{" "}
                    {entry.userName || `User ${entry.userId}`}
                  </Typography>
                  <Typography>
                    <strong>Sleep:</strong> {entry.sleepHours} hrs
                  </Typography>
                  <Typography>
                    <strong>Energy:</strong> {entry.energyLevel}/5
                  </Typography>
                  <Typography>
                    <strong>Stress:</strong> {entry.stressLevel ?? entry.stress}
                    /5
                  </Typography>
                  <Typography>
                    <strong>Hydration:</strong> {entry.hydrationLevel ?? "–"}/5
                  </Typography>
                  <Typography>
                    <strong>Nutrition:</strong> {entry.nutritionQuality ?? "–"}
                    /5
                  </Typography>
                  <Typography>
                    <strong>Physical Activity:</strong> {entry.physicalActivity}{" "}
                    mins
                  </Typography>
                  <Typography>
                    <strong>Mood:</strong> {entry.mood ?? "–"}/5
                  </Typography>
                  <Typography>
                    <strong>Focus:</strong> {entry.focusLevel}
                  </Typography>
                  <Typography>
                    <strong>Social Support:</strong> {entry.socialSupport}
                  </Typography>
                  <Typography>
                    <strong>Meetings Attended:</strong> {entry.meetingsCount}
                  </Typography>
                  <Typography>
                    <strong>Notes:</strong> {entry.notes ?? entry.comments}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography>No data available.</Typography>
        )}
      </Paper>
    </Box>
  );
};

export default AdminDashboard;
