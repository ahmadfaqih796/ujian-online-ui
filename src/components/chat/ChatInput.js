import React from "react";
import FeatherIcon from "feather-icons-react";
import { Box, Button, Fab, TextField } from "@mui/material";
import useUploadFile from "@/hooks/upload/useUploadFile";
import axios from "axios";
import io from "socket.io-client";
import ErrorModal from "../modal/ErrorModal";
import useHandleModal from "@/hooks/useHandleModal";

const socket = io("http://localhost:3030", {
  path: "/messages",
});

const ChatInput = ({ session, setFile }) => {
  const { openModal, modalType, handleCloseModal, handleOpenModal } =
    useHandleModal(false);
  const [inputMessage, setInputMessage] = React.useState("");
  const [message, setMessage] = React.useState("");
  const {
    handleDeleteFile,
    onSelectFile,
    banner,
    preview,
    errorFiles,
    errorMessage,
  } = useUploadFile();

  React.useEffect(() => {
    setFile({ url: preview, type: banner?.type, ...banner });
    if (errorFiles === true) {
      handleOpenModal("error");
      setMessage(errorMessage);
      handleDeleteFile();
    }
  }, [errorMessage, errorFiles, preview]);
  console.log(banner);

  const handleMessageSend = (e) => {
    e.preventDefault();
    const payload = {
      text: inputMessage,
      id_user: session.id,
    };
    try {
      if (inputMessage.trim() !== "") {
        const res = axios
          .post("http://localhost:3030/messages", payload)
          .then((response) => {
            console.log("berhasil nambah", response);
            socket.emit("client-message", {
              ...response.data,
              name: session.name,
              photo: session.photo,
            });
          })
          .catch((error) => {
            handleOpenModal("error");
            setMessage("Gagal Mengirim pesan");
            console.error("Error creating message:", error);
          });
        setInputMessage("");
      }
    } catch (error) {
      handleOpenModal("error");
      setMessage("silah coba ulang lagi");
    }
  };

  return (
    <>
      <ErrorModal
        open={openModal}
        type={modalType}
        message={message}
        closeModalHandler={handleCloseModal}
      />
      <form onSubmit={handleMessageSend}>
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
              sx={{
                display: "none",
                // width: "300px",
              }}
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
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
          />
          <Box
            sx={{
              width: "130px",
              display: "flex",
              justifyContent: "space-between",
              textAlign: "right",
            }}
          >
            <Fab
              size="medium"
              color="error"
              aria-label="add"
              type="reset"
              onClick={() => {
                handleDeleteFile();
                setInputMessage("");
              }}
            >
              <FeatherIcon icon="trash-2" />
            </Fab>
            <Fab size="medium" color="primary" aria-label="add" type="submit">
              <FeatherIcon icon="send" />
            </Fab>
          </Box>
        </Box>
      </form>
    </>
  );
};

export default ChatInput;
