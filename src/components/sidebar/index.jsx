import React from "react";
import "./index.css";
import { TfiClose } from "react-icons/tfi";
import { Link } from "react-router-dom";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div className={`sidebar ${isOpen ? "" : "close"}`}>
      <div className="sidebar-header">
        <Link to="/">
          <img src="/images/asset/logo1.png" alt="NXTGUEST" />
        </Link>
        <button className="close-btn" onClick={toggleSidebar}>
          <TfiClose />
        </button>
      </div>
      <div className="sidebar-menu">
        <Link to="/profile">
          <div className="menu-item">
            <img src="/images/icons/UserCircle.png" alt="" />
            My Profile
          </div>
        </Link>
        <Link to="/self-request">
          <div className="menu-item">
            <img src="/images/icons/UserCircleGear.png" alt="" /> Service
            Request Form
          </div>
        </Link>
        <Link to="/booking-history">
          <div className="menu-item">
            <img src="/images/icons/Car.png" alt="" /> Booking History
          </div>
        </Link>
        <Link to="/contactus">
          <div className="menu-item">
            <img src="/images/icons/call.png" alt="" /> Contact Us
          </div>
        </Link>
        <Link to="/aboutus">
          <div className="menu-item">
            <img src="/images/icons/Question.png" alt="" /> About Us
          </div>
        </Link>
        <Link to="/feedback">
          <div className="menu-item">
            <img src="/images/icons/ChatText.png" alt="" /> Feedback
          </div>
        </Link>
        <div className="menu-item">
          <img src="/images/icons/SignOut.png" alt="" /> Logout
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
