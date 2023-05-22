import { getOneUser } from "@/lib/services/users";
import { getOneAdmin } from "@/lib/services/users/admin";
import { withSessionRoute } from "@/lib/sessions/withSession";
import { ConvertBase64 } from "@/utils/convertBase64";

export default withSessionRoute(userRoute);

async function userRoute(req, res) {
  try {
    const { session } = req;
    if (!session.user) return res.status(401).json({});
    // if (session.user.role == "siswa") {
    //   return res.status(400).json({
    //     message: "Tidak bisa login karna role anda adalah siswa",
    //   });
    // }
    const response = await getOneUser(session.user.id, session.user.token);
    const resAdmin = await getOneAdmin(session.user.id, session.user.token);

    const tempToken = session && new ConvertBase64(session.user.token);
    const token = tempToken.encode();

    const data = {
      id: response.id,
      ...(response.role === "admin" && {
        name: resAdmin.nama_admin,
      }),
      email: response.email,
      token: token,
    };

    return res.json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.response);
  }
}
