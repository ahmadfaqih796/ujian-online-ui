import React from "react";
import FeatherIcon from "feather-icons-react";
import { Box, Fab, TextField } from "@mui/material";
import useUploadFile from "@/hooks/upload/useUploadFile";
const ChatInput = ({ handleSend, message, setMessage }) => {
  const { handleDeletePoster, onSelectFile, banner, errorFiles, errorMessage } =
    useUploadFile();

  console.log("abbbbbbbb", banner);
  return (
    <form onSubmit={handleSend}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 2,
        }}
      >
        <Box
          sx={{
            width: "80px",
          }}
        >
          <label htmlFor="file-upload">
            <Fab
              size="medium"
              color="primary"
              aria-label="upload"
              component="span"
            >
              <FeatherIcon icon="upload" />
            </Fab>
          </label>
          <TextField
            id="file-upload"
            type="file"
            accept=".jpg, .jpeg, .png, .pdf"
            sx={{ display: "none" }}
            onChange={onSelectFile}
            error={errorFiles}
            helperText={errorMessage}
          />
        </Box>
        <TextField
          id="outlined-basic-email"
          label="Type Something"
          fullWidth
          sx={{ ml: 1, mr: 1 }}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Box
          sx={{
            width: "80px",
            textAlign: "right",
          }}
        >
          <Fab size="medium" color="primary" aria-label="add" type="submit">
            <FeatherIcon icon="send" />
          </Fab>
        </Box>
      </Box>
    </form>
  );
};

export default ChatInput;
