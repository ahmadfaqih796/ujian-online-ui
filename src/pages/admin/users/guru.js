import {
  CustomButtonBlue,
  CustomButtonRed,
  CustomButtonYellow,
} from "@/components/custom/customButton";
import FeatherIcon from "feather-icons-react";
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
import noDataImg from "../../../../assets/images/no-data.jpg";
import Image from "next/image";
import SearchUser from "@/components/search/SearchUser";

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
      "$sort[createdAt]": -1,
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
      <Box display={"flex"} alignItems={"center"} flexWrap={"wrap"} mb={2}>
        <Typography className="title-mobile" fontSize={24} fontWeight={700}>
          Guru Management
        </Typography>
        <Box flexGrow={1} />
        <Box component={"div"} className="search-user">
          <SearchUser />
          <Button
            sx={{ ml: "20px" }}
            color="primary"
            variant="contained"
            onClick={() => handleOpenModal("add")}
          >
            <FeatherIcon icon="user-plus" /> Siswa
          </Button>
        </Box>
      </Box>

      {users && users.data.length === 0 ? (
        <Image
          className="image-no-data"
          src={noDataImg}
          alt="data kosong"
          priority={true}
        />
      ) : (
        <Box
          sx={{
            overflow: "auto",
            sm: "unset",
          }}
        >
          <Box
            display={"flex"}
            justifyContent={"space-around"}
            flexWrap={"wrap"}
          >
            {users.data.map((data, index) => (
              <Card key={index} className="card">
                <Box
                  margin={2}
                  sx={{ justifyContent: "center", display: "flex" }}
                >
                  <Avatar {...stringAvatar(data.name, 80)} />
                </Box>
                <Typography>{data.name}</Typography>
                <Typography>{data.email}</Typography>
                <Typography>{data.role ?? "-"}</Typography>
                <Box
                  display={"flex"}
                  flexWrap={"wrap"}
                  justifyContent={"space-around"}
                  mt={2}
                >
                  <CustomButtonBlue
                    className="button-detail"
                    onClick={() => {
                      setUserData(data);
                      handleOpenModal("detail");
                    }}
                  >
                    <FeatherIcon icon="database" /> Detail
                  </CustomButtonBlue>
                  <CustomButtonYellow sx={{ width: "80px" }}>
                    <FeatherIcon icon="edit-3" />
                    Ubah
                  </CustomButtonYellow>
                  <CustomButtonRed
                    sx={{ width: "100px" }}
                    onClick={() => {
                      setUserData(data);
                      handleOpenModal("delete");
                    }}
                  >
                    <FeatherIcon icon="trash-2" />
                    Hapus
                  </CustomButtonRed>
                </Box>
              </Card>
            ))}
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
      )}
    </>
  );
};
Guru.layout = "Admin";
export default Guru;
