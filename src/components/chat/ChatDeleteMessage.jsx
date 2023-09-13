import { useSnackbar } from "@/hooks/useSnackbar";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormLabel,
  IconButton,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import FeatherIcon from "feather-icons-react";
import React, { useState } from "react";
import Transition from "../transition";
import { useRouter } from "next/router";
const upTransition = Transition("up");
import io from "socket.io-client";

const ChatDeleteMessage = ({
  open = false,
  closeModalHandler,
  type,
  data,
  title,
}) => {
  const socket = io(
    "http://localhost:3030"
    // {
    //   path: "/messages",
    // }
  );
  const router = useRouter();
  const { isActive, message, openSnackBar, closeSnackBar } = useSnackbar();
  const [loading, setLoading] = useState(false);

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={closeSnackBar}
      >
        <FeatherIcon icon="x" />
      </IconButton>
    </React.Fragment>
  );

  const remove = async (event) => {
    setLoading(true);
    event.preventDefault();
    const payload = {
      is_deleted: true,
    };
    try {
      const res = await axios.patch(`/api/messages/${data?.id}`, payload);
      console.log(res);
      socket.emit("delete-message", res.data);
      setLoading(false);
      openSnackBar(`Berhasil menghapus ${title || "data"}`);
      closeModalHandler();
      router.replace({
        pathname: router.pathname,
        query: {
          ...router.query,
        },
      });
      return;
    } catch (error) {
      console.log(error);
      setLoading(false);
      openSnackBar(`Gagal menghapus ${title || "data"}`);
      return;
    }
  };

  return (
    <>
      <Snackbar
        open={isActive}
        message={message}
        action={action}
        onClose={closeSnackBar}
        autoHideDuration={5000}
      />
      <Dialog
        open={open && type === "delete"}
        TransitionComponent={upTransition}
        onClose={closeModalHandler}
        fullWidth
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <form onSubmit={remove}>
          <DialogTitle
            id="alert-dialog-title"
            variant="h5"
            mb={2}
            fontWeight={700}
            color={"white"}
            sx={{
              backgroundColor: (theme) =>
                `${theme.palette.primary.main}!important`,
            }}
          >
            Hapus {title ?? "data"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText
              id="alert-dialog-slide-description"
              component="div"
            >
              <Typography variant="body1">
                Apakah anda ingin menghapus pesan
                <span
                  style={{
                    marginLeft: "5px",
                    fontWeight: 700,
                  }}
                >
                  {data.text}
                </span>{" "}
                ?
              </Typography>
            </DialogContentText>
          </DialogContent>

          <DialogActions
            sx={{
              margin: "0 16px 16px",
            }}
          >
            <Button
              color="primary"
              variant="contained"
              disabled={loading}
              type="submit"
              sx={{ marginRight: "16px", width: "100px" }}
            >
              {loading ? "Loading..." : "Ya"}
            </Button>
            <Button
              sx={{ width: "100px" }}
              onClick={() => closeModalHandler()}
              variant="contained"
              color="error"
            >
              Batal
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default ChatDeleteMessage;
