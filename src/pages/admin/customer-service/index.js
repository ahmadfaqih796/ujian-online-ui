import Chat from "@/components/custom/customMessage";
import AvatarGroupDropdown from "@/components/dropdown/AvatarGroupDropdown";
import WithAuth from "@/lib/sessions/withAuth";
import { Box, Typography } from "@mui/material";
import axios from "axios";
import React from "react";
import io from "socket.io-client";

export const getServerSideProps = WithAuth(async function ({ req, query }) {
  const { id, token } = req.session.user;
  return {
    props: {
      session: req.session.user,
    },
  };
});

const CustomerService = ({ session, pesan }) => {
  const [receivedMessages, setReceivedMessages] = React.useState([]);
  const [onlineUsers, setOnlineUsers] = React.useState([]);
  const [search, setSearch] = React.useState([]);

  const socket = io("http://localhost:3030", {
    path: "/messages",
  });

  React.useEffect(() => {
    socket.on("connect", () => {
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
        })
        .then((res) => {
          const { data } = res;
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
      console.log("yoyoyoyo", data);
      setReceivedMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      console.log("ffffffffff", onlineUsers);
      socket.emit("before-disconnect", { id: session.id }); // Mengirimkan event disconnect dengan ID pengguna
      console.log("anda disconnect");
      socket.disconnect();
      // targetIdUser = targetIdUser.filter((user) => user.id !== targetIdToDelete);
    };
  }, [search]);

  socket.on("update-user-status", (data) => {
    console.log("hallo", data);
    setOnlineUsers(data);
    // setReceivedMessages((prevMessages) => [...prevMessages, data]);
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
          Personal
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
CustomerService.layout = "Admin";
export default CustomerService;
