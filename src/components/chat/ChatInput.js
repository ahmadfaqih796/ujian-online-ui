import useUploadFile from "@/hooks/upload/useUploadFile";
import useHandleModal from "@/hooks/useHandleModal";
import { uploadFile } from "@/lib/services/form/upload";
import { Box, Fab, TextField } from "@mui/material";
import axios from "axios";
import FeatherIcon from "feather-icons-react";
import React from "react";
import io from "socket.io-client";
import ErrorModal from "../modal/ErrorModal";

const socket = io(
  "http://localhost:3030"
  // {
  //   path: "/messages",
  // }
);

const ChatInput = ({ session, file, setFile, personal, grup }) => {
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
    setFile({
      url: preview,
      type: banner?.type,
      name: banner?.name,
      error: false,
    });
    if (errorFiles === true) {
      handleOpenModal("error");
      setMessage(errorMessage);
      handleDeleteFile();
      setFile({ error: false });
      return;
    }
  }, [errorMessage, errorFiles, preview, file.error]);

  const handleMessageSend = async (e) => {
    e.preventDefault();
    const { files } = e.target;
    const payload = {
      text: inputMessage,
      id_sender: session.id,
      ...(personal &&
        session.receiver && {
          id_receiver: session.receiver,
        }),

      ...(grup && {
        grup_name: grup,
      }),
    };
    try {
      if (banner || file.file) {
        const upload = await uploadFile(banner || file.file);
        payload.file_name = banner?.name || file?.name || null;
        payload.file_type = banner?.type || file?.type || null;
        payload.file_url = upload.id || null;
      }
      if (inputMessage.trim() !== "") {
        axios
          .post("http://localhost:3030/messages", payload)
          .then((response) => {
            setFile({});
            socket.emit("client-message", {
              ...response.data,
              name: session.name,
              photo: session.photo,
            });
          })
          .catch((error) => {
            handleOpenModal("error");
            setMessage("Gagal Mengirim pesan, harap di coba lagi");
            console.log("Error creating message:", error);
          });
        files.value = "";
        setInputMessage("");
        setFile({ error: false });
        handleDeleteFile();
      }
    } catch (error) {
      handleOpenModal("error");
      console.log(error);
      setMessage(
        error.response?.data?.message || "terjadi kesalahan pada koneksi"
      );
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
              name="files"
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
                setFile({});
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
