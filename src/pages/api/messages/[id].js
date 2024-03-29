import { updateMessages } from "@/lib/services/messages";
import { withSessionRoute } from "@/lib/sessions/withSession";

async function handler(req, res) {
  const { user: userSession } = req.session;
  if (req.method === "PATCH") {
    try {
      const { query } = req;
      const response = await updateMessages(userSession.token, query);
      return res.json(response);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ ok: false, error });
    }
  }
}

export default withSessionRoute(handler);
