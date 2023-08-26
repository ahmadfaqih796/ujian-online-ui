import { Box, CircularProgress, Typography } from "@mui/material";
import React from "react";

const LoadingSpinner = ({ show }) => {
  return (
    <>
      {show && (
        <Box
          position="fixed"
          top={0}
          width="100%"
          height="100vh"
          sx={{
            background: "rgba(0,0,0,.1)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            width="100%"
            height="100%"
            maxWidth="250px"
            maxHeight="200px"
            display="flex"
            sx={{
              backgroundColor: "#fff",
              borderRadius: "10px",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <CircularProgress />
            <Typography mt={2} color="black" fontWeight={600}>
              Sedang mengload data...
            </Typography>
          </Box>
        </Box>
      )}
    </>
  );
};

export default LoadingSpinner;
