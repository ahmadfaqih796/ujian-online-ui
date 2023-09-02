import { Box, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import fileImg from "../../../assets/images/file.svg";

const ChatFileDisplay = ({ file }) => {
  const { url, type, name } = file;
  const parts = type?.split("/");
  console.log("mmmmmm", file);
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
      {parts[0] === "image" ? (
        <Image
          src={url}
          alt="gambar"
          priority={true}
          width={0}
          height={0}
          style={{ width: "95%", height: "380px", objectFit: "contain" }}
        />
      ) : (
        <Box>
          <Image
            src={fileImg}
            alt="gambar"
            priority={true}
            width={0}
            height={0}
            style={{
              width: "100%",
              height: "200px",
              objectFit: "contain",
              marginBottom: "20px",
            }}
          />
          <Typography textAlign="center">{name}</Typography>
        </Box>
      )}
    </Box>
  );
};

export default ChatFileDisplay;
