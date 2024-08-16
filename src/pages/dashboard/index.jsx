import React from "react";
import Layout from "../../components/layout";
import "../login/index.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/role");
  };

  return (
    <Layout>
      <div className="d-container">
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
          onClick={() => (window.location.href = "tel:9602228608")}
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
