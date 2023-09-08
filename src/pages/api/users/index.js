import { addUser, getAllUser } from "@/lib/services/users";
import { withSessionRoute } from "@/lib/sessions/withSession";

async function handler(req, res) {
  const { user: userSession } = req.session;
  if (req.method === "GET") {
    try {
      const { query } = req;
      const response = await getAllUser(userSession.token, query);
      return res.json(response);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ ok: false });
    }
  }

  // create data user
  if (req.method === "POST") {
    try {
      const { body } = req;
      const response = await addUser(body);
      return res.json({
        message: "berhasil menambhakan user",
        response,
      });
    } catch (error) {
      return res.status(500).json({ ok: false, message: error });
    }
  }
}

export default withSessionRoute(handler);
