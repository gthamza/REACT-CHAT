import React from "react";
import "./userinfo.css";
import useUserStore from "../../../lib/userStore";

function Userinfo() {
  const { currentUser } = useUserStore();

  if (!currentUser) return <div>Loading...</div>;

  return (
    <div className="userinfo">
      <div className="user">
        <img src={currentUser.avatar || "./avatar.png"} alt="User Avatar" />
        <h2>{currentUser.username}</h2>
      </div>
      <div className="icons">
        <img src="./more.png" alt="More options" />
        <img src="./video.png" alt="Start video" />
        <img src="./edit.png" alt="Edit profile" />
      </div>
    </div>
  );
}

export default Userinfo;
