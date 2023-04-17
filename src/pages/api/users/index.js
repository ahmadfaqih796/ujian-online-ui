import { addUser } from "@/lib/services/users";
import { withSessionRoute } from "@/lib/sessions/withSession";

async function handler(req, res) {
  const { user: userSession } = req.session;
  if (req.method === "GET") {
    try {
      const { company_id } = userSession;
      const { query } = req;
      const response = await getJobLevel(company_id, userSession.token, query);
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
      body.company_id = company_id;
      const response = await addUser(body);
      return res.json(response);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ ok: false });
    }
  }
}

export default withSessionRoute(handler);
