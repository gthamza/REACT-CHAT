import React, { useEffect, useRef, useState } from "react";
import "./Chat.css";
import EmojiPicker from "emoji-picker-react";
import {
  collection,
  doc,
  onSnapshot,
  updateDoc,
  arrayUnion,
  setDoc,
} from "firebase/firestore";
import { db } from "../../lib/firebase";

function Chat() {
  const [chat, setchat] = useState();
  const [open, setOpen] = useState(false);
  const [Text, setText] = useState("");
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [Text]);

  useEffect(() => {
    const chatId = "4uioibZerv8rX1QoSthw"; // Replace with actual chat ID

    const chatDocRef = doc(db, "chats", chatId);

    const unsubscribe = onSnapshot(chatDocRef, async (docSnapshot) => {
      if (docSnapshot.exists()) {
        console.log("Chat data:", docSnapshot.data());
        // Handle setting the chat data in the state (e.g., messages)
      } else {
        console.log("No such document! Creating the chat...");
        // Create a new document for the chat if it doesn't exist
        try {
          await setDoc(chatDocRef, {
            messages: [],
            createdAt: new Date(),
            updatedAt: new Date(),
          });
          console.log("New chat document created!");
        } catch (error) {
          console.error("Error creating chat document:", error);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const handleEmoji = (emojiObject, event) => {
    setText((prevText) => prevText + emojiObject.emoji);
    setOpen(false);
  };

  const sendMessage = async () => {
    const chatId = "4uioibZerv8rX1QoSthw"; // Replace with actual chat ID
    const messageData = {
      text: Text,
      senderId: "currentUserId", // Replace with current user ID
      createdAt: new Date(),
    };

    try {
      const chatDocRef = doc(db, "chats", chatId);
      await updateDoc(chatDocRef, {
        messages: arrayUnion(messageData),
        updatedAt: new Date(),
      });
      setText(""); // Clear the input after sending
    } catch (error) {
      console.error("Error sending message: ", error);
    }
  };

  return (
    <div className="chat">
      <div className="top">
        <div className="user">
          <img src="./avatar.png" alt="" />
          <div className="texts">
            <span>GT HAMZA</span>
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
        {/* Messages go here */}
        <div ref={endRef}></div>
      </div>

      <div className="bottom">
        <div className="icons">
          <img src="./img.png" alt="" />
          <img src="./camera.png" alt="" />
          <img src="./mic.png" alt="" />
        </div>

        <input
          type="text"
          placeholder="Type a message..."
          value={Text}
          onChange={(e) => setText(e.target.value)}
        />

        <div className="emoji">
          <img
            src="/emoji.png"
            alt="Emoji Picker"
            onClick={() => setOpen((prev) => !prev)}
          />

          {open && (
            <div className="emojiPickerWrapper">
              <EmojiPicker onEmojiClick={handleEmoji} />
            </div>
          )}
        </div>

        <button className="sendButton" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
}

export default Chat;
