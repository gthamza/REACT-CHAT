import React, { useEffect, useState } from 'react';
import './chatlist.css';
import Adduser from './adduser/Adduser';
import useUserStore from '../../../lib/userStore';
import { doc, onSnapshot, getDoc } from "firebase/firestore";
import { db } from '../../../lib/firebase'; // Import Firebase instance

function Chatlist() {
  const [addModel, setAddModel] = useState(false); // State to toggle Adduser modal
  const [chats, setChats] = useState([]); // State to store chat data

  const { currentUser } = useUserStore(); // Get the current user from the user store

  // useEffect to fetch chat data whenever the currentUser changes
  useEffect(() => {
    if (!currentUser?.id) return; // Exit if no current user ID

    const unsub = onSnapshot(doc(db, "userchats", currentUser.id), async (chatDoc) => {
      if (chatDoc.exists()) {
        let items = chatDoc.data().chats;

        // Check if chats exist and are valid
        if (!items) {
          console.error("No chats found.");
          return;
        }

        if (!Array.isArray(items)) {
          items = Object.values(items); // Convert to array if not already
        }

        const promises = items.map(async (item) => {
          if (!item || !item.receiverID) {
            return null; // Skip invalid items
          }

          try {
            const userDocRef = doc(db, "users", item.receiverID); // Reference to the user's Firestore document
            const userDocSnap = await getDoc(userDocRef); // Get the user's document

            if (!userDocSnap.exists()) {
              console.warn(`User document not found for ID: ${item.receiverID}`);
              return null;
            }

            const user = userDocSnap.data(); // Fetch user data
            return { ...item, user };

          } catch (error) {
            console.error(`Error fetching user data for ${item.receiverID}:`, error);
            return null;
          }
        });

        const chatData = await Promise.all(promises);

        // Filter out any null results and sort the chat list by the latest update
        setChats(chatData.filter(chat => chat !== null).sort((a, b) => b.updatedAt - a.updatedAt));
      } else {
        console.error("No document found for the current user.");
      }
    });

    return () => {
      unsub(); // Cleanup the onSnapshot listener when component unmounts
    };
  }, [currentUser?.id]);

  console.log(chats); // Log the fetched chats for debugging

  return (
    <div className='Chatlist'>
      <div className="search">
        <div className="searchbar">
          <img src="/search.png" alt="Search" />
          <input type="text" placeholder='Search' />
        </div>
        <img
          src={addModel ? "./minus.png" : "./plus.png"}
          alt="Add/Remove"
          className='add' 
          onClick={() => setAddModel((prev) => !prev)} // Toggle the Adduser modal
        />
      </div>
      {chats.map((chat, index) => (
  <div key={index} className="item">
    <img src={chat.user?.avatar || "./avatar.png"} alt="Chat Avatar" />
    <div className="texts">
      {/* <span>{chat.user?.name || 'Hamza'}</span>  Check here */}
             <span>{chat.user?.username|| 'Hamza'}</span>
      <p>{chat.lastMessage || 'No messages yet'}</p>
    </div>
  </div>
))}


      {addModel && <Adduser />} {/* Conditionally render Adduser component if addModel is true */}
    </div>
  );
}

export default Chatlist;
