import {
  CustomButtonBlue,
  CustomButtonRed,
  CustomButtonYellow,
} from "@/components/custom/customButton";
import DeleteModal from "@/components/modal/DeleteModal";
import AddUserModal from "@/components/modal/user/AddUserModal";
import DetailUserModal from "@/components/modal/user/DetailUserModal";
import useHandleModal from "@/hooks/useHandleModal";
import usePagination from "@/hooks/usePagination";
import { stringAvatar } from "@/layouts/header/stringAvatar";
import pagination from "@/lib/services/pagination/pagination";
import WithAuth from "@/lib/sessions/withAuth";
import {
  Avatar,
  Button,
  Card,
  TablePagination,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { Box } from "@mui/system";
import React from "react";

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
                  <Avatar {...stringAvatar(data.name, 80)} />
                </Box>
                <Typography>{data.name}</Typography>
                <Typography>{data.email}</Typography>
                <Typography>{data.role ?? "-"}</Typography>
                <Grid container spacing={2} padding={2}>
                  <Grid item xs={4}>
                    <CustomButtonBlue fullWidth>Detail</CustomButtonBlue>
                  </Grid>
                  <Grid item xs={4}>
                    <CustomButtonYellow fullWidth>Ubah</CustomButtonYellow>
                  </Grid>
                  <Grid item xs={4}>
                    <CustomButtonRed
                      fullWidth
                      onClick={() => handleOpenModal("delete")}
                    >
                      Hapus
                    </CustomButtonRed>
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
