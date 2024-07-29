import React, { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import Sidebar from "../sidebar";

const Index = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <div style={{ borderBottom: "1px solid #474747" }}>
      <div className="d-flex align-items-center p-3">
        <RxHamburgerMenu
          style={{ fontSize: "26px", cursor: "pointer" }}
          onClick={toggleSidebar}
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
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
    </div>
  );
};

export default Index;
