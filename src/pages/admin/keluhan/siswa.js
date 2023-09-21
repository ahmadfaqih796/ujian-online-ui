// pages/index.js (Next.js frontend)
import Chat from "@/components/custom/customMessage";
import AvatarGroupDropdown from "@/components/dropdown/AvatarGroupDropdown";
import WithAuth from "@/lib/sessions/withAuth";
import { Box, Typography } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import io from "socket.io-client";

export const getServerSideProps = WithAuth(async function ({ req, query }) {
  const { id, token } = req.session.user;
  return {
    props: {
      session: {
        ...req.session.user,
        receiver: query.id_receiver || null,
      },
    },
  };
});

const Siswa = ({ session }) => {
  const router = useRouter();
  const [receivedMessages, setReceivedMessages] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [active, setActive] = useState([]);
  const [read, setRead] = useState(false);
  const [search, setSearch] = useState([]);
  console.log("mmmmmm");

  const socket = io(
    "http://localhost:3030"
    // {
    //   path: "/messages",
    // }
  );

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
          // grup_name: "guru",
          "$or[0][id_sender]": session.id,
          "$or[0][id_receiver]": session.receiver,
          "$or[1][id_sender]": session.receiver,
          "$or[1][id_receiver]": session.id,
        },
      })
      .then((res) => {
        setReceivedMessages(res.data);
        if (
          (data.id_receiver === session.id &&
            data.id_sender === session.receiver) ||
          (data.id_sender === session.id &&
            data.id_receiver === session.receiver)
        ) {
          socket.emit("get-message", res.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });

    socket.on("get-server-message", (data) => {
      console.log("vvvvvvvv", data);
      setReceivedMessages(data);
    });
    socket.on("connect", () => {});

    socket.on("server-message", async (data) => {
      setRead(false);
      console.log("yoyoyoyo", data);
      console.log("session", session);
      // const isMessageForActiveChat =
      //   (data.id_receiver === session.id &&
      //     data.id_sender === session.receiver) ||
      //   (data.id_sender === session.id &&
      //     data.id_receiver === session.receiver);
      const isMessageSender =
        data.id_receiver === session.receiver && data.id_sender === session.id;

      const isMessageReceiver =
        data.id_receiver === session.id && data.id_sender === session.receiver;

      const isMessageNoReceiver =
        data.id_receiver !== session.id && data.id_sender === session.receiver;
      if (isMessageReceiver) {
        await axios.patch("/api/messages", null, {
          params: {
            id_sender: session.receiver,
            id_receiver: session.id,
          },
        });
        data.is_read = true;
        setReceivedMessages((prevMessages) => [...prevMessages, data]);
        console.log("dddadadad", data);
        setRead(true);

        // socket.emit("message-read", data);
      }

      if (isMessageSender) {
        // socket.on("server-message-read", (obj) => {
        //   if (!readUser.includes(obj.id)) {
        //     readUser.push(obj);
        //   }
        //   console.log("ffffffff", readUser);
        //   if (isMessageSender && obj.is_read == true) {
        //     data.is_read = true;
        //   }
        //   setReceivedMessages((prevMessages) => [...prevMessages, ...readUser]);
        //   return;
        // });

        if (isMessageNoReceiver) {
          data.is_read = true;
        }
        setReceivedMessages((prevMessages) => [...prevMessages, data]);
      }
      router.replace({
        pathname: "/admin/keluhan/siswa",
        query: {
          id_user: session.id,
          id_receiver: session.receiver,
        },
      });
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
        read={read}
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
