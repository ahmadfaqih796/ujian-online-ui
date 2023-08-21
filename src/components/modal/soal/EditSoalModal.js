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

const EditSoalModal = ({ open = false, closeModalHandler, type, data }) => {
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

  const patch = async (event) => {
    setLoading(true);
    event.preventDefault();
    const { target } = event;
    const {
      pertanyaan,
      pilihan_a,
      pilihan_b,
      pilihan_c,
      pilihan_d,
      pilihan_e,
    } = target;
    const payload = {
      kode_pelajaran: router.query.id,
      kode_kelas: "1",
      semester: "2",
      pertanyaan: pertanyaan.value,
      pilihan_a: pilihan_a.value,
      pilihan_b: pilihan_b.value,
      pilihan_c: pilihan_c.value,
      pilihan_d: pilihan_d.value,
      pilihan_e: pilihan_e.value,
      kunci: "pilihan_b",
    };
    try {
      await axios.patch(`/api/soal/${data?.id_soal}`, payload);
      openSnackBar("Berhasil memperbarui soal");
      setLoading(false);
      closeModalHandler();
      router.replace({
        pathname: `/admin/konfigurasi/soal/${router.query.id}`,
      });
      // router.reload();
    } catch (error) {
      console.log("error", error.response);
      setLoading(false);
      closeModalHandler();
      openSnackBar(
        error?.response?.data?.message ||
          "Gagal memperbarui, silahkan coba kembali nanti"
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
        open={open && type === "edit"}
        TransitionComponent={upTransition}
        onClose={closeModalHandler}
        fullWidth
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <form onSubmit={patch}>
          <DialogTitle id="alert-dialog-title" variant="h4">
            Perbarui Soal
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-slide-description" component="div">
              <TextField
                required
                label="Pertanyaan"
                id="pertanyaan"
                name="pertanyaan"
                fullWidth
                defaultValue={data?.pertanyaan}
                margin="normal"
                variant="outlined"
                placeholder="Masukkan nama pertanyaan"
              />
              <TextField
                required
                label="Pilihan A"
                id="pilihan_a"
                name="pilihan_a"
                fullWidth
                defaultValue={data?.pilihan_a}
                margin="normal"
                variant="outlined"
                placeholder="Masukkan nama pilihan_a"
              />
              <TextField
                required
                label="Pilihan B"
                id="pilihan_b"
                name="pilihan_b"
                defaultValue={data?.pilihan_b}
                fullWidth
                margin="normal"
                variant="outlined"
                placeholder="Masukkan nama pilihan_b"
              />
              <TextField
                label="Pilihan C"
                id="pilihan_c"
                name="pilihan_c"
                defaultValue={data?.pilihan_c}
                fullWidth
                margin="normal"
                variant="outlined"
                placeholder="Masukkan nama pilihan_c"
              />
              <TextField
                label="Pilihan D"
                id="pilihan_d"
                name="pilihan_d"
                defaultValue={data?.pilihan_d}
                fullWidth
                margin="normal"
                variant="outlined"
                placeholder="Masukkan nama pilihan_d"
              />
              <TextField
                label="Pilihan E"
                id="pilihan_e"
                name="pilihan_e"
                defaultValue={data?.pilihan_e}
                fullWidth
                margin="normal"
                variant="outlined"
                placeholder="Masukkan nama pilihan_e"
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
              {loading ? "Submitting..." : "Simpan"}
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

export default EditSoalModal;
