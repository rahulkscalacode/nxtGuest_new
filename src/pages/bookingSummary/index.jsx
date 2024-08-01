import React from "react";
import Layout2 from "../../components/layout2";
import "./index.css";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/payment");
  };
  const json = {
    Name: "K Dewangan",
    Email: "lokeshd@scalacoders.com",
    "Contact Number": "0123456789",
    "Pickup Location": "Noida Sector 62",
    "Drop Location": "Noida Sector 148",
    Date: "06/20/2024",
    "Pickup Time": "15:00 PM",
    Fare: "$400.00",
  };
  return (
    <Layout2>
      <div>
        <div className="head">Booking Summary</div>
        {Object.keys(json).map((keys) => (
          <div className="inputcss mt-2">
            <div>{keys}</div>
            <div>{json[keys]}</div>
          </div>
        ))}
      </div>
      <div className="displayContent">
        <div className="btncss">
          <button className="editBook">Edit My Booking</button>
          <button className="proceedPay" onClick={handleClick}>
            Proceed to Pay
          </button>
        </div>
      </div>
    </Layout2>
  );
};

export default Index;
