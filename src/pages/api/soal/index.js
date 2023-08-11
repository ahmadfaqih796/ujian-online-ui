import { addSoal, deleteMultipleSoal } from "@/lib/services/soal";
import { withSessionRoute } from "@/lib/sessions/withSession";

async function handler(req, res) {
  const { user: userSession } = req.session;

  if (req.method === "POST") {
    try {
      const { body } = req;
      const response = await addSoal(body, userSession.token);
      return res.json({
        message: "berhasil menambahkan soal",
        response,
      });
    } catch (error) {
      return res.status(500).json({ ok: false, message: error });
    }
  }

  if (req.method === "DELETE") {
    try {
      const { query } = req;
      const concatString = Object.values(query).join(",");
      const response = await deleteMultipleSoal(
        userSession.token,
        concatString
      );
      return res.json(response);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ ok: false, message: error });
    }
  }
}

export default withSessionRoute(handler);
