import React from "react";
import Header from "../header";
import "./index.css";
import UserRoute from "../../functions/ProtectedRoute/UserProtecTedRoute";

const Index = ({ children, footer }) => {
  return (
    <UserRoute>
      <div className="displaycenter">
        <div className="col-lg-4 col-md-6 col-sm-12 layoutcls layout-grid">
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
