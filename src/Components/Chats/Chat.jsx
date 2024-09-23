import React, { useEffect, useRef, useState } from 'react';
import './Chat.css';
import EmojiPicker from 'emoji-picker-react';

function Chat() {
  const [open, setOpen] = useState(false);
  const [Text, setText] = useState("");

  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [Text]);
  
  
  

  const handleEmoji = (emojiObject, event) => {
    setText((prevText) => prevText + emojiObject.emoji); 
    setOpen(false); 
  };

  return (
    <div className='chat'>
      <div className="top">
        <div className="user">
          <img src="./avatar.png" alt="" />
          <div className="texts">
            <span>GT HAMZA</span>
            <p>Lorem ipsum dolor sit</p>
          </div>
        </div>
        <div className="icons">
          <img src="./phone.png" alt="" />
          <img src="./video.png" alt="" />
          <img src="./info.png" alt="" />
        </div>
      </div>
            
      
      <div className='center'>

       <div className="message">
        <img src="./avatar.png" alt="" />
        <div className="texts">
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel asperiores commodi harum 
            quisquam corporis et dolorum unde velit, deleniti ex ullam provident
             distinctio eligendi reprehenderit! Tempora voluptatibus et distinctio
           aut.</p>
           <span>1 min ago</span>
        </div>
       </div>

       <div className="message own">
        <div className="texts">
          <img src="https://images.pexels.com/photos/3048527/pexels-photo-3048527.png?auto=compress&cs=tinysrgb&w=600" alt="" />
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel asperiores commodi harum 
            quisquam corporis et dolorum unde velit, deleniti ex ullam provident
             distinctio eligendi reprehenderit! Tempora voluptatibus et distinctio
           aut.</p>
           <span>1 min ago</span>
        </div>
       </div>

       <div className="message">
        <img src="./avatar.png" alt="" />
        <div className="texts">
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel asperiores commodi harum 
            quisquam corporis et dolorum unde velit, deleniti ex ullam provident
             distinctio eligendi reprehenderit! Tempora voluptatibus et distinctio
           aut.</p>
           <span>1 min ago</span>
        </div>
       </div>

       <div className="message own">
        <div className="texts">
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel asperiores commodi harum 
            quisquam corporis et dolorum unde velit, deleniti ex ullam provident
             distinctio eligendi reprehenderit! Tempora voluptatibus et distinctio
           aut.</p>
           <span>1 min ago</span>
        </div>
       </div>
             <div ref={endRef}></div>
      </div>
     


      <div className="bottom">
        <div className="icons">
          <img src="./img.png" alt="" />
          <img src="./camera.png" alt="" />
          <img src="./mic.png" alt="" />
        </div>
        
        <input 
          type="text" 
          placeholder='Type a message...' 
          value={Text}
          onChange={e => setText(e.target.value)} 
        />
        
        <div className="emoji">
          <img 
            src="/emoji.png" 
            alt="Emoji Picker" 
            onClick={() => setOpen(prev => !prev)} 
          />
          
          {open && (
            <div className="emojiPickerWrapper">
              <EmojiPicker onEmojiClick={handleEmoji} />
            </div>
          )}
        </div>

        <button className='sendButton'>Send</button>
      </div>
    </div>
  );
}

export default Chat;
