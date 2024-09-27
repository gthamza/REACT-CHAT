import React, { useState } from 'react';
import './App.css';
import List from './Components/List/List';
import Details from './Components/Details/Details';
import Chat from './Components/Chats/Chat';
import Login from './Components/Login/Login';  // Removed the unused import
import Notification from './Components/Notification/Notification';

function App() {
  const [user, setUser] = useState(false); // Used state to manage user

  return(
    <>
      <div className="container">
        {user ? (
          <>
            <List />
            <Chat />
            <Details />
          </>
        ) :
        (
          <Login />
        )}
        <Notification />
      </div>
    </>
  );
}

export default App;
