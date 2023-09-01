import React from "react";

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Snackbar,
  Typography,
} from "@mui/material";
import FeatherIcon from "feather-icons-react";

import { useRouter } from "next/dist/client/router";
import Image from "next/image";
import PropTypes from "prop-types";
import Transition from "../transition";
import { useSnackbar } from "@/hooks/useSnackbar";

const upTransition = Transition("up");

const ErrorModal = ({
  open = false,
  closeModalHandler,
  title,
  message: modalMessage,
  messageImage,
  sxTitle,
  sxMessage,
  sxAction,
  type,
  link,
  sx,
  actionButtonText = "Oke",
}) => {
  const { isActive, message, openSnackBar, closeSnackBar } = useSnackbar();
  const router = useRouter();
  const action = (
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={closeSnackBar}
    >
      <FeatherIcon icon="x" />
    </IconButton>
  );

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
        open={open && type === "error"}
        TransitionComponent={upTransition}
        onClose={closeModalHandler}
        // fullWidth
      >
        <DialogTitle>
          <Typography
            variant="body1"
            sx={{
              ...sxTitle,
            }}
          >
            {title}
          </Typography>
        </DialogTitle>
        <DialogContent
          sx={{
            ...sx,
          }}
        >
          {messageImage && (
            <Box>
              <Image
                src={messageImage}
                width={300}
                height={200}
                alt="not found"
              />
            </Box>
          )}
          <Typography
            variant="body1"
            sx={{
              ...sxMessage,
            }}
          >
            {modalMessage}
          </Typography>
        </DialogContent>
        <DialogActions
          sx={{
            ...sxAction,
          }}
        >
          <Button onClick={closeModalHandler} color="error" variant="contained">
            Tutup
          </Button>
          {/* <Button
            onClick={() => {
              link ? router.push(link) : closeModalHandler;
            }}
            color="primary"
            variant="contained"
          >
            {actionButtonText}
          </Button> */}
        </DialogActions>
      </Dialog>
    </>
  );
};
ErrorModal.propTypes = {
  open: PropTypes.bool,
  title: PropTypes.string,
  message: PropTypes.string,
};
export default ErrorModal;
