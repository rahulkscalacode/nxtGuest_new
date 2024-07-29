import React from "react";
import Header from "../header";
import Footer from "../footer";
import "./index.css";

const Index = ({ children, footer }) => {
  return (
    <div className="displaycenter">
      <div className="col-lg-4 col-md-6 col-sm-12 layoutcls layout-grid">
        <header>
          <Header />
        </header>
        <main>{children}</main>
        <footer>{footer}</footer>
      </div>
    </div>
  );
};

export default Index;
