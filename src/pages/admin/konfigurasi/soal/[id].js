import AddQuestionModal from "@/components/modal/question/AddQuestionModal";
import pagination from "@/lib/services/pagination/pagination";
import WithAuth from "@/lib/sessions/withAuth";
import { useRouter } from "next/router";
import {
  Box,
  Button,
  Card,
  CardContent,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";

import React from "react";
import { QUESTION_CELL } from "@/utils/headCells/configuration-cell";
import useHandleModal from "@/hooks/useHandleModal";
import BaseTable from "@/components/table/BaseTable";
import ThreeDots from "@/components/menu-items/ThreeDots";
import EnhancedTable from "@/components/table/enhaced-table/EnhacedTable";
import { getSoal } from "@/lib/services/soal";

export const getServerSideProps = WithAuth(async ({ query, req, params }) => {
  const { id } = params;
  const { token, client_id, role } = req.session.user;
  const session = {
    client_id,
    role,
  };
  const question = await pagination(
    "/soal",
    {
      $limit: -1,
      kode_pelajaran: id,
    },
    {
      Authorization: token,
    }
  );

  const soal = await getSoal(token, {
    $limit: -1,
    kode_pelajaran: id,
  });
  console.log("xxxx", soal);
  return {
    props: {
      question,
      soal,
    },
  };
});

const Question = ({ question, soal }) => {
  const router = useRouter();
  const { page, per_page } = router.query;
  const { openModal, modalType, handleCloseModal, handleOpenModal } =
    useHandleModal(false);

  return (
    <>
      <AddQuestionModal
        open={openModal}
        type={modalType}
        closeModalHandler={handleCloseModal}
      />
      <Card
        // className="card-list"
        sx={{
          padding: "20px 0 0",
          // overflow: "visible",
        }}
      >
        <CardContent>
          <Box display="flex">
            <Button
              color="primary"
              variant="contained"
              onClick={() => handleOpenModal("add")}
            >
              Tambahkan
            </Button>
          </Box>
          <BaseTable tableHead={QUESTION_CELL} data={question}>
            {question &&
              question.data.map((row, index) => (
                <TableRow key={index} hover role="checkbox" tabIndex={-1}>
                  <TableCell>
                    <Typography fontWeight="600" variant="h6">
                      {page && per_page
                        ? index + 1 + (page - 1) * per_page
                        : index + 1}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography fontWeight="600">{row?.pertanyaan}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography fontWeight="600">{row?.pilihan_a}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography fontWeight="600">{row?.pilihan_b}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography fontWeight="600">{row?.kunci}</Typography>
                  </TableCell>
                  <TableCell>
                    {/* <ThreeDots
                    sx={{ textAlign: "right" }}
                    options={options}
                    onClick={(show) =>
                      handleClickDot(row, show, row?.id_pelajaran)
                    }
                  /> */}
                  </TableCell>
                </TableRow>
              ))}
          </BaseTable>
        </CardContent>
        <EnhancedTable data={soal} />
      </Card>
    </>
  );
};

Question.layout = "Admin";
export default Question;
