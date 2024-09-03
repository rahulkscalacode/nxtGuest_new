import React from "react";
import Layout2 from "../../components/layout2";
import "./index.css";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { timeFormatter } from "../../components/formatter/timeFormatter";
import moment from "moment";

const Index = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { data } = location.state || {};

  // Check if data is defined and has the expected structure
  const nData = data?.data?.data || {};

  const handleClick = () => {
    navigate("/payment");
  };

  const handleEditBooking = () => {
    const previousRoute = location.state?.previousRoute || "/self-request";
    navigate(previousRoute, { state: { data: nData } }); // This will navigate to the previous page
  };

  console.log(location);
  const json = {
    Name: `${nData.firstName || "N/A"} ${nData.lastName || ""}`,
    Email: nData.email || "N/A",
    "Contact Number": nData.contactNumber || "N/A",
    "Pickup Location": nData.pickupLocation || "N/A",
    "Drop Location": nData.dropLocation || "N/A",
    "Pickup Date": timeFormatter(nData.dateOfRide) || "N/A",
    "Pickup Time":
      moment(nData && nData.time, "HH:mm").format("hh:mm A") || "N/A",
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
          <button className="editBook" onClick={handleEditBooking}>
            Edit My Booking
          </button>
          <button className="proceedPay" onClick={handleClick}>
            Proceed to Pay
          </button>
        </div>
      </div>
    </Layout2>
  );
};

export default Index;
