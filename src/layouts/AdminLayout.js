import { Box } from "@mui/material";
import React from "react";

const AdminLayout = ({ children }) => {
  return (
    <>
      <p>ini adalah admin</p>
      <Box sx={{ color: "red" }}>{children}</Box>
    </>
  );
};

export default AdminLayout;
