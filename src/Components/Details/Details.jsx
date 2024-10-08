import React from "react";
import "./Details.css";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../lib/firebase";
import useUserStore from "../../lib/userStore";
import useChatStore from "../../lib/chatStore";
import { arrayRemove, arrayUnion, updateDoc } from "firebase/firestore";

function Details() {

  const {currentUser} = useUserStore()
  const {chatId,user,isCurrentBlocked,isReceiverBlocked,changeBlock} = useChatStore()

  const handleBlockUser = async() =>{
    if(!user) return;

    const userDocRef = doc(db,"users" ,currentUser.id);

    try {
      await updateDoc(userDocRef,{
        blocked : isReceiverBlocked ? arrayRemove(user.id) : arrayUnion(user.id)
      })
      changeBlock()
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="details">
      <div className="user">
        <img src={user?.avatar || "./avatar.png"} alt="" />
        <h2>{user?.username}</h2>
        <p>Lorem ipsum dolor</p>
      </div>

      <div className="info">
        <div className="option">
          <div className="title">
            <span>Chat Setting</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>

        <div className="option">
          <div className="title">
            <span>Privacy & help</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>

        <div className="option">
          <div className="title">
            <span>Shared Photos</span>
            <img src="./arrowDown.png" alt="" />
          </div>

          <div className="photos">
            <div className="photoitem">
              <div className="photo-details">
                <img
                  src="https://images.pexels.com/photos/12670543/pexels-photo-12670543.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt=""
                />
                <span>photos_2024_2.png</span>
              </div>
              <img src="./download.png" alt="" />
            </div>

            <div className="photoitem">
              <div className="photo-details">
                <img
                  src="https://images.pexels.com/photos/12670543/pexels-photo-12670543.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt=""
                />
                <span>photos_2024_2.png</span>
              </div>
              <img src="./download.png" alt="" />
            </div>

            <div className="photoitem">
              <div className="photo-details">
                <img
                  src="https://images.pexels.com/photos/12670543/pexels-photo-12670543.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt=""
                />
                <span>photos_2024_2.png</span>
              </div>
              <img src="./download.png" alt="" />
            </div>

            <div className="photoitem">
              <div className="photo-details">
                <img
                  src="https://images.pexels.com/photos/12670543/pexels-photo-12670543.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt=""
                />
                <span>photos_2024_2.png</span>
              </div>
              <img src="./download.png" alt="" />
            </div>
          </div>
        </div>

        <div className="option">
          <div className="title">
            <span>Shared Files</span>
            <img src="./arrowDown.png" alt="" />
          </div>
          <center>
          </center>
          <center>
            <button className="logout" onClick={() => auth.signOut()}>
              LOGOUT
            </button>
          </center>
        </div>
      </div>
    </div>
  );
}

export default Details;
