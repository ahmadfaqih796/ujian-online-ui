// pages/index.js (Next.js frontend)
import { useState, useEffect } from "react";
import io from "socket.io-client";
import axios from "axios";
import WithAuth from "@/lib/sessions/withAuth";
import Chat from "@/components/custom/customMessage";

export const getServerSideProps = WithAuth(async function ({ req }) {
  const { id, token } = req.session.user;

  //   console.log("wwww", id, token);

  return {
    props: { session: req.session.user },
  };
});

const Guru = ({ session }) => {
  const [inputMessage, setInputMessage] = useState("");
  const [receivedMessages, setReceivedMessages] = useState([]);
  console.log("massssss", receivedMessages);
  const socket = io("http://localhost:3030", {
    path: "/messages",
  });

  useEffect(() => {
    axios
      .get("http://localhost:3030/messages", { params: { $limit: -1 } })
      .then((response) => {
        setReceivedMessages(response.data);
        console.log("ssssssssss", response.data);
      })
      .catch((error) => {
        console.error("Error fetching messages:", error);
      });
    socket.on("connect", () => {
      console.log("Connected to socket.io server");
    });

    socket.on("server-message", (data) => {
      // console.log("yoyoyoyo", data);
      setReceivedMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleMessageSend = () => {
    const payload = {
      text: inputMessage,
      id_user: session.id,
    };
    if (inputMessage.trim() !== "") {
      axios
        .post("http://localhost:3030/messages", payload)
        .then((response) => {
          console.log("berhasil nambah", response);
        })
        .catch((error) => {
          console.error("Error creating message:", error);
        });
      socket.emit("client-message", payload);
      setInputMessage("");
    }
  };

  return (
    <div>
      <h1>Real-Time Chat</h1>
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
      </div>
      <Chat />
    </div>
  );
};
Guru.layout = "Admin";
export default Guru;
