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
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import FeatherIcon from "feather-icons-react";
import React from "react";
// import usePagination from "@mui/material/usePagination";
import SearchUser from "@/components/search/SearchUser";
import paginationUser from "@/lib/services/pagination/paginationUser";
import Image from "next/image";
import noDataImg from "../../../../assets/images/no-data.jpg";
import ExportExcelModal from "@/components/modal/ExportExcelModal";

export const getServerSideProps = WithAuth(async ({ query, req }) => {
  const token = req.session.user.token;
  const users = await paginationUser(
    "/users",
    {
      ...query,
      "$sort[createdAt]": -1,
      role: {
        $in: ["guru"],
      },
    },
    {
      Authorization: token,
    }
  );
  return {
    props: {
      users,
      token,
    },
  };
});

const Guru = ({ users, token }) => {
  const [userData, setUserData] = React.useState({});
  const { openModal, modalType, handleCloseModal, handleOpenModal } =
    useHandleModal(false);
  const { page, handleChangePage, handleChangeRowsPerPage } = usePagination();

  return (
    <>
      <ExportExcelModal
        open={openModal}
        type={modalType}
        token={token}
        closeModalHandler={handleCloseModal}
      />
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
        name={userData?.name}
        title={"User"}
        url={`/api/users/${userData?.id_user}`}
        closeModalHandler={handleCloseModal}
      />
      <Box
        display={"flex"}
        alignItems={"center"}
        flexWrap={"wrap"}
        mb={2}
        justifyContent={"space-around"}
      >
        {/* <Typography className="title-mobile" fontSize={24} fontWeight={700}>
          Guru Management
        </Typography> */}
        <Box component={"div"} className="button-group">
          <Button
            sx={{ zIndex: "1" }}
            color="success"
            variant="contained"
            onClick={() => handleOpenModal("report")}
          >
            <FeatherIcon icon="clipboard" />
            Export
          </Button>
          <Button
            sx={{ ml: "20px", zIndex: "1" }}
            color="primary"
            variant="contained"
            onClick={() => handleOpenModal("add")}
          >
            <FeatherIcon icon="user-plus" /> Guru
          </Button>
        </Box>
        <Box flexGrow={1} />
        <SearchUser />
        {/* <Box component={"div"} className="search-user">
          <SearchUser />
        </Box> */}
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
            // display={"grid"}
            // gridTemplateColumns={"1fr 1fr 1fr"}
            // justifyItems={"stretch"}
          >
            {users.data.map((data, index) => (
              <Card key={index} className="card">
                <Box
                  margin={2}
                  sx={{ justifyContent: "center", display: "flex" }}
                >
                  {data.user_guru?.photo ? (
                    // <Avatar
                    //   src={`http://localhost:3030/uploads/${data.user_guru?.photo}`}
                    //   alt={`http://localhost:3030/uploads/${data.user_guru?.photo}`}
                    //   sizes="80"
                    // />
                    <Image
                      alt={data.name}
                      src={`http://localhost:3030/uploads/${data.user_guru?.photo}`}
                      width="80"
                      height="80"
                      priority={true}
                      style={{
                        objectFit: "contain",
                        border: "2px solid gray",
                        borderRadius: "50%",
                      }}
                    />
                  ) : (
                    <Avatar
                      {...stringAvatar(
                        data.user_guru?.nama_guru ?? "Faqih",
                        80
                      )}
                    />
                  )}
                </Box>
                <Typography>{data.name}</Typography>
                <Typography>{data.email}</Typography>
                <Typography>{data.role ?? "-"}</Typography>
                <Box
                  display={"flex"}
                  flexWrap={"wrap"}
                  justifyContent={"space-around"}
                  mt={2}
                  mb={1}
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
