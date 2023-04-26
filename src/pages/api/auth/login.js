import { loginService } from "@/lib/services/auth/login";
import { withSessionRoute } from "@/lib/sessions/withSession";

async function loginRoute(req, res) {
  try {
    const response = await loginService(req.body);
    const { user, siswa, guru, authentication } = response;
    const { nik, name, role } = user;
    const { accessToken, payload } = authentication;
    // if (role_id != "admin") {
    //   if (job_level.level === 1 || job_level.name === "STAFF") {
    //     return res.redirect("/404").end();
    //   }
    // }
    console.log("xxxxxxxx", response);
    req.session.user = {
      id: response.user.id_user,
      nik: nik,
      name: name,
      iat: payload.iat,
      exp: payload.exp,
      token: accessToken,
    };

    await req.session.save();

    return res.json({
      success: true,
      message: "Berhasil login",
      // level: job_level,
    });
  } catch (error) {
    console.log(error);
    const e = error.toString();
    // handle error from api with response api
    if (error?.response) {
      return res.status(500).json(error.response.data);
    }
    //  handle if error job level === 1 or job level === staff
    return res.status(400).json({
      message: e,
    });
  }
}

export default withSessionRoute(loginRoute);
