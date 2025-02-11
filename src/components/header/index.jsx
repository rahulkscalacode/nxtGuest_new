import React, { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import Sidebar from "../sidebar";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";

const Index = ({
  arg: { toggleSidebar, isSidebarOpen, closeSidebarOnMainClick },
}) => {
  const cookies = new Cookies();
  const tokenC = cookies.get("token");
  return (
    <div style={{ borderBottom: "1px solid #474747" }}>
      <div
        className="d-flex align-items-center justify-content-center p-3 position-relative"
        onClick={closeSidebarOnMainClick}
      >
        <RxHamburgerMenu
          style={{
            fontSize: "26px",
            cursor: "pointer",
            position: "absolute",
            left: "25px",
          }}
          onClick={toggleSidebar}
        />
        <Link to={tokenC ? "/dashboard" : "/"}>
          <img
            src="/images/asset/logo1.png"
            alt="Logo"
            style={{
              display: "flex",
              margin: "auto",
              width: "89px",
              height: "67px",
            }}
          />
        </Link>
      </div>
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
    </div>
  );
};

export default Index;
