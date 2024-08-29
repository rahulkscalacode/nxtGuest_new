import React, { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import Sidebar from "../sidebar";
import { Link } from "react-router-dom";

const Header2 = () => {
  return (
    <div style={{ borderBottom: "1px solid #474747", display: "flex" }}>
      <div
        className="d-flex align-items-center p-3"
        style={{ position: "absolute", left: "0", top: "1.2rem" }}
      >
        <img
          src="/images/icons/ArrowLeft.png"
          alt="Logo"
          style={{
            width: "32px",
            height: " 32px",
          }}
        />
      </div>
      <div className="d-flex p-3" style={{ margin: "auto" }}>
        <Link to="/">
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
    </div>
  );
};

export default Header2;
