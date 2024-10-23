import React, { useEffect, useRef, useState } from "react";
import "./Chat.css";
import {
  doc,
  onSnapshot,
  updateDoc,
  arrayUnion,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { db } from "../../lib/firebase";
import useChatStore from "../../lib/chatStore";
import useUserStore from "../../lib/userStore"; // Import user store to access currentUser
import upload from "../../lib/upload";

function Chat() {
  const [messages, setMessages] = useState([]); // Chat messages state
  const [text, setText] = useState(""); // Fixed variable name for message text
  const endRef = useRef(null); // For scrolling to the bottom
  const { chatId, user } = useChatStore(); // Get the current chatId from the store
  const { currentUser } = useUserStore(); // Get current user from user store
  const [image, setimage] = useState({
    file: null,
    url: "",
  });

  // Load messages from local storage when component mounts
  useEffect(() => {
    const storedMessages = JSON.parse(localStorage.getItem(`chat_${chatId}`)) || [];
    setMessages(storedMessages);
  }, [chatId]);

  // Scroll to the bottom when messages change
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Fetch chat messages whenever chatId changes
  useEffect(() => {
    if (!chatId) return;

    const chatDocRef = doc(db, "chats", chatId);
    const unsubscribe = onSnapshot(chatDocRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        setMessages(docSnapshot.data().messages || []);
        // Update local storage with fetched messages
        localStorage.setItem(`chat_${chatId}`, JSON.stringify(docSnapshot.data().messages || []));
      } else {
        console.log("No such document!");
      }
    });

    return () => unsubscribe();
  }, [chatId]);

  const sendMessage = async () => {
    if (text === "" && !image.file) return;

    let imgUrl = null;
    try {
      if (image.file) {
        imgUrl = await upload(image.file);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }

    try {
      const chatDocRef = doc(db, "chats", chatId);
      const chatDocSnapshot = await getDoc(chatDocRef);

      // If chat document doesn't exist, create it
      if (!chatDocSnapshot.exists()) {
        await setDoc(chatDocRef, { messages: [] });
      }

      // Now update the chat document with the new message
      await updateDoc(chatDocRef, {
        messages: arrayUnion({
          senderId: currentUser.id,
          text,
          createdAt: new Date(),
          ...(imgUrl && { img: imgUrl }), // Add image URL if available
        }),
      });

      // Update local storage with the new message
      const updatedMessages = [...messages, {
        senderId: currentUser.id,
        text,
        createdAt: new Date(),
        ...(imgUrl && { img: imgUrl }),
      }];
      localStorage.setItem(`chat_${chatId}`, JSON.stringify(updatedMessages));
      setMessages(updatedMessages); // Update the local messages state

      // Update chat metadata for both the current user and the other participant
      const UserIDs = [currentUser.id, user.id];

      UserIDs.forEach(async (id) => {
        const usersChatRef = doc(db, "userchats", id);
        const userChatsSnapshot = await getDoc(usersChatRef);

        if (userChatsSnapshot.exists()) {
          const userChatsData = userChatsSnapshot.data();

          // Find the chat by chatId
          const chatIndex = userChatsData.chats.findIndex(
            (c) => c.chatId === chatId
          );

          if (chatIndex !== -1) {
            // Update chat data
            userChatsData.chats[chatIndex].lastmessage = text || "Image";
            userChatsData.chats[chatIndex].IsSeen =
              id === currentUser.id ? true : false;
            userChatsData.chats[chatIndex].updatedAt = Date.now();

            // Update the user chat document
            await updateDoc(usersChatRef, {
              chats: userChatsData.chats,
            });
          }
        }
      });

      // Clear the input field and image after sending
      setText("");
      setimage({ file: null, url: "" });
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleImage = (e) => {
    if (e.target.files[0]) {
      setimage({
        file: e.target.files[0],
        url: window.URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  return (
    <div className="chat">
      <div className="top">
        <div className="user">
          <img src={user?.avatar || "./avatar.png"} alt="" />
          <div className="texts">
            <span>{user?.username}</span>
            <p>Lorem ipsum dolor sit</p>
          </div>
        </div>
        <div className="icons">
          <img src="./phone.png" alt="" />
          <img src="./video.png" alt="" />
          <img src="./info.png" alt="" />
        </div>
      </div>

      <div className="center">
        {messages.map((message, index) => (
          <div
            className={`message ${
              message.senderId === currentUser.id ? "messageown" : ""
            }`}
            key={index}
          >
            <div className="texts">
              {message.img && <img src={message.img} alt="message-img" />}
              <p>{message.text}</p>
            </div>
          </div>
        ))}
        {image.url && (
          <div className="message own">
            <div className="text">
              <img src={image.url} alt="Preview" />
            </div>
          </div>
        )}

        <div ref={endRef}></div>
      </div>

      <div className="bottom">
        <div className="icons">
          <label htmlFor="file">
            <img src="./img.png" alt="Attach Image" />
          </label>
          <input
            type="file"
            id="file"
            style={{ display: "none",cursor:"pointer" }}
            onChange={handleImage}
            
          />
          <img src="./camera.png" alt="Open Camera" />
          <img src="./mic.png" alt="Record Voice" />
        </div>
        <input
          type="text"
          placeholder="Type a message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default Chat;
