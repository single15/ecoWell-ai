import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
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

const EmployeeDashboard: React.FC = () => {
  const user = useSelector((state: RootState) => state.user);
  const allEmployeeData = useSelector((state: RootState) => state.survey.responses);
  const employeeData = allEmployeeData?.filter(
    (entry: any) => entry.userId === user.id
  );
  const dataToDisplay = employeeData;
  // Helper: Prepare chart data, flattening and labeling for Recharts
  function prepareChartData(data: any[]) {
    if (!data?.length) return [];
    return data.map((entry, idx) => ({
      name: `Day ${idx + 1}`,
      ...entry,
    }));
  }
  const chartData = prepareChartData(dataToDisplay || []);
  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        My Wellness Dashboard
      </Typography>
      {/* Stats Cards */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="subtitle1">Avg Sleep</Typography>
              <Typography variant="h6">
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
          <Card>
            <CardContent>
              <Typography variant="subtitle1">Avg Energy Level</Typography>
              <Typography variant="h6">
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
          <Card>
            <CardContent>
              <Typography variant="subtitle1">Avg Focus Level</Typography>
              <Typography variant="h6">
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
          <Card>
            <CardContent>
              <Typography variant="subtitle1">Total Activities</Typography>
              <Typography variant="h6">
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
      <Grid container spacing={4} sx={{ mb: 3 }}>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" mb={2}>
            Sleep Hours Trend
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
                stroke="#8884d8"
                name="Sleep Hours"
              />
            </LineChart>
          </ResponsiveContainer>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" mb={2}>
            Energy Levels
          </Typography>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="energyLevel" fill="#82ca9d" name="Energy Level" />
            </BarChart>
          </ResponsiveContainer>
        </Grid>
      </Grid>
      {/* Survey Data Table */}
      {dataToDisplay?.length ? (
        dataToDisplay.map((entry: any, index: number) => (
          <Box
            key={index}
            sx={{ mb: 2, p: 2, border: "1px solid #ccc", borderRadius: 2 }}
          >
            <Typography>
              <strong>Sleep:</strong> {entry.sleepHours} hrs
            </Typography>
            <Typography>
              <strong>Energy:</strong> {entry.energyLevel}/5
            </Typography>
            <Typography>
              <strong>Stress:</strong> {entry.stressLevel ?? entry.stress}/5
            </Typography>
            <Typography>
              <strong>Hydration:</strong> {entry.hydrationLevel ?? "–"}/5
            </Typography>
            <Typography>
              <strong>Nutrition:</strong> {entry.nutritionQuality ?? "–"}/5
            </Typography>
            <Typography>
              <strong>Physical Activity:</strong> {entry.physicalActivity} mins
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
          </Box>
        ))
      ) : (
        <Typography>No data available.</Typography>
      )}
    </Box>
  );
};

export default EmployeeDashboard;
