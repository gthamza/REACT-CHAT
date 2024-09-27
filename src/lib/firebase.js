import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; 
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "chat-app-34e9d.firebaseapp.com",
  projectId: "chat-app-34e9d",
  storageBucket: "chat-app-34e9d.appspot.com",
  messagingSenderId: "1009626384986",
  appId: "1:1009626384986:web:de75151770981f4a212663",
  measurementId: "G-T6K0BXWG6J"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);  // for authentication
export const db = getFirestore(app); // for cloud storage
export const storage = getStorage(app); // for image and message storage
