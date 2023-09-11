import { Box } from "@mui/material";
import React from "react";

const ChatBlankLayout = () => {
  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 220px)",
        maxHeight: "calc(100vh - 220px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      Selamat datang di fitur chat kami ^_^
    </Box>
  );
};

export default ChatBlankLayout;
