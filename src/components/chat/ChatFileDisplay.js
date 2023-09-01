import { Box } from "@mui/material";
import Image from "next/image";
import React from "react";

const ChatFileDisplay = ({ file }) => {
  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 300px)",
        maxHeight: "calc(100vh - 300px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Image
        src={file.url}
        alt="company_logo"
        priority={true}
        width={0}
        height={0}
        style={{ width: "90%", height: "300px", objectFit: "contain" }} // optional
      />
    </Box>
  );
};

export default ChatFileDisplay;
