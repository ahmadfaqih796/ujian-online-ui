import pagination from "@/lib/services/pagination/pagination";
import WithAuth from "@/lib/sessions/withAuth";
import { Box, Button, Card, CardContent } from "@mui/material";

import SoalList from "@/components/lists/SoalList";
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
  return {
    props: {
      question,
      soal,
    },
  };
});

const Question = ({ question, soal }) => {
  return (
    <>
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
