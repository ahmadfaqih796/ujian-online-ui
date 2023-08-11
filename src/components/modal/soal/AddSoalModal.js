import { useSnackbar } from "@/hooks/useSnackbar";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Snackbar,
  TextField,
} from "@mui/material";
import axios from "axios";
import FeatherIcon from "feather-icons-react";
import { useRouter } from "next/dist/client/router";
import React, { useState } from "react";
import Transition from "../../transition";
const upTransition = Transition("up");

const AddSoalModal = ({ open = false, closeModalHandler, type }) => {
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

  const create = async (event) => {
    setLoading(true);
    event.preventDefault();
    const { target } = event;
    const { pelajaran } = target;
    const payload = {
      nama_pelajaran: pelajaran.value,
    };
    try {
      await axios.post("/api/soal", payload);
      setLoading(false);
      openSnackBar("Berhasil menambahkan soal");
      closeModalHandler();
      event.target.reset();
      router.replace({
        pathname: router.pathname,
        query: {
          ...router.query,
        },
      });
    } catch (error) {
      console.log(error.response);
      setLoading(false);
      openSnackBar(
        error?.response?.data?.message ||
          "Gagal menambahkan, silahkan coba kembali nanti"
      );
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
        open={open && type === "add"}
        TransitionComponent={upTransition}
        onClose={closeModalHandler}
        fullWidth
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <form onSubmit={create}>
          <DialogTitle id="alert-dialog-title" variant="h4">
            Tambah Soal
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-slide-description" component="div">
              <TextField
                required
                label="Pelajaran"
                id="pelajaran"
                name="pelajaran"
                fullWidth
                margin="normal"
                variant="outlined"
                placeholder="Masukkan nama pelajaran"
              />
              <TextField
                required
                label="Pelajaran"
                id="pelajaran"
                name="pelajaran"
                fullWidth
                margin="normal"
                variant="outlined"
                placeholder="Masukkan nama pelajaran"
              />
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
              {loading ? "Submitting..." : "Tambah"}
            </Button>
            <Button
              sx={{ width: "100px" }}
              onClick={() => closeModalHandler}
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

export default AddSoalModal;
