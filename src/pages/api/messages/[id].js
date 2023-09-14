import { updateMessages } from "@/lib/services/messages";
import { withSessionRoute } from "@/lib/sessions/withSession";

async function handler(req, res) {
  const { user: userSession } = req.session;
  console.log("kkkkk");
  if (req.method === "PATCH") {
    try {
      const { id, id_receiver } = req.query;
      console.log("kkkkkkkk", id_receiver);
      const { body } = req;
      const response = await updateMessages(
        id,
        body,
        userSession.token,
        id_receiver
      );
      return res.json(response);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ ok: false, error });
    }
  }
}

export default withSessionRoute(handler);
