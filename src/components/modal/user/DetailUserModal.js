import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";
import Transition from "../../transition";
const upTransition = Transition("up");

const DetailUserModal = ({ open = false, closeModalHandler, type, data }) => {
  const { name } = data;
  return (
    <>
      <Dialog
        open={open && type === "detail"}
        TransitionComponent={upTransition}
        onClose={closeModalHandler}
        fullWidth
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title" variant="h4">
          Detail User {name}
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
      </Dialog>
    </>
  );
};

export default DetailUserModal;
