import React from "react";
import "./index.css";
import { TfiClose } from "react-icons/tfi";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div className={`sidebar ${isOpen ? "" : "close"}`}>
      <div className="sidebar-header">
        <img src="/images/asset/logo1.png" alt="NXTGUEST" />
        <button className="close-btn" onClick={toggleSidebar}>
          <TfiClose />
        </button>
      </div>
      <div className="sidebar-menu">
        <div className="menu-item">
          <img src="/images/icons/UserCircle.png" alt="" />
          My Profile
        </div>
        <div className="menu-item">
          <img src="/images/icons/UserCircleGear.png" alt="" /> Service Request
          Form
        </div>
        <div className="menu-item">
          <img src="/images/icons/Car.png" alt="" /> Booking History
        </div>
        <div className="menu-item">
          <img src="/images/icons/call.png" alt="" /> Contact Us
        </div>
        <div className="menu-item">
          <img src="/images/icons/Question.png" alt="" /> About Us
        </div>
        <div className="menu-item">
          <img src="/images/icons/ChatText.png" alt="" /> Feedback
        </div>
        <div className="menu-item">
          <img src="/images/icons/SignOut.png" alt="" /> Logout
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
