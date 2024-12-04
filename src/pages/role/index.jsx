import React, { useState } from "react";
import Layout1 from "../../components/layout1";
import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  const [selectedCard, setSelectedCard] = useState(null);
  const location = useLocation();
  const { data } = location.state || {};

  const handleCardClick = (route, data) => {
    navigate(`/${route}`, { state: {routeData : data} });
  };

  const handleContinueClick = () => {
    if (selectedCard === "fromAirport") {
      navigate("/self-request");
    } else if (selectedCard === "toAirport") {
      navigate("/other-request");
    }
  };

  // console.log("location=>", data, location);
  return (
    <Layout1>
      <div>
        <div className="cards-container">
          {/* <Link to="/self-request"> */}
          <div
            className="imgcard"
            style={{
              background: selectedCard === "fromAirport" ? "white" : "#414141",
              color: selectedCard === "fromAirport" ? "black" : "white",
              borderRadius: "10px",
              height: "10rem",
              cursor: "pointer",
            }}
            onClick={() => handleCardClick("self-request", data)}
          >
            <img
              src="/images/icons/self.png"
              alt="From Airport"
              style={{ width: "130px", height: "130px" }}
            />
            <p className="card-text">Book for Self</p>
          </div>
          {/* </Link> */}
          {/* <Link to="/"> */}
          <div
            className="imgcard"
            style={{
              background: selectedCard === "toAirport" ? "white" : "#414141",
              color: selectedCard === "toAirport" ? "black" : "white",
              borderRadius: "10px",
              height: "10rem",
              cursor: "pointer",
            }}
            onClick={() => handleCardClick("other-request", data)}
          >
            <img
              src="/images/icons/group.png"
              alt="To Airport"
              style={{ width: "130px", height: "130px" }}
            />
            <p className="card-text">Book for Other</p>
          </div>
          {/* </Link> */}
        </div>

        {/* <div
          className="callbtn"
          style={{ zIndex: "99", width: "90%", left: "5%", cursor: "pointer" }}
          onClick={handleContinueClick}
        >
          Continue
        </div> */}
        <div className="footer-image" style={{ zIndex: "1" }}></div>
      </div>
    </Layout1>
  );
};

export default Index;
