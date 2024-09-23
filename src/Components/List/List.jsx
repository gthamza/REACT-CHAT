import React from 'react';
import './List.css'
import './chatlist/Chatlist';
import Chatlist from './chatlist/Chatlist';
import Userinfo from './userinfo/Userinfo'
function List() {
  return (
    <div className='list'>
      <Userinfo></Userinfo>
      <Chatlist></Chatlist> 
    </div>
  )
}

export default List