import ThreeDotsMenu from "@/components/menu-items/ThreeDotsMenu";
import DeleteModal from "@/components/modal/DeleteModal";
import AddLessonModal from "@/components/modal/lesson/AddLessonModal";
import AddUserModal from "@/components/modal/user/AddUserModal";
import DetailUserModal from "@/components/modal/user/DetailUserModal";
import useHandleModal from "@/hooks/useHandleModal";
import usePagination from "@/hooks/pagination/usePagination";
import pagination from "@/lib/services/pagination/pagination";
import WithAuth from "@/lib/sessions/withAuth";
import LESSON_CELLS from "@/utils/headCells/lesson-cells";
import {
  Avatar,
  Button,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import moment from "moment";
import React from "react";
import BaseTable from "@/components/table/BaseTable";
import { stringAvatar } from "@/layouts/header/stringAvatar";

export const getServerSideProps = WithAuth(async ({ query, req }) => {
  const lesson = await pagination(
    "/pelajaran",
    {
      ...query,
    },
    {
      Authorization: req.session.user.token,
    }
  );
  return {
    props: {
      lesson,
    },
  };
});

const Pelajaran = ({ lesson }) => {
  const [userData, setUserData] = React.useState({});
  const { openModal, modalType, handleCloseModal, handleOpenModal } =
    useHandleModal(false);
  const { page, rowsPerPage, handleChangePage, handleChangeRowsPerPage } =
    usePagination();

  return (
    <>
      <AddLessonModal
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
        name={userData?.nama_pelajaran}
        title={"Pelajaran"}
        url={`/api/lesson/${userData?.id_pelajaran}`}
        closeModalHandler={handleCloseModal}
      />
      <Card className="card-list">
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
                {LESSON_CELLS.map((head, index) => (
                  <TableCell
                    key={index}
                    align={head.numeric ? "right" : "left"}
                    padding={head.disablePadding ? "none" : "normal"}
                    // sortDirection={orderBy === index ? order : false}
                  >
                    {head.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {lesson.data.map((data, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Typography fontWeight="600">
                      {index +
                        1 +
                        ((page - 1) * rowsPerPage, page * rowsPerPage)}
                    </Typography>
                  </TableCell>

                  {/* data name */}
                  <TableCell>
                    <Typography fontWeight="600">
                      {data.nama_pelajaran}
                    </Typography>
                  </TableCell>

                  {/* data created at */}
                  <TableCell>
                    <Typography fontWeight="600">
                      {data.createdAt
                        ? moment(data.createdAt).format("DD MMM YYYY, HH:mm:ss")
                        : "-"}
                    </Typography>
                  </TableCell>

                  {/* data update_at */}
                  <TableCell>
                    <Typography fontWeight="600">
                      {data.updatedAt
                        ? moment(data.updatedAt).format("DD MMM YYYY, HH:mm:ss")
                        : "-"}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <ThreeDotsMenu
                      onClickDetail={() => {
                        setUserData(data);
                        handleOpenModal("detail");
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
            count={lesson.total}
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
        <BaseTable tableHead={LESSON_CELLS} data={lesson}>
          {lesson &&
            lesson.data.map((activity, index) => (
              <TableRow key={index} hover role="checkbox" tabIndex={-1}>
                {/* photo */}
                <TableCell sx={{ width: "80px" }}>
                  {activity?.user?.photo ? (
                    <UserImage path={activity?.user?.photo} />
                  ) : (
                    <Avatar
                      {...stringAvatar(activity?.user?.fullname ?? "faqih", 50)}
                    />
                  )}
                </TableCell>
                <TableCell>
                  <Typography
                    variant="h6"
                    fontWeight="600"
                    color="textSecondary"
                    sx={{ width: "100%" }}
                  >
                    {activity?.user?.fullname}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant="h6"
                    fontWeight="600"
                    color="textSecondary"
                    sx={{ width: "100%" }}
                  >
                    {activity?.upliner_data?.fullname ?? "-"}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant="h6"
                    fontWeight="600"
                    color="textSecondary"
                    sx={{ width: "100%" }}
                  >
                    {activity?.user?.job_departement?.name ?? "-"}
                  </Typography>
                </TableCell>
                {/* menghubungkan time in */}
                <TableCell>
                  {activity?.early_time_out ? (
                    <>
                      <Typography variant="h6" fontWeight="600">
                        {moment(activity?.early_time_out).format(
                          "DD MMM YYYY"
                        ) ?? "-"}
                      </Typography>
                      <Typography
                        color="textSecondary"
                        variant="h6"
                        fontWeight="600"
                      >
                        {moment(activity?.early_time_out).format("HH:mm:ss") ??
                          "-"}
                      </Typography>
                    </>
                  ) : (
                    "-"
                  )}
                </TableCell>
                <TableCell size="small">
                  <Typography variant="h6" fontWeight="600">
                    {activity?.early_leave_reason ?? "-"}
                  </Typography>
                </TableCell>

                <TableCell size="small">
                  {activity?.is_approved_early_leave === null ? (
                    <StatusPending />
                  ) : activity?.is_approved_early_leave != null ? (
                    activity?.is_approved_early_leave ? (
                      <>
                        {/* <CheckBoxIcon color="success" /> */}
                        <StatusAproved
                          note={activity?.early_leave_reject_reason}
                        />
                      </>
                    ) : (
                      <>
                        {/* <CancelIcon color="danger" /> */}
                        <StatusRejected
                          note={activity?.early_leave_reject_reason}
                        />
                      </>
                    )
                  ) : (
                    "-"
                  )}
                </TableCell>
              </TableRow>
            ))}
        </BaseTable>
      </Card>
    </>
  );
};
Pelajaran.layout = "Admin";
export default Pelajaran;
