import React from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/login");
  };
  return (
    <div className="displaycenter">
      <div className=" col-lg-4 col-md-6 col-sm-12 layoutcls">
        <div className="splash-container">
          <div>
            <img
              src="/images/asset/logo1.png"
              alt="NXTGUEST"
              className="logo"
            />
          </div>
          <div style={{ zIndex: 99 }}>
            <h1 className="title1">
              NXTGUEST
              <div className="subtitle">
                offering luxury <div>transportation services</div>
              </div>
            </h1>
            <p className="description">
              Your booking transportation experience starts here!
            </p>
          </div>
          <div style={{ zIndex: "99" }} onClick={handleClick}>
            <button className="get-started-btn">
              Get Started{" "}
              <span className="arrow">
                <img src="/images/icons/ArrowRight.png" alt="NXTGUEST" />
              </span>
            </button>
          </div>
          <div className="footer-image1" style={{ zIndex: "1" }}></div>
        </div>
      </div>
    </div>
  );
};

export default Index;
