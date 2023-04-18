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
} from "@mui/material";
import axios from "axios";
import FeatherIcon from "feather-icons-react";
import { useRouter } from "next/dist/client/router";
import React, { useState } from "react";
import Transition from "../../transition";
const upTransition = Transition("up");

const AddUserModal = ({ open = false, closeModalHandler, type }) => {
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
    try {
      const { target } = event;
      const { name, email, password } = target;

      const data = {
        name: name.value,
        email: email.value,
        nik: "0",
        password: password.value,
      };
      await axios.post("/api/users", data);
      setLoading(false);
      openSnackBar("Berhasil Menambahkan Users");
      closeModalHandler();
      router.replace({
        pathname: router.pathname,
        query: {
          ...router.query,
        },
      });
      return;
    } catch (error) {
      console.log(error.response);
      setLoading(false);
      // if (error.response.data.message.status === 409) {
      //   return openSnackBar("Email ini sudah digunakan");
      // }
      openSnackBar("Gagal Menambahkan User");
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
        open={open && type === "add"}
        TransitionComponent={upTransition}
        onClose={closeModalHandler}
        fullWidth
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <form onSubmit={create}>
          <DialogTitle id="alert-dialog-title" variant="h4">
            Tambah Siswa
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-slide-description" component="div">
              <FormLabel htmlFor="nama">Nama</FormLabel>
              <TextField
                required
                id="name"
                name="name"
                fullWidth
                size="small"
                variant="outlined"
                placeholder="nama"
              />
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField
                required
                id="email"
                name="email"
                fullWidth
                size="small"
                variant="outlined"
                placeholder="email"
              />
              <FormLabel htmlFor="password">Password</FormLabel>
              <TextField
                required
                id="password"
                name="password"
                fullWidth
                size="small"
                variant="outlined"
                placeholder="password"
              />
            </DialogContentText>
          </DialogContent>

          <DialogActions>
            <Button
              color="primary"
              variant="contained"
              disabled={loading}
              type="submit"
            >
              {loading ? "Submitting..." : "Tambah"}
            </Button>
            <Button onClick={closeModalHandler} color="secondary">
              Batal
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default AddUserModal;
