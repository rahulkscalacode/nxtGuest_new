import React, { useEffect, useState } from "react";
import Layout from "../../components/layout";
import "../login/index.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/role");
  };
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
    <Layout>
      <div className="d-container" style={{ height: `${viewportHeight}px` }}>
        <div class="cards-container">
          <div className="imgcard" onClick={handleClick}>
            <img
              src="/images/icons/F8.png"
              alt="From Airport"
              className="card-img"
            />
            <p className="card-text">From Airport</p>
          </div>
          <div className="imgcard" onClick={handleClick}>
            <img
              src="/images/icons/F9.png"
              alt="From Airport"
              className="card-img"
            />
            <p className="card-text">To Airport</p>
          </div>
          <Link to="/group-request">
            <div className="imgcard" onClick={handleClick}>
              <img
                src="/images/icons/F10.png"
                alt="From Airport"
                className="card-img"
              />
              <p className="card-text" style={{ color: "white" }}>
                Around City
              </p>
            </div>
          </Link>
          <div className="imgcard" onClick={handleClick}>
            <img
              src="/images/icons/F11.png"
              alt="From Airport"
              className="card-img"
            />
            <p className="card-text">Valet Ride</p>
          </div>
        </div>
        <div
          className="callbtn"
          style={{ zIndex: "99", width: "16rem", cursor: "pointer" }}
          onClick={() => (window.location.href = "tel:+1 (305) 928-2433")}
        >
          Call Now{" "}
          <span>
            <img src="/images/icons/PhoneCall.png" alt="" />
          </span>
        </div>
        <div className="footer-image" style={{ zIndex: "1" }}></div>
      </div>
    </Layout>
  );
};

export default Index;
