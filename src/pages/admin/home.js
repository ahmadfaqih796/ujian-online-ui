import { useUserSession } from "@/hooks/auth/useUserSession";
import { getHome } from "@/lib/services/admin/Home";
import WithAuth from "@/lib/sessions/withAuth";
import { Button } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";
import React from "react";

export const getServerSideProps = WithAuth(async function ({ req }) {
  const { id } = req.session.user;
  const { token } = req.session.user;
  const dashboard = await getHome(token);
  console.log("wwww", req.session);
  // const user = req.session.user;

  //   if (user.level === "STAFF") {
  //     return {
  //       redirect: {
  //         permanent: false,
  //         destination: "/apps/absent",
  //       },
  //     };
  //   }
  return {
    props: { dashboard },
  };
});
const Home = ({ dashboard }) => {
  const router = useRouter();
  const handleLogout = async () => {
    await axios.post("/api/auth/logout");
    router.replace("/authentication/login");
  };
  return (
    <>
      cccc
      <Button onClick={handleLogout}>Keluar</Button>
    </>
  );
};
Home.layout = "Admin";
export default Home;
