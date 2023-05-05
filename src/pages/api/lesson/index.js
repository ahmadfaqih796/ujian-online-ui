import { addLesson } from "@/lib/services/lesson";
import { withSessionRoute } from "@/lib/sessions/withSession";

async function handler(req, res) {
  const { user: userSession } = req.session;

  // create data pelajaran
  if (req.method === "POST") {
    try {
      const { body } = req;
      const response = await addLesson(body, userSession.token);
      return res.json({
        message: "berhasil menambahkan pelajaran",
        response,
      });
    } catch (error) {
      return res.status(500).json({ ok: false, message: error });
    }
  }
}

export default withSessionRoute(handler);
