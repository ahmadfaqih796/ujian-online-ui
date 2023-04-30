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
import WithAuth from "@/lib/sessions/withAuth";
import {
  Avatar,
  Button,
  Card,
  TablePagination,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { Box } from "@mui/system";
import React from "react";
// import usePagination from "@mui/material/usePagination";
import paginationUser from "@/lib/services/pagination/paginationUser";
import { styled } from "@mui/material/styles";

const List = styled("ul")({
  listStyle: "none",
  padding: 0,
  margin: 0,
  display: "flex",
});

export const getServerSideProps = WithAuth(async ({ query, req }) => {
  const users = await paginationUser(
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
  const { page, handleChangePage, handleChangeRowsPerPage } = usePagination();

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
      <Grid container spacing={5}>
        <Grid item xs={4}>
          <TextField placeholder="cari" />
        </Grid>
      </Grid>
      <Box display={"flex"}>
        <Typography>sssssss</Typography>
        <Typography>ssssaaaas</Typography>
        <Box flexGrow={1} />
        <Button
          color="primary"
          variant="contained"
          onClick={() => handleOpenModal("add")}
        >
          Tambahkan
        </Button>
      </Box>
      <Box display="flex"></Box>
      <Box
        sx={{
          overflow: "auto",
          sm: "unset",
        }}
      >
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={5}>
            {users.data.map((data, index) => (
              <Grid key={index} item xs>
                <Card
                  sx={{
                    width: "300px",
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
                  <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2} padding={2}>
                      <Grid item xs={"auto"}>
                        <CustomButtonBlue
                          fullWidth
                          onClick={() => handleOpenModal("detail")}
                        >
                          Detail
                        </CustomButtonBlue>
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
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* <Pagination
          count={Math.ceil(users.total / 7)}
          // page={page}
          defaultPage={router.query ? router.query.page : 1}
          onChange={handleChangePage}
          color="primary"
          variant="outlined"
        /> */}

        <TablePagination
          rowsPerPageOptions={[]}
          component="div"
          count={users.total}
          rowsPerPage={6}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelDisplayedRows={({ from, to, count }) => {
            return `Menampilkan ${from}-${to} dari ${
              count != -1 ? count : `more than ${to}`
            } data`;
          }}
          // showFirstButton
          // showLastButton
        />
      </Box>
    </>
  );
};
Guru.layout = "Admin";
export default Guru;
