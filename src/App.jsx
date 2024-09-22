import React from 'react';
import './App.css';
import List from './Components/List/List';
import Details from './Components/Details/Details';
import Chat from './Components/Chats/Chat';

function App() {
  return(
    <>
      <div className="container">
       <List></List>
       <Chat></Chat>
       <Details></Details>
      </div>
    </>
  )
}

export default App
