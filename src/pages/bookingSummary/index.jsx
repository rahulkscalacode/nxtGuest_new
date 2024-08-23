import React from "react";
import Layout2 from "../../components/layout2";
import "./index.css";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { data } = location.state || {};

  // Check if data is defined and has the expected structure
  const nData = data?.data?.data || {};

  const handleClick = () => {
    navigate("/payment");
  };

  const json = {
    Name: `${nData.firstName || ""} ${nData.lastName || ""}`,
    Email: nData.email || "",
    "Contact Number": nData.contactNumber || "",
    "Pickup Location": nData.pickupLocation || "",
    "Drop Location": nData.dropLocation || "",
    Date: nData.dateOfRide || "",
    "Pickup Time": nData.time || "",
    Fare: "$400.00",
  };

  return (
    <Layout2>
      <div>
        <div className="head">Booking Summary</div>
        {Object.keys(json).map((keys) => (
          <div key={keys} className="inputcss mt-2">
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
