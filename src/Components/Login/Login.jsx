import React, { useState } from 'react';
import './Login.css';
import { toast } from 'react-toastify';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../lib/firebase';
import { doc, setDoc } from 'firebase/firestore';
import upload from '../../lib/upload';  // Importing upload function for file upload

function Login() {
  const [avatar, setAvatar] = useState({
    file: null,
    URL: ''
  });

  const handleAvatar = (e) => {
    if (e.target.files[0]) {
      setAvatar({
        file: e.target.files[0],
        URL: window.URL.createObjectURL(e.target.files[0])
      });
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const username = formData.get('username');
    const email = formData.get('email');
    const password = formData.get('password');

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);  // Create a new user
      const userId = res.user.uid;

      let imgUrl = '';
      if (avatar.file) {
        imgUrl = await upload(avatar.file);  // Upload avatar if provided
      }

      // Save user information to Firestore
      await setDoc(doc(db, 'users', userId), {
        username,
        email,
        id: userId,
        avatar: imgUrl,  // Save the uploaded avatar URL
        blocked: []
      });

      // Initialize user's chat data
      await setDoc(doc(db, 'userchats', userId), {
        chats: []
      });

      toast.success('Account created! You can now log in.');
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');

    try {
      await signInWithEmailAndPassword(auth, email, password);  // Handle user login
      toast.success('Logged in successfully!');
    } catch (err) {
      console.error(err);
      toast.error('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className='login'>
      <div className='item'>
        <h2>Welcome back</h2>
        <form onSubmit={handleLogin}>
          <input type='text' placeholder='email' name='email' />
          <input type='password' name='password' placeholder='password' />
          <button>Login</button>
        </form>
      </div>
      <div className='separator'></div>
      <div className='item'>
        <h2>SIGN UP</h2>
        <form onSubmit={handleRegister}>
          <img src={avatar.URL || './avatar.png'} alt='avatar' />
          <label htmlFor='file'>Upload a file</label>
          <input
            type='file'
            id='file'
            name='avatar'
            style={{ display: 'none' }}
            onChange={handleAvatar}
          />
          <input type='text' placeholder='username' name='username' />
          <input type='text' placeholder='email' name='email' />
          <input type='password' name='password' placeholder='password' />
          <button>Sign UP</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
