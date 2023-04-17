import { deleteUser } from "@/lib/services/users";
import { withSessionRoute } from "@/lib/sessions/withSession";

async function handler(req, res) {
  const { user: userSession } = req.session;

  if (req.method === "DELETE") {
    try {
      const { id } = req.query;
      const response = await deleteUser(id, userSession.token);
      return res.json(response);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ ok: false });
    }
  }
}

export default withSessionRoute(handler);
