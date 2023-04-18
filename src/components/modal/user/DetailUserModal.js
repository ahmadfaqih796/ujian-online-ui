import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import FeatherIcon from "feather-icons-react";
import { useRouter } from "next/router";
import React from "react";
import Transition from "../transition";
const upTransition = Transition("up");

const DetailUserModal = ({
  open = false,
  closeModalHandler,
  type,
  data,
  title,
  api,
}) => {
  const router = useRouter();

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

  return (
    <>
      <Dialog
        open={open && type === "delete"}
        TransitionComponent={upTransition}
        onClose={closeModalHandler}
        fullWidth
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <form onSubmit={remove}>
          <DialogTitle id="alert-dialog-slide-title" variant="h4">
            Detail User
          </DialogTitle>
          <DialogContent>
            <DialogContentText
              id="alert-dialog-slide-description"
              component="div"
            >
              <Typography variant="body1">
                Apakah anda ingin menghapus User
              </Typography>
            </DialogContentText>
          </DialogContent>

          <DialogActions>
            <Button onClick={closeModalHandler} color="secondary">
              Kembali
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default DetailUserModal;
