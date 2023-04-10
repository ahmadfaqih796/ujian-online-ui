import pagination from "@/lib/services/pagination/pagination";
import WithAuth from "@/lib/sessions/withAuth";
import React from "react";

export const getServerSideProps = WithAuth(async ({ query, req }) => {
  const departements = await pagination(
    "/users",
    {
      ...query,
    },
    {
      Authorization: req.session.user.token,
    }
  );
  return {
    props: {
      departements,
    },
  };
});

const Siswa = ({ departements }) => {
  return (
    <>
      {JSON.stringify(departements)}
      siswa
    </>
  );
};
Siswa.layout = "Admin";
export default Siswa;
