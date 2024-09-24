import React, { useEffect, useState } from "react";
import Header from "../header";
import "./index.css";
import UserRoute from "../../functions/ProtectedRoute/UserProtecTedRoute";

const Index = ({ children, footer }) => {
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebarOnMainClick = () => {
    if (isSidebarOpen) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      // Get the visible viewport height
      setViewportHeight(window.innerHeight);
    };

    // Set the height on load
    handleResize();

    // Update height on window resize or orientation change
    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
    };
  }, []);
  return (
    <UserRoute>
      <div className="displaycenter">
        <div
          className="col-lg-4 col-md-6 col-sm-12 layoutcls layout-grid"
          style={{ height: `${viewportHeight}px` }}
        >
          <header>
            <Header
              arg={{ toggleSidebar, isSidebarOpen, closeSidebarOnMainClick }}
            />
          </header>
          <main onClick={closeSidebarOnMainClick}>{children}</main>
          <footer onClick={closeSidebarOnMainClick}>{footer}</footer>
        </div>
      </div>
    </UserRoute>
  );
};

export default Index;
