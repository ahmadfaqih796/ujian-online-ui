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
import EnhancedTable from "@/components/table/enhaced-table/list-table/EnhacedSoalTable";
import { getSoal } from "@/lib/services/soal";
import { SOAL_CELL } from "@/utils/headCells/soal-cell";
import SoalList from "@/components/lists/SoalList";

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
    // kode_pelajaran: id,
  });
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
      <Card>
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
        </CardContent>
      </Card>
      <SoalList data={soal} />
    </>
  );
};

Question.layout = "Admin";
export default Question;
