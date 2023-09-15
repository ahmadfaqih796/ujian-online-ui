import { Box } from "@mui/material";

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
