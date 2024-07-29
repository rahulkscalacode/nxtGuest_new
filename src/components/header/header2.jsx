import React, { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import Sidebar from "../sidebar";

const Header2 = () => {
  return (
    <div style={{ borderBottom: "1px solid #474747" }}>
      <div className="d-flex align-items-center p-3">
        <img
          src="/images/icons/ArrowLeft.png"
          alt="Logo"
          style={{
            width: "32px",
            height: " 32px",
          }}
        />
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
      </div>
    </div>
  );
};

export default Header2;
