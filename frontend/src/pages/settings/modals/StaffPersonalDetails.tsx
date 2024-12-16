import React, { useState, useEffect } from "react";
import {
  Box,
  Avatar,
  Stack,
  Typography,
  IconButton,
  TextField,
  Divider,
  Button,
} from "@mui/material";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import MenuItem from "@mui/material/MenuItem";

import SystemLogs from "./SystemLogs";

interface EmployeeProfile {
  user_id: number;
  name: string;
  role: string;
  image: string;
  email: string;
  phone: string;
  pin: string;
  isApproved: boolean;
}

// Define props for the component based on EmployeeProfile
interface StaffPersonalDetailsProps {
  employee: EmployeeProfile;  // Pass the entire EmployeeProfile object as a prop
  onClose: () => void;        // Function to handle closing
}

const position = [
  {
    value: "branch-clerk",
    label: "Branch Clerk",
  },
  {
    value: "staff",
    label: "Staff",
  },
];

const accountStatus = [
  {
    value: "active",
    label: "Active",
  },
  {
    value: "inactive",
    label: "Inactive",
  },
  {
    value: "pending",
    label: "Pending",
  },
];

const StaffPersonalDetails: React.FC<StaffPersonalDetailsProps> = ({
  employee,   // Receive the employee object
  onClose,
}) => {
  // Track profile status with state
  const [profileStatus, setProfileStatus] = useState<string>(employee.isApproved ? "Active" : "Pending");

  // Set branch position based on employee role
  const [branchPosition, setBranchPosition] = useState<string>("");

  useEffect(() => {
    setProfileStatus(employee.isApproved ? "Active" : "Pending");
    setBranchPosition(employee.role === "branch-clerk" ? "Branch Clerk" : "Staff");
  }, [employee]);

  const lastName = employee.name.split(" ").pop();
  const roleValue = employee.role === "branch-clerk" ? "Branch Clerk" : "Staff"; // Determine the role value

  return (
    <Box className="p-6">
      <Stack spacing={4}>
        {/* Header */}
        <Stack direction="row" alignItems={"center"}>
          <Typography
            variant="subtitle1"
            fontWeight={"bold"}
            sx={{ color: "#0F2043" }}
          >
            {lastName}'s Personal Details
          </Typography>
          <Box flexGrow={1} />
          <IconButton onClick={onClose}>
            <CancelOutlinedIcon className="text-[#517FD3]" />
          </IconButton>
        </Stack>

        {/* Staff Details */}
        <Avatar src={employee.image} alt={employee.name} sx={{ width: 96, height: 96 }} />

        {/* Profile Details */}
        <Stack spacing={2.5}>
          <TextField
            label="Full Name"
            value={employee.name}
            disabled
            size="small"
            sx={{
              width: "100%",
              "& .MuiOutlinedInput-root": {
                borderRadius: "0.5rem",
                fontSize: "0.9rem",
                color: "#2E49D5",
                paddingX: "0.5rem",
                "& input": {
                  color: "#2E49D5",
                  paddingX: "0.5rem ",
                },
                "& fieldset": {
                  borderColor: "#868FA0",
                },
              },
              "& .MuiInputLabel-root": {
                color: "#868FA0",
                fontSize: "0.9rem",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#2E49D5",
              },
            }}
          />

          {/* Personal Email */}
          <TextField
            label="Personal Email"
            value={employee.email}
            disabled
            size="small"
            sx={{
              width: "100%",
              "& .MuiOutlinedInput-root": {
                borderRadius: "0.5rem",
                fontSize: "0.9rem",
                color: "#2E49D5",
                paddingX: "0.5rem",
                "& input": {
                  color: "#2E49D5",
                  paddingX: "0.5rem ",
                },
                "& fieldset": {
                  borderColor: "#868FA0",
                },
              },
              "& .MuiInputLabel-root": {
                color: "#868FA0",
                fontSize: "0.9rem",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#2E49D5",
              },
            }}
          />

          {/* Phone Number */}
          <TextField
            label="Phone Number"
            value={employee.phone}
            disabled
            size="small"
            sx={{
              width: "100%",
              "& .MuiOutlinedInput-root": {
                borderRadius: "0.5rem",
                fontSize: "0.9rem",
                color: "#2E49D5",
                paddingX: "0.5rem",
                "& input": {
                  color: "#2E49D5",
                  paddingX: "0.5rem ",
                },
                "& fieldset": {
                  borderColor: "#868FA0",
                },
              },
              "& .MuiInputLabel-root": {
                color: "#868FA0",
                fontSize: "0.9rem",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#2E49D5",
              },
            }}
          />
        </Stack>

        <Divider />
       

        <Stack spacing={1}>
          <Typography variant="subtitle1">{lastName}'s System Logs</Typography>
          <SystemLogs showHeader={false} />
        </Stack>
      </Stack>
    </Box>
  );
};

export default StaffPersonalDetails;
