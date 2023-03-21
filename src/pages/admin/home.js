import { getHome } from "@/lib/services/admin/home";
import WithAuth from "@/lib/sessions/withAuth";
import { Button } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";

export const getServerSideProps = WithAuth(async function ({ req }) {
  const { id } = req.session.user;
  const { token } = req.session.user;
  console.log("first", token);
  const dashboard = await getHome(token);
  //   const user = req.session.user;

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
  // console.log("xxxxxxxx", dashboard);
  const router = useRouter();
  const handleLogout = async () => {
    await axios.post("/api/logout");
    router.push("/authentication/login");
  };
  return (
    <>
      aaaaaaaaaaaa
      <Button onClick={handleLogout}>Keluar</Button>
    </>
  );
};

export default Home;
