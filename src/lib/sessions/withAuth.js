import { withSessionSsr } from "./withSession";

const WithAuth = (gssp) =>
  withSessionSsr(async (context) => {
    const user = context.req.session.user;

    // you can check the user in your DB here
    if (!user) {
      return {
        redirect: {
          permanent: false,
          destination: "/authentication/login",
        },
      };
    }

    return await gssp(context);
  });

export default WithAuth;
