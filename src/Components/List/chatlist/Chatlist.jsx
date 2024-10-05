import { useEffect, useState } from 'react';
import './chatlist.css';
import Adduser from './adduser/Adduser';
import useUserStore from '../../../lib/userStore';
import useChatStore from '../../../lib/chatStore'; // Import useChatStore here
import { doc, onSnapshot, getDoc, updateDoc } from "firebase/firestore";
import { db } from '../../../lib/firebase';

function Chatlist() {
  const [addModel, setAddModel] = useState(false); // State to toggle Adduser modal
  const [chats, setChats] = useState([]); // State to store chat data
  const [input, setInput] = useState(""); // State for search input
  const { currentUser } = useUserStore();
  const { chatId, changeChat } = useChatStore();
  
  // Fetch chat data for the current user
  useEffect(() => {
    if (!currentUser?.id) return; 

    const unsub = onSnapshot(doc(db, "userchats", currentUser.id), async (chatDoc) => {
      if (chatDoc.exists()) {
        let items = chatDoc.data().chats;

        if (!items) {
          console.error("No chats found.");
          return;
        }

        if (!Array.isArray(items)) {
          items = Object.values(items);
        }

        const promises = items.map(async (item) => {
          if (!item || !item.receiverID) {
            return null;
          }

          try {
            const userDocRef = doc(db, "users", item.receiverID);
            const userDocSnap = await getDoc(userDocRef);

            if (!userDocSnap.exists()) {
              console.warn(`User document not found for ID: ${item.receiverID}`);
              return null;
            }

            const user = userDocSnap.data();
            return { ...item, user };
          } catch (error) {
            console.error(`Error fetching user data for ${item.receiverID}:`, error);
            return null;
          }
        });

        const chatData = await Promise.all(promises);
        setChats(chatData.filter(chat => chat !== null).sort((a, b) => b.updatedAt - a.updatedAt));
      } else {
        console.error("No document found for the current user.");
      }
    });

    return () => {
      unsub();
    };
  }, [currentUser?.id]);

  const handleSelect = async (chat) => {
    // Create a shallow copy of the current user's chats
    const userChats = chats.map((item) => {
      const { user, ...rest } = item; // Remove the `user` object as it's not part of the actual chat structure
      return rest;
    });

    // Find the index of the selected chat
    const chatIndex = userChats.findIndex((item) => item.chatID === chat.chatID);

    if (chatIndex === -1) {
      console.error("Chat not found");
      return;
    }

    // Mark the chat as seen
    userChats[chatIndex].isSeen = true;

    const usersChatRef = doc(db, "userchats", currentUser.id);

    try {
      // Update Firestore with the modified chat data
      await updateDoc(usersChatRef, {
        chats: userChats,
      });

      // Change the active chat in the store
      changeChat(chat.chatID, chat.user);
    } catch (error) {
      console.error("Error updating isSeen:", error);
    }
  };

  // Filter chats based on the search input
  const filteredChats = chats.filter((chat) => {
    return chat.user?.username.toLowerCase().includes(input.toLowerCase());
  });

  return (
    <div className='Chatlist'>
      <div className="search">
        <div className="searchbar">
          <img src="/search.png" alt="Search" />
          <input
            type="text"
            placeholder='Search'
            value={input}
            onChange={(e) => setInput(e.target.value)} // Update input state with search text
          />
        </div>
        <img
          src={addModel ? "./minus.png" : "./plus.png"}
          alt="Add/Remove"
          className='add' 
          onClick={() => setAddModel((prev) => !prev)}
        />
      </div>

      {filteredChats.map((chat, index) => (
        <div
          key={index}
          className="item"
          onClick={() => handleSelect(chat)}
          style={{
            backgroundColor: chat?.isSeen ? "transparent" : "#5183fe",
          }}
        >
          <img src={chat.user?.avatar || "./avatar.png"} alt="Chat Avatar" />
          <div className="texts">
            <span>{chat.user?.username || 'Hamza'}</span>
            <p>{chat?.text || 'No messages yet'}</p>
          </div>
        </div>
      ))}

      {addModel && <Adduser />}
    </div>
  );
}

export default Chatlist;
