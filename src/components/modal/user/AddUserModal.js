import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Snackbar,
} from "@mui/material";
import { useRouter } from "next/dist/client/router";
import React, { useState } from "react";
import { useSnackbar } from "../../../hooks/useSnackbar";
import axios from "axios";
import FeatherIcon from "feather-icons-react";
import Transition from "../../transition";
import CustomFormLabel from "../../forms/custom-elements/CustomFormLabel";
import CustomTextField from "../../forms/custom-elements/CustomTextField";
import BaseService from "../../../services/base";
import APP_CONFIG from "../../../../app.config";
const upTransition = Transition("up");

const AddUserModal = ({ open = false, closeModalHandler, type }) => {
  const router = useRouter();
  const { isActive, message, openSnackBar, closeSnackBar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const service = new BaseService("users");

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
      const { name, level } = target;

      const data = {
        //company_id: APP_CONFIG.companyID,
        name: name.value,
        level: level.value,
      };
      await axios.post("/api/joblevels", data);
      setLoading(false);
      openSnackBar("Berhasil Menambahkan Job Level");
      closeModalHandler();
      router.replace(router.pathname);
      return;
    } catch (error) {
      console.log(error);
      setLoading(false);
      openSnackBar("Gagal Menambahkan Job Level");
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
            Tambah Jabatan
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-slide-description" component="div">
              <CustomFormLabel htmlFor="nama">Nama Jabatan</CustomFormLabel>
              <CustomTextField
                required
                id="name"
                name="name"
                fullWidth
                size="small"
                variant="outlined"
                placeholder="STAFF"
              />

              <CustomFormLabel htmlFor="level">level Jabatan</CustomFormLabel>
              <CustomTextField
                required
                id="level"
                name="level"
                fullWidth
                size="small"
                variant="outlined"
                placeholder="100"
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
