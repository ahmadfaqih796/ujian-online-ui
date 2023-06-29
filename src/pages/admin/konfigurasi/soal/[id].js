import pagination from "@/lib/services/pagination/pagination";
import WithAuth from "@/lib/sessions/withAuth";
import React from "react";

export const getServerSideProps = WithAuth(async ({ query, req, params }) => {
  const { id } = params;
  console.log("sssssss", query);
  const { token, client_id, role } = req.session.user;
  const session = {
    client_id,
    role,
  };
  //   const lesson = await pagination(
  //     "/soal",
  //     {
  //       ...query,
  //     },
  //     {
  //       Authorization: token,
  //     }
  //   );
  return {
    props: {
      // lesson,
    },
  };
});

const Moyet = () => {
  return <div>Moyet</div>;
};

export default Moyet;
