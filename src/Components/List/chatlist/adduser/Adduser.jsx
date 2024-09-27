import React from 'react'
import './adduser.css'

function Adduser() {
  return (
    <div className='adduser'>

   <form>
    <input type="text" placeholder='Username' name='username'/>
    <button>Search</button>
   </form>
         <div className="user">
          <div className="details">
          <img src="./avatar.png" alt="" />
          <span>Gt hamza</span>
          </div>
          <button>ADD USERS</button>
         </div>
    </div>
  )
}

export default Adduser