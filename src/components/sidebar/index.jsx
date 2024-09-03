import React from "react";
import "./index.css";
import { TfiClose } from "react-icons/tfi";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { toast } from "react-toastify";

const Sidebar = ({ isOpen, toggleSidebar }) => {

  const navigate = useNavigate();
  const cookies = new Cookies();

  const handleLogout = () => {
    cookies.remove("userId");
    cookies.remove("name");
    cookies.remove("refreshToken");
    cookies.remove("token");
    cookies.remove("userName");

    navigate("/login");
    toast.success("Logged out successfully");
  };

  
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
        <Link to="/dashboard">
          <div className="menu-item">
            <img src="/images/icons/UserCircleGear.png" alt="" /> Dashboard
          </div>
        </Link>
        <Link to="/profile">
          <div className="menu-item">
            <img src="/images/icons/UserCircle.png" alt="" />
            My Profile
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
        <div className="menu-item" onClick={handleLogout}>
          <img src="/images/icons/SignOut.png" alt="" /> Logout
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
