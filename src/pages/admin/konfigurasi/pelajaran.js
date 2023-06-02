import ThreeDotsMenu from "@/components/menu-items/ThreeDotsMenu";
import DeleteModal from "@/components/modal/DeleteModal";
import AddLessonModal from "@/components/modal/lesson/AddLessonModal";
import DetailUserModal from "@/components/modal/user/DetailUserModal";
import BaseTable from "@/components/table/BaseTable";
import useHandleModal from "@/hooks/useHandleModal";
import pagination from "@/lib/services/pagination/pagination";
import WithAuth from "@/lib/sessions/withAuth";
import LESSON_CELLS from "@/utils/headCells/lesson-cells";
import { Button, Card, TableCell, TableRow, Typography } from "@mui/material";
import { Box } from "@mui/system";
import moment from "moment";
import { useRouter } from "next/router";
import React from "react";

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
  const router = useRouter();
  const { page, per_page } = router.query;
  const [userData, setUserData] = React.useState({});
  const { openModal, modalType, handleCloseModal, handleOpenModal } =
    useHandleModal(false);

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
      <Card
        // className="card-list"
        sx={{
          padding: "20px 0 0",
          overflow: "visible",
        }}
      >
        <Box display="flex">
          <Button
            color="primary"
            variant="contained"
            onClick={() => handleOpenModal("add")}
          >
            Tambahkan
          </Button>
        </Box>
        <BaseTable tableHead={LESSON_CELLS} data={lesson}>
          {lesson &&
            lesson.data.map((data, index) => (
              <TableRow key={index} hover role="checkbox" tabIndex={-1}>
                <TableCell>
                  <Typography fontWeight="600">
                    {page && per_page
                      ? index + 1 + (page - 1) * per_page
                      : index + 1}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography fontWeight="600">
                    {data.nama_pelajaran}
                  </Typography>
                </TableCell>
                <TableCell>
                  {data.createdAt ? (
                    <>
                      <Typography variant="h6" fontWeight="600">
                        {moment(data.createdAt).format("DD MMM YYYY") ?? "-"}
                      </Typography>
                      <Typography
                        color="textSecondary"
                        variant="h6"
                        fontWeight="600"
                      >
                        {moment(data.createdAt).format("HH:mm:ss") ?? "-"}
                      </Typography>
                    </>
                  ) : (
                    "-"
                  )}
                </TableCell>
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
        </BaseTable>
      </Card>
    </>
  );
};
Pelajaran.layout = "Admin";
export default Pelajaran;
