import React, { useState } from 'react';
import './Chat.css';
import EmojiPicker from 'emoji-picker-react';

function Chat() {
  const [open, setOpen] = useState(false);
  const [Text, setText] = useState("");

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
