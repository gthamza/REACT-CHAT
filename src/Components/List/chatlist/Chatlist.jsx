import React, { useState } from 'react'
import './chatlist.css';
import Adduser from './adduser/Adduser';


function Chatlist() {
        
    const [addModel,setaddModel] = useState(false);

  return (
    <div className='Chatlist'>
      <div className="search">
        <div className="searchbar">
          <img src="/search.png" alt="" />
          <input type="text" placeholder='search'/>
        </div>
        <img src={addModel ? "./minus.png" : "./plus.png"}
        alt=""
        className='add' 
        onClick={() => setaddModel((prev) =>!prev)}
          />
      </div>
      <div className="item">
        <img src="./avatar.png" alt="" />
        <div className="texts">
          <span>GT hamza</span>
          <p>hello</p>
        </div>
      </div>

      <div className="item">
        <img src="./avatar.png" alt="" />
        <div className="texts">
          <span>GT hamza</span>
          <p>hello</p>
        </div>
      </div>


      <div className="item">
        <img src="./avatar.png" alt="" />
        <div className="texts">
          <span>GT hamza</span>
          <p>hello</p>
        </div>
      </div>


      <div className="item">
        <img src="./avatar.png" alt="" />
        <div className="texts">
          <span>GT hamza</span>
          <p>hello</p>
        </div>
      </div>
      {addModel && <Adduser></Adduser>}
    </div>
  )
}

export default Chatlist;