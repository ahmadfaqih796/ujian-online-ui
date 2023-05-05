import { useSnackbar } from "@/hooks/useSnackbar";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormLabel,
  Grid,
  IconButton,
  Snackbar,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import axios from "axios";
import FeatherIcon from "feather-icons-react";
import { useRouter } from "next/dist/client/router";
import React, { useState } from "react";
import Transition from "../../transition";
import useUploadPhoto from "@/hooks/useUploadFile";
import Image from "next/image";
import { uploadFile } from "@/lib/services/form/upload";
import ServiceAdapter from "@/lib/services";
const upTransition = Transition("up");

const AddUserModal = ({ open = false, closeModalHandler, type }) => {
  const router = useRouter();
  const { isActive, message, openSnackBar, closeSnackBar } = useSnackbar();
  const [loading, setLoading] = useState(false);

  const { handleDeletePoster, onSelectFile, preview, gambar, pesan } =
    useUploadPhoto();

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
    const { name, email, password } = target;
    const payload = {
      name: name.value,
      email: email.value,
      nip: "D12340",
      role: "guru",
      agama: "islam",
      password: password.value,
    };
    try {
      if (!gambar) {
        openSnackBar("Foto tidak boleh kosong");
        return;
      }
      if (gambar) {
        const upload = await uploadFile(gambar);
        payload.photo = upload.id;
      }
      await ServiceAdapter().post("/users", payload);
      // await axios.post("/api/users", payload);
      setLoading(false);
      openSnackBar("Berhasil menambahkan users");
      closeModalHandler();
      handleDeletePoster();
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
      // if (error.response.data.message.status === 409) {
      //   return openSnackBar("Email ini sudah digunakan");
      // }
      openSnackBar(
        error.response.data.message ||
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
            Tambah Guru
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-slide-description" component="div">
              {preview && (
                <Box
                  sx={{
                    justifyContent: "center",
                    display: "flex",
                    alignItems: "flex-start",
                  }}
                >
                  <Image
                    src={preview}
                    alt="company_logo"
                    width={180}
                    height={180}
                    style={{
                      objectFit: "contain",
                      border: "2px solid gray",
                      borderRadius: "50%",
                    }}
                  />
                  <Tooltip title="Hapus">
                    <IconButton onClick={handleDeletePoster}>
                      <FeatherIcon icon="x" />
                    </IconButton>
                  </Tooltip>
                </Box>
              )}
              {/* Gambar */}
              <TextField
                required
                focused
                margin="normal"
                type="file"
                label="Gambar"
                name="image"
                accept="image/*"
                onChange={onSelectFile}
                fullWidth
                variant="outlined"
                sx={{
                  background: "#1ba0e20d",
                  borderRadius: "6px",
                  border: "1px solid #1ba0e20d",
                }}
              />
              <Typography color="red" fontSize="small">
                {!gambar ? pesan : ""}
              </Typography>
              {/* Nama */}
              <TextField
                required
                label="Nama"
                id="name"
                name="name"
                margin="normal"
                fullWidth
                variant="outlined"
                placeholder="Masukkan nama lengkap anda"
              />
              {/* Email */}
              <TextField
                required
                label="Email"
                id="email"
                name="email"
                fullWidth
                margin="normal"
                variant="outlined"
                placeholder="Masukkan alamat Email anda"
              />
              <TextField
                required
                id="password"
                name="password"
                fullWidth
                margin="normal"
                variant="outlined"
                placeholder="password"
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
              onClick={() => {
                closeModalHandler();
                handleDeletePoster();
              }}
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

export default AddUserModal;
