// pages/index.js (Next.js frontend)
import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import axios from "axios";
import WithAuth from "@/lib/sessions/withAuth";
import Chat from "@/components/custom/customMessage";
import { Avatar, AvatarGroup, Box, Typography } from "@mui/material";
import AvatarGroupDropdown from "@/components/dropdown/AvatarGroupDropdown";
import { useRouter } from "next/router";

export const getServerSideProps = WithAuth(async function ({ req }) {
  return {
    props: { session: req.session.user },
  };
});

const Guru = ({ session }) => {
  const router = useRouter();
  const [receivedMessages, setReceivedMessages] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [search, setSearch] = useState([]);

  const socket = io("http://localhost:3030", {
    path: "/messages",
  });

  useEffect(() => {
    axios
      .get("http://localhost:3030/messages", {
        params: {
          $limit: -1,
          grup_name: "guru",
        },
      })
      .then((res) => {
        setReceivedMessages(res.data);
      })
      .catch((error) => {
        console.log(error);
      });

    socket.on("connect", () => {
      axios
        .get("http://localhost:3030/users", {
          params: {
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
          const { data } = res.data;
          console.log("masuk", data);
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
          console.log("gagal meload data", error);
        });
    });

    socket.on("server-message", (data) => {
      console.log("yoyoyoyo", data);
      if (data.grup_name == "guru") {
        setReceivedMessages((prevMessages) => [...prevMessages, data]);
      }
    });

    return () => {
      console.log("ffffffffff", onlineUsers);
      socket.emit("before-disconnect", { id: session.id }); // Mengirimkan event disconnect dengan ID pengguna
      console.log("anda disconnect");
      socket.disconnect();
      // targetIdUser = targetIdUser.filter((user) => user.id !== targetIdToDelete);
    };
  }, [search, router.asPath]);

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
          Guru Group
        </Typography>
        <Box sx={{ display: { xs: "block", md: "none" } }}>
          <AvatarGroupDropdown options={onlineUsers} />
        </Box>
      </Box>
      <Chat
        search={search}
        setSearch={(field) => setSearch(field)}
        users={onlineUsers}
        session={session}
        data={receivedMessages}
        personal={true}
        grup={"guru"}
      />
    </React.Fragment>
  );
};
Guru.layout = "Admin";
export default Guru;
