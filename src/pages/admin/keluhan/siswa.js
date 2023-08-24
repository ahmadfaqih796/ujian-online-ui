import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import axios from "axios";

const socket = io("http://localhost:3030", { path: "/messages" });

const SiswaMessage = () => {
  console.log("ssssssssssssokk", socket);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  console.log("message", messages);

  useEffect(() => {
    // axios
    //   .get("http://localhost:3030/messages", { params: { $limit: -1 } })
    //   .then((response) => {
    //     setMessages(response.data);
    //     socket.emit("message created", messages);
    //   })
    //   .catch((error) => {
    //     console.error("Error fetching messages:", error);
    //   });

    socket.on("pesan", (message) => {
      console.log("pappaapapap", message);
      setMessages((prevMessages) => [...prevMessages, message]);
    });
  }, []);

  const sendMessage = () => {
    axios
      .post("http://localhost:3030/messages", {
        id_user: "0fb7b66d-697a-4037-9463-15552dbc0774",
        text: newMessage,
      })
      .then((response) => {
        // socket.on("message created", response.data);
        socket.on("message created", (message) => {
          console.log("pappaapapap", message);
          setMessages((prevMessages) => [...prevMessages, message]);
        });
        setMessages((prevMessages) => [...prevMessages, response.data]);
        console.log("bbbbb", response.data);
        setNewMessage("");
      })
      .catch((error) => {
        console.error("Error creating message:", error);
      });
    const res = socket.emit("pesan", {
      id_user: "0fb7b66d-697a-4037-9463-15552dbc0774",
      text: newMessage,
    });
    console.log("masuk", res);
    setNewMessage("");
  };

  return (
    <div>
      <h1 style={{ color: "black" }}>SiswaMessage</h1>
      <div style={{ color: "black" }}>
        {messages.map((message, index) => (
          <div key={index}>{message.text}</div>
        ))}
        aaa
      </div>
      <div>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
      {/* <button onClick={handleClick}>Coba Fatching Data</button> */}
    </div>
  );
};
SiswaMessage.layout = "Admin";
export default SiswaMessage;
