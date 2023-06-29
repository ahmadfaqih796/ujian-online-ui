import { withSessionSsr } from "./withSession";

const WithAuth = (gssp) =>
  withSessionSsr(async (context) => {
    try {
      const user = context.req.session.user;
      if (!user) {
        return {
          redirect: {
            permanent: false,
            destination: "/authentication/login",
          },
        };
      }
      return await gssp(context);
    } catch (error) {
      console.log(error);
      if (error?.response?.data?.code === 401) {
        return {
          redirect: {
            permanent: false,
            destination: "/authentication/login",
          },
        };
      }
    }
    return await gssp(context);
  });

export default WithAuth;
