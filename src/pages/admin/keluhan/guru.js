// pages/index.js (Next.js frontend)
import { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import axios from "axios";
import WithAuth from "@/lib/sessions/withAuth";
import Chat from "@/components/custom/customMessage";

export const getServerSideProps = WithAuth(async function ({ req }) {
  const { id, token } = req.session.user;
  console.log("first", req.session.user);

  //   console.log("wwww", id, token);

  return {
    props: { session: req.session.user },
  };
});

const Guru = ({ session }) => {
  const [inputMessage, setInputMessage] = useState("");
  const [receivedMessages, setReceivedMessages] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  console.log("massssss", receivedMessages);
  const socket = io("http://localhost:3030", {
    path: "/messages",
  });

  useEffect(() => {
    axios
      .get("http://localhost:3030/messages", {
        params: { $limit: -1 },
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
          params: { role: "admin" },
          headers: {
            Authorization: `Bearer ${session.token}`,
          },
        })
        .then((res) => {
          const { data } = res.data;
          console.log("masuk", data);
          const userData = data.map((row) => ({
            id: row?.id_user,
            name: row?.user_admin?.nama_admin,
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
  }, []);

  socket.on("update-user-status", (data) => {
    console.log("hallo", data);
    setOnlineUsers(data);
    // setReceivedMessages((prevMessages) => [...prevMessages, data]);
  });

  const handleMessageSend = () => {
    const payload = {
      text: inputMessage,
      id_user: session.id,
    };
    if (inputMessage.trim() !== "") {
      const res = axios
        .post("http://localhost:3030/messages", payload)
        .then((response) => {
          console.log("berhasil nambah", response);
          socket.emit("client-message", {
            ...response.data,
            name: session.name,
          });
        })
        .catch((error) => {
          console.error("Error creating message:", error);
        });

      setInputMessage("");
    }
  };

  return (
    <div>
      {/* <h1>Real-Time Chat</h1>
      <div style={{ color: "black" }}>
        <ul>
          {receivedMessages
            .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
            .map((message, index) => (
              <li key={index}>{message.text}</li>
            ))}
        </ul>
      </div>
      <div>
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
        />
        <button onClick={handleMessageSend}>Send</button>
      </div> */}
      <div style={{ color: "black" }}>
        <h2>Online Users:</h2>
        <ul>
          {onlineUsers.map((user) => (
            <li key={user.id}>
              {user.name} {user.status ? "(Online)" : "(Offline)"}
            </li>
          ))}
        </ul>
      </div>
      <Chat
        session={session}
        message={inputMessage}
        setMessage={(field) => setInputMessage(field)}
        data={receivedMessages}
        handleSend={handleMessageSend}
      />
    </div>
  );
};
Guru.layout = "Admin";
export default Guru;