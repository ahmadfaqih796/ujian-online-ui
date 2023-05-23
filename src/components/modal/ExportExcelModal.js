import useGenerateReport from "@/hooks/useGenerateReport";
import { useSnackbar } from "@/hooks/useSnackbar";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Snackbar,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import FeatherIcon from "feather-icons-react";
import moment from "moment";
import "moment/locale/id";
import { useRouter } from "next/router";
import React, { useState } from "react";
moment.locale("id");

const ExportExcelModal = ({ open = false, closeModalHandler, type }) => {
  const router = useRouter();
  const { start_date, end_date } = router.query;
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const { isActive, message, openSnackBar, closeSnackBar } = useSnackbar();
  const { generate, loading } = useGenerateReport();

  const create = async (event) => {
    event.preventDefault();

    setError(false);
    setErrorMessage("");
    await generate({
      data: {
        role: "guru",
      },
      onSuccess: () => openSnackBar("Berhasil generate report"),
      onError: (msg) => openSnackBar(msg),
    });
  };

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
    <Box>
      <Snackbar
        open={isActive}
        message={message}
        action={action}
        onClose={closeSnackBar}
        autoHideDuration={5000}
      />
      <Dialog
        open={open && type === "report"}
        onClose={closeModalHandler}
        fullWidth
      >
        <form id="generate-report" onSubmit={create}>
          <DialogTitle id="alert-dialog-title" variant="h4">
            Export Data
          </DialogTitle>
          <DialogContent>
            <Typography>
              Apakah anda ingin export data tanggal{" "}
              {moment().format("DD MMM YYYY")} ?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button
              color="primary"
              variant="contained"
              disabled={loading}
              type="submit"
            >
              {loading ? "Memproses..." : "Export"}
            </Button>
            <Button
              onClick={() => {
                closeModalHandler();
                setError(false);
                setErrorMessage("");
              }}
              color="secondary"
            >
              Batal
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};

export default ExportExcelModal;
