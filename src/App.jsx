import React, { useState } from 'react';
import './App.css';
import List from './Components/List/List';
import Details from './Components/Details/Details';
import Chat from './Components/Chats/Chat';
import './Components/Login/Login'
import Login from './Components/Login/Login';
import Notification from './Components/Notification/Notification';
function App() {

  const user =(true);
  return(
    <>
      <div className="container">
        {user ? (
          <>
           <List></List>
       <Chat></Chat>
       <Details></Details>
          </>
        ) :
        (
          <Login></Login>
        )}
       <Notification></Notification>
      </div>
    </>
  )
}

export default App
