import React, { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  serverTimestamp,
  onSnapshot,
  query,
  where,
  orderBy,
} from "firebase/firestore";

import { auth, db } from "../firebaseConfig";
import "../Styles/Chat.css";

const Chat = (props) => {
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const { room } = props;
  //<------------db-connection-withState(newMessage)----------->
  const messagesRef = collection(db, "movies");

  //<-----------------snapshot-section------------------------>
  useEffect(() => {
    const queryMessages = query(
      messagesRef,
      where("room", "==", room),
      orderBy("createdAt")
    );
    const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
      let messages = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages);
    });
    return () => unsubscribe();
  }, []);

  //<------------------database-section---------------------->
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newMessage === "") return;
    await addDoc(messagesRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: auth.currentUser.displayName,
      room: room,
    });
    setNewMessage("");
  };

  //<-------------------return-section---------------------->
  return (
    <div className="chat-app">
      <div className="header">
        <h1>Welcome To : {room}</h1>
      </div>
      {/* <--------------------Message-section-------------------> */}
      <div className="messages">
        {messages.map((messages) => (
          <div className="message" key={messages.id}>
            <span className="user">{messages.user}</span>
            {messages.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="new-message-form">
        <input
          type="text"
          placeholder="Type Your Message"
          className="new-message-input"
          onChange={(e) => setNewMessage(e.target.value)}
          value={newMessage}
        />
        <button className="send-button" type="submit">
          Send
        </button>
      </form>
    </div>
  );
};
export default Chat;
