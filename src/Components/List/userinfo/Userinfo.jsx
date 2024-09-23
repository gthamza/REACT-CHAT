import React from 'react';
import './userinfo.css';


function userinfo() {
  return (
    <div className='userinfo'>
      <div className="user">
        <img src="./avatar.png" alt="" />
        <h2>Gt hamza</h2>
      </div>
      <div className="icons">
        <img src="./more.png" alt="" />
        <img src="./video.png" alt="" />
        <img src="./edit.png" alt="" />
      </div>
    </div>
  )
}

export default userinfo