import React, { useEffect, useState } from "react";
import Header from "../header";
import "./index.css";
import UserRoute from "../../functions/ProtectedRoute/UserProtecTedRoute";

const Index = ({ children, footer }) => {
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);

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
            <Header />
          </header>
          <main>{children}</main>
          <footer>{footer}</footer>
        </div>
      </div>
    </UserRoute>
  );
};

export default Index;
