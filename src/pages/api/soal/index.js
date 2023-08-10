import { deleteMultipleSoal } from "@/lib/services/soal";
import { withSessionRoute } from "@/lib/sessions/withSession";

async function handler(req, res) {
  const { user: userSession } = req.session;

  if (req.method === "DELETE") {
    try {
      const { params } = req;
      // const response = await deleteMultipleSoal(userSession.token, body);
      // res.json(response);
      console.log("ssssssss", params);
      return;
    } catch (error) {
      console.log(error);
      return res.status(500).json({ ok: false });
    }
  }
}

export default withSessionRoute(handler);
