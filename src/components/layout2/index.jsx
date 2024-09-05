import React from "react";
import Header3 from "../header/header3";
import Footer from "../footer";
import "../layout/index.css";
import UserRoute from "../../functions/ProtectedRoute/UserProtecTedRoute";

const Index = ({ children }) => {
  return (
    // <UserRoute>
    <div className="displaycenter ">
      <div className=" col-lg-4 col-md-6 col-sm-12 layoutcls layout-grid">
        <header>
          <Header3 />
        </header>
        <main>{children}</main>
        {/* <footer>
          <Footer />
        </footer> */}
      </div>
    </div>
    // </UserRoute>
  );
};

export default Index;
