import { deleteMultipleSoal } from "@/lib/services/soal";
import { withSessionRoute } from "@/lib/sessions/withSession";

async function handler(req, res) {
  const { user: userSession } = req.session;

  if (req.method === "DELETE") {
    try {
      const { query } = req;
      const concatString = Object.values(query).join(",");
      const response = await deleteMultipleSoal(
        userSession.token,
        concatString
      );
      res.json(response);
      return;
    } catch (error) {
      console.log(error);
      return res.status(500).json({ ok: false, message: error });
    }
  }
}

export default withSessionRoute(handler);