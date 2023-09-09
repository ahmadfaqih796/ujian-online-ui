// pages/index.js (Next.js frontend)
import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import axios from "axios";
import WithAuth from "@/lib/sessions/withAuth";
import Chat from "@/components/custom/customMessage";
import { Avatar, AvatarGroup, Box, Typography } from "@mui/material";
import AvatarGroupDropdown from "@/components/dropdown/AvatarGroupDropdown";
import { useRouter } from "next/router";
import { getAllUser } from "@/lib/services/users";

export const getServerSideProps = WithAuth(async function ({ req, query }) {
  const { id, token } = req.session.user;
  const userData = await getAllUser(token, {
    $limit: -1,
    "$or[0][role]": "admin",
    "$or[1][role]": "siswa",
    // ...(search && {
    //   "name[$like]": `%${search}%`,
    // }),
  });
  console.log(userData);
  return {
    props: {
      session: {
        ...req.session.user,
        receiver: query.id_receiver || null,
      },
      userData: userData,
    },
  };
});

const Siswa = ({ session }) => {
  const router = useRouter();
  const [receivedMessages, setReceivedMessages] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [active, setActive] = useState([]);
  const [search, setSearch] = useState([]);

  const socket = io("http://localhost:3030", {
    path: "/messages",
  });

  const updateStatus = (dataUser, idUser) => {
    dataUser.forEach((user) => {
      user.status = false;
      if (idUser.includes(user.id_user)) {
        user.status = true;
      }
    });
  };

  const fetchUserData = async () => {
    const { data } = await axios.get(`/api/users`, {
      params: {
        $limit: -1,
        "id_user[$ne]": session.id,
        "$or[0][role]": "admin",
        "$or[1][role]": "siswa",
        ...(search && {
          "name[$like]": `%${search}%`,
        }),
      },
    });
    const userData = data.map((row) => ({
      id_user: row?.id_user,
      name: row?.user_admin?.nama_admin || row?.user_siswa?.nama_siswa,
      photo: row?.user_admin?.photo || row?.user_siswa?.photo,
      role: row?.role,
      status: false,
    }));
    console.log(userData);
    setOnlineUsers(userData);
    socket.emit("user-active", { id: session.id });
    socket.on("update-online", (data) => {
      setActive(data);
    });
  };

  useEffect(() => {
    fetchUserData();
  }, [search, updateStatus(onlineUsers, active)]);

  useEffect(() => {
    axios
      .get("http://localhost:3030/messages", {
        params: {
          $limit: -1,
          grup_name: "guru",
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

    socket.on("connect", () => {});

    socket.on("server-message", (data) => {
      console.log("yoyoyoyo", data);
      if (
        (data.id_receiver === session.id &&
          data.id_sender === session.receiver) ||
        (data.id_sender === session.id && data.id_receiver === session.receiver)
      ) {
        setReceivedMessages((prevMessages) => [...prevMessages, data]);
      }
    });

    return () => {
      console.log("ffffffffff", onlineUsers);
      socket.emit("before-disconnect", { id: session.id });
      console.log("anda disconnect");
      socket.disconnect();
    };
  }, [router, session]);

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
          Siswa Chat
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
        grup={"guru"}
        hrefPersonal={"/admin/keluhan/siswa"}
      />
    </React.Fragment>
  );
};
Siswa.layout = "Admin";
export default Siswa;
