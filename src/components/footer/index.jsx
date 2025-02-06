import React from "react";
import "../layout/index.css";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="col-lg-4 col-md-6 col-sm-12 footercls">
      <Link to="/terms-conditions">
        <div style={{ color: "white" }}>Terms & Conditions</div>
      </Link>|
      <Link to="/privacy-policy">
        <div style={{ color: "white" }}>Privacy Policy</div>
      </Link>|
      <Link to="/about-us">
        <div style={{ color: "white" }}>About Us</div>
      </Link>
    </div>
  );
};

export default Index;
