import React, { useEffect } from "react";
import "./App.css";
import List from "./Components/List/List";
import Details from "./Components/Details/Details";
import Chat from "./Components/Chats/Chat";
import Login from "./Components/Login/Login";
import Notification from "./Components/Notification/Notification";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./lib/firebase";
import useUserStore from "./lib/userStore";
import useChatStore from "./lib/chatStore";

function App() {
  const { currentUser, isLoading, fetchUserInfo } = useUserStore();
  const { chatId } = useChatStore(); // Get chatId from the store

  // Fetch user info on auth state change
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchUserInfo(user?.uid);
      } else {
        fetchUserInfo(null);
      }
    });

    return () => {
      unsub();
    };
  }, [fetchUserInfo]);

  if (isLoading) return <div className="loading">Loading...</div>;

  return (
    <div className="container">
      {currentUser ? (
        <>
          <List />
          {chatId && <Chat />} {/* Only render Chat when a chatId exists */}
          {chatId && <Details />} {/* Only render Details when a chatId exists */}
        </>
      ) : (
        <Login />
      )}
      <Notification />
    </div>
  );
}

export default App;
