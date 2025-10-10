import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import NaturePeopleIcon from "@mui/icons-material/NaturePeople";
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { setRole } from "../features/users/userSlice";
import AdminNavBar from "./AdminNavBar";

const employees = [
  { userName: "Alice Doe", userId: "E001" },
  { userName: "Bob Smith", userId: "E002" },
  { userName: "Charlie Brown", userId: "E003" },
];

const ReportPage: React.FC = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(setRole(undefined));
    window.location.href = "/";
  };

  const handleDownload = (emp: any) => {
    // TODO: Generate/download PDF for employee
    alert(`Downloading report for ${emp.userName}`);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(120deg,#e1fff4 40%,#84fab0 100%)",
        pt: 0,
        pb: 6,
      }}
    >
      <AdminNavBar onLogout={handleLogout} />
      <Paper
        sx={{
          maxWidth: 600,
          mx: "auto",
          p: 6,
          borderRadius: 7,
          mt: 6,
          boxShadow: "0 7px 24px #70eadc44",
          textAlign: "center",
        }}
      >
        <Typography variant="h4" fontWeight={900} mb={3}>
          Employee Reports
        </Typography>
        <Typography variant="h6" mb={4} color="#159957">
          Download any employee's wellness survey as a detailed report.
        </Typography>
        <List>
          {employees.map((emp) => (
            <ListItem
              sx={{
                mb: 1,
                borderRadius: 4,
                background: "#f7fdfc",
                boxShadow: "0 0px 7px #70eadc19",
              }}
              key={emp.userId}
            >
              <ListItemIcon>
                <NaturePeopleIcon sx={{ color: "#159957", fontSize: 32 }} />
              </ListItemIcon>
              <ListItemText
                primary={
                  <span style={{ fontWeight: 700, fontSize: 18 }}>
                    {emp.userName}
                  </span>
                }
                secondary={
                  <span>
                    ID: <b>{emp.userId}</b>
                  </span>
                }
              />
              <Button
                variant="outlined"
                startIcon={<FileDownloadOutlinedIcon />}
                sx={{ borderRadius: 99, fontWeight: 700, fontSize: 17 }}
                onClick={() => handleDownload(emp)}
              >
                Download
              </Button>
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default ReportPage;
