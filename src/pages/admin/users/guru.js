import {
  Avatar,
  Button,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import pagination from "@/lib/services/pagination/pagination";
import WithAuth from "@/lib/sessions/withAuth";
import React from "react";
import moment from "moment";
import usePagination from "@/hooks/usePagination";
import useHandleModal from "@/hooks/useHandleModal";
import AddUserModal from "@/components/modal/user/AddUserModal";
import DeleteModal from "@/components/modal/DeleteModal";
import ThreeDotsMenu from "@/components/menu-items/ThreeDotsMenu";
import DetailUserModal from "@/components/modal/user/DetailUserModal";
import Grid from "@mui/material/Grid";
import { stringAvatar } from "@/layouts/header/stringAvatar";

export const getServerSideProps = WithAuth(async ({ query, req }) => {
  const users = await pagination(
    "/users",
    {
      ...query,
    },
    {
      Authorization: req.session.user.token,
    }
  );
  return {
    props: {
      users,
    },
  };
});

const Guru = ({ users }) => {
  const [userData, setUserData] = React.useState({});
  const { openModal, modalType, handleCloseModal, handleOpenModal } =
    useHandleModal(false);
  const { page, rowsPerPage, handleChangePage, handleChangeRowsPerPage } =
    usePagination();

  return (
    <>
      <AddUserModal
        open={openModal}
        type={modalType}
        closeModalHandler={handleCloseModal}
      />
      <DetailUserModal
        open={openModal}
        type={modalType}
        data={userData}
        closeModalHandler={handleCloseModal}
      />
      <DeleteModal
        open={openModal}
        type={modalType}
        data={userData}
        closeModalHandler={handleCloseModal}
      />
      <Box display="flex">
        <Button
          color="primary"
          variant="contained"
          onClick={() => handleOpenModal("add")}
        >
          Tambahkan
        </Button>
      </Box>
      <Box
        sx={{
          overflow: "auto",
          sm: "unset",
        }}
      >
        <Grid container spacing={5}>
          {users.data.map((data, index) => (
            <Grid key={index} item xs={4}>
              <Card
                sx={{
                  textAlign: "center",
                }}
              >
                <Box
                  margin={2}
                  sx={{ justifyContent: "center", display: "flex" }}
                >
                  <Avatar {...stringAvatar(data.name)} />
                </Box>
                <Typography>{data.name}</Typography>
                <Typography>{data.email}</Typography>
                <Typography>{data.role ?? "-"}</Typography>
                <Grid container spacing={2} padding={2}>
                  <Grid item xs={4}>
                    <Button fullWidth>Detail</Button>
                  </Grid>
                  <Grid item xs={4}>
                    <Button fullWidth>Ubah</Button>
                  </Grid>
                  <Grid item xs={4}>
                    <Button fullWidth>Hapus</Button>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          ))}
          {/* <Grid item xs={8}>
            <Box>xs=8</Box>
          </Grid>
          <Grid item xs={4}>
            <Box>xs=4</Box>
          </Grid>
          <Grid item xs={4}>
            <Box>xs=4</Box>
          </Grid>
          <Grid item xs={8}>
            <Box>xs=8</Box>
          </Grid> */}
          {/* {users.data.map((data, index) => (
            <Card key={index} sx={{ width: "200px" }}>
              aaaa
            </Card>
          ))} */}
        </Grid>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={users.total}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelDisplayedRows={({ from, to, count }) => {
            return `Menampilkan ${from}-${to} dari ${
              count != -1 ? count : `more than ${to}`
            } data`;
          }}
          showFirstButton
          showLastButton
        />
      </Box>
    </>
  );
};
Guru.layout = "Admin";
export default Guru;
