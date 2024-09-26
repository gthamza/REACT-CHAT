import React, { useState } from 'react';
import './Login.css';
import { toast } from 'react-toastify';

function Login() {
   const [avatar, setavatar] = useState({
     file: null,
     URL: ""
   });

   const handleAvatar = (e) => {
     if (e.target.files[0]) {
       setavatar({
         file: e.target.files[0],
         URL: window.URL.createObjectURL(e.target.files[0])
       });
     }
   };
     
   const handleLogin = async e =>{
       e.preventDefault()
      
   }



   return (
     <div className='login'>
       <div className="item">
         <h2>Welcome back</h2>
         <form onSubmit={handleLogin}>
           <input type="text" placeholder='email' name='email' />
           <input type="password" name="password" placeholder='password' />
           <button>Sign in</button>
         </form>
       </div>
       <div className="separator"></div>
       <div className="item">
         <h2>SIGN UP</h2>
         <form>
           <img src={avatar.URL || "./avatar.png"} alt="avatar" />
           <label htmlFor="file">Upload a file</label>
           <input type="file" id='file' style={{ display: "none" }} onChange={handleAvatar} />
           <input type="text" placeholder='username' name='username' />
           <input type="text" placeholder='email' name='email' />
           <input type="password" name="password" placeholder='password' />
           <button>Sign UP</button>
         </form>
       </div>
     </div>
   );
}

export default Login;
