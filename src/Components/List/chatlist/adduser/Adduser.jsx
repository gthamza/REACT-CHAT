import React, { useState } from 'react';
import './adduser.css';
import { collection, getDocs, query, serverTimestamp, setDoc, updateDoc, arrayUnion, doc, where } from "firebase/firestore"; // Add 'where' to the imports
import { db } from '../../../../lib/firebase';
import useUserStore from '../../../../lib/userStore';

function Adduser() {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");

  const currentUser = useUserStore((state) => state.currentUser); // Get the current logged-in user

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!username) return;

    try {
      const userRef = collection(db, "users");
      const q = query(userRef, where("username", "==", username)); // Make sure 'where' is available here
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        setUser(querySnapshot.docs[0].data());
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Error searching for user: ", error);
    }
  };

  const HandleAdduser = async () => {
    if (!user || !currentUser) {
      console.error("Missing user or currentUser information");
      return;
    }
  
    try {
      const chatRef = collection(db, "chats");
      const newChatRef = doc(chatRef);
      const userChatRef = doc(collection(db, "userchats"), newChatRef.id);
  
      await setDoc(userChatRef, {
        createdAt: serverTimestamp(),
        message: [],
      });
  
      await updateDoc(doc(db, "userchats", user.id), {
        chats: arrayUnion({
          chatID: newChatRef.id,
          lastMessage: "",
          receiverID: currentUser.id,
          updatedAt: new Date(),
        }),
      });
  
      await updateDoc(doc(db, "userchats", currentUser.id), {
        chats: arrayUnion({
          chatID: newChatRef.id,
          lastMessage: "",
          receiverID: user.id,
          updatedAt: new Date(),
        }),
      });
  
      console.log("Chat created with ID:", newChatRef.id);
  
      // Force re-render (optional)
      setUsername(''); // Resetting state can help trigger a re-render in some cases.
  
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };
  
   console.log(user)
  return (
    <div className='adduser'>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder='Username'
          name='username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button>Search</button>
      </form>

      {user && (
  <div className="user">
    <div className="details">
      <img src={user.avatar || "./avatar.png"} alt="User Avatar" />
      <span>{user.username || "hamza"}</span>
    </div>
    <button onClick={HandleAdduser}>ADD USER</button>
  </div>
)}

    </div>
  );
}

export default Adduser;
