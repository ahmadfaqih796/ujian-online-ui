import {
  Button,
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

const Siswa = ({ users }) => {
  const [userData, setUserData] = React.useState();
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
        <Table
          aria-label="simple table"
          sx={{
            whiteSpace: "nowrap",
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography align="center" variant="h5">
                  No
                </Typography>
              </TableCell>
              <TableCell>
                <Typography align="center" variant="h5">
                  Nama
                </Typography>
              </TableCell>

              <TableCell>
                <Typography align="center" variant="h5">
                  NIK
                </Typography>
              </TableCell>

              <TableCell>
                <Typography align="center" variant="h5">
                  Tanggal Di Buat
                </Typography>
              </TableCell>

              <TableCell>
                <Typography align="center" variant="h5">
                  Tanggal Di Update
                </Typography>
              </TableCell>

              <TableCell>
                <Typography align="center" variant="h5">
                  Action
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {users.data.map((data, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Typography
                    variant="h6"
                    fontWeight="600"
                    textAlign="center"
                    color="textSecondary"
                  >
                    {console.log("aaaa", typeof rowsPerPage)}
                    {index + 1 + ((page - 1) * rowsPerPage, page * rowsPerPage)}
                  </Typography>
                </TableCell>

                {/* data name */}
                <TableCell>
                  <Typography
                    variant="h6"
                    fontWeight="600"
                    textAlign="center"
                    color="textSecondary"
                  >
                    {data.name}
                  </Typography>
                </TableCell>

                <TableCell>
                  <Typography
                    variant="h6"
                    fontWeight="600"
                    textAlign="center"
                    color="textSecondary"
                  >
                    {data.email}
                  </Typography>
                </TableCell>

                <TableCell>
                  <Typography
                    variant="h6"
                    fontWeight="600"
                    textAlign="center"
                    color="textSecondary"
                  >
                    {data.nik}
                  </Typography>
                </TableCell>

                {/* data created at */}
                <TableCell>
                  <Typography
                    variant="h6"
                    fontWeight="600"
                    textAlign="center"
                    color="textSecondary"
                  >
                    {data.createdAt
                      ? moment(data.createdAt).format("DD MMM YYYY, HH:mm:ss")
                      : "-"}
                  </Typography>
                </TableCell>

                {/* data update_at */}
                {/* <TableCell>
                  <Typography
                    variant="h6"
                    fontWeight="600"
                    textAlign="center"
                    color="textSecondary"
                  >
                    {data.updatedAt
                      ? moment(data.updatedAt).format("DD MMM YYYY, HH:mm:ss")
                      : "-"}
                  </Typography>
                </TableCell> */}

                <TableCell align="center">
                  <ThreeDotsMenu
                    // data={user}
                    // token={data}
                    onClickDetail={() => {
                      console.log("ssssss");
                    }}
                    onClickEdit={() => console.log("aaaaaa")}
                    onClickDelete={() => {
                      setUserData(data);
                      handleOpenModal("delete");
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
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
Siswa.layout = "Admin";
export default Siswa;
