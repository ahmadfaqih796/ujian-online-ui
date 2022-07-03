import { useSnackbar } from "@/hooks/useSnackbar";
import {
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
  console.log("zzzz", preview);

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
      nik: "D12340",
      role: "siswa",
      agama: "konghuxu",
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
      return;
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
              {preview && (
                <Grid container sx={{ mt: 2 }}>
                  <Grid item>
                    <Image
                      src={preview}
                      alt="company_logo"
                      width={200}
                      height={200}
                    />
                  </Grid>
                  <Grid item>
                    <Tooltip title="Hapus">
                      <IconButton onClick={handleDeletePoster}>
                        <FeatherIcon icon="x" />
                      </IconButton>
                    </Tooltip>
                  </Grid>
                </Grid>
              )}
              <FormLabel
                htmlFor="image"
                sx={{ color: "#1BA0E2", fontWeight: "700", mt: "3vh" }}
              >
                Upload gambar
              </FormLabel>
              <TextField
                required
                type="file"
                name="image"
                accept="image/*"
                onChange={onSelectFile}
                fullWidth
                size="small"
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
