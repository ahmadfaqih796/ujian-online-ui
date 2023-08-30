import React from "react";
import FeatherIcon from "feather-icons-react";
import { Box, Fab, TextField } from "@mui/material";
const ChatInput = ({ handleSend, message, setMessage }) => {
  return (
    <form onSubmit={handleSend}>
      <Box sx={{ display: "flex", justifyContent: "space-between", p: 2 }}>
        <TextField
          id="outlined-basic-email"
          label="Type Something"
          fullWidth
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Box
          sx={{
            width: "80px",
            textAlign: "right",
          }}
        >
          <Fab color="primary" aria-label="add" type="submit">
            <FeatherIcon icon="send" />
          </Fab>
        </Box>
      </Box>
    </form>
  );
};

export default ChatInput;
