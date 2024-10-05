import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY, // Use environment variables to keep sensitive data secure
  authDomain: "chat-app-34e9d.firebaseapp.com",
  projectId: "chat-app-34e9d",
  storageBucket: "chat-app-34e9d.appspot.com",
  messagingSenderId: "1009626384986",
  appId: "1:1009626384986:web:de75151770981f4a212663",
  measurementId: "G-T6K0BXWG6J",
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app); // Firebase Authentication
export const db = getFirestore(app); // Firestore Database
export const storage = getStorage(app); // Firebase Storage
