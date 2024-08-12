import React from "react";
import Header2 from "../header/header2";
import "../layout/index.css";
import UserRoute from "../../functions/ProtectedRoute/UserProtecTedRoute";

const Index = ({ children, footer }) => {
  return (
    <UserRoute>
      <div className="displaycenter">
        <div className=" col-lg-4 col-md-6 col-sm-12 layoutcls layout-grid">
          <header>
            <Header2 />
          </header>
          <main>{children}</main>
          <footer>{footer}</footer>
        </div>
      </div>
    </UserRoute>
  );
};

export default Index;
