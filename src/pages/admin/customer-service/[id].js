import Chat from "@/components/custom/customMessage";
import AvatarGroupDropdown from "@/components/dropdown/AvatarGroupDropdown";
import { getMessages } from "@/lib/services/messages";
import WithAuth from "@/lib/sessions/withAuth";
import { Box, Typography } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";
import React from "react";
import io from "socket.io-client";
import { useUserSession } from "@/hooks/auth/useUserSession";

export const getServerSideProps = WithAuth(async function ({
  req,
  params,
  query,
}) {
  const { id, token } = req.session.user;
  console.log("first", query);

  return {
    props: {
      session: {
        ...req.session.user,
        receiver: params.id,
      },
    },
  };
});

const CustomerServiceById = ({ session }) => {
  const { data: userLogin, error } = useUserSession();
  console.log("sssss", userLogin, error);
  const router = useRouter();
  console.log(router.asPath);

  const [receivedMessages, setReceivedMessages] = React.useState([]);
  const [onlineUsers, setOnlineUsers] = React.useState([]);
  const [search, setSearch] = React.useState([]);

  const socket = io("http://localhost:3030", {
    path: "/messages",
  });

  React.useEffect(() => {
    axios
      .get("http://localhost:3030/messages", {
        params: {
          $limit: -1,
          "$or[0][id_sender]": session.id,
          "$or[0][id_receiver]": session.receiver,
          "$or[1][id_sender]": session.receiver,
          "$or[1][id_receiver]": session.id,
        },
      })
      .then((res) => {
        setReceivedMessages(res.data);
      })
      .catch((error) => {
        console.log(error);
      });

    socket.on("connect", () => {
      console.log("socketz");

      axios
        .get("http://localhost:3030/users", {
          params: {
            $limit: -1,
            // "id_user[$ne]": session.id,
            "$or[0][role]": "admin",
            "$or[1][role]": "guru",
            ...(search && {
              "name[$like]": `%${search}%`,
            }),
          },
          headers: {
            Authorization: `Bearer ${session.token}`,
          },
        })
        .then((res) => {
          const { data } = res;
          console.log(data);
          const userData = data.map((row) => ({
            id: row?.id_user,
            name: row?.user_admin?.nama_admin || row?.user_guru?.nama_guru,
            photo: row?.user_admin?.photo || row?.user_guru?.photo,
            role: row?.role,
            status: false,
          }));
          setOnlineUsers(userData);
          console.log("Connected to socket.io server", userData);
          socket.emit("user-connected", userData, session.id);
        })
        .catch((error) => {
          console.log(error);
        });
    });

    socket.on("server-message", (data) => {
      if (
        data.id_receiver == session.receiver ||
        data.id_receiver == session.id
      ) {
        setReceivedMessages((prevMessages) => [...prevMessages, data]);
      }
    });

    return () => {
      socket.emit("before-disconnect", { id: session.id });
      console.log("anda disconnect");
      socket.disconnect();
    };
  }, [router, search]);

  socket.on("update-user-status", (data) => {
    console.log("hallo", data);
    setOnlineUsers(data);
  });

  return (
    <React.Fragment>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 1,
        }}
      >
        <Typography color="black" fontWeight={700} fontSize={24}>
          Personal Chat
        </Typography>
        <Box sx={{ display: { xs: "block", md: "none" } }}>
          <AvatarGroupDropdown options={onlineUsers} />
        </Box>
      </Box>
      <Chat
        setSearch={(field) => setSearch(field)}
        users={onlineUsers}
        session={session}
        data={receivedMessages}
        personal={true}
      />
    </React.Fragment>
  );
};
CustomerServiceById.layout = "Admin";
export default CustomerServiceById;
