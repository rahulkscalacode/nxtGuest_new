import React from "react";
import Layout2 from "../../components/layout1";
import Footer from "../../components/footer";
import { useLocation } from "react-router-dom";
import moment from "moment"

const BookingDetails = () => {
  const location = useLocation();
  const { state } = location || {};
  console.log("state",state._id);

  const json = {
    "Pickup Location": "Noida Sector 62",
    "Drop Location": "Noida Sector 63",
    "Date of Booking": "30th May 2024",
    "Date of Ride": "22th May 2024",
    Time: moment(state.time, "HH:mm").format("hh:mm A"),
    "Car Model Name": "Cadillac Escalade",
    "Car Number": "UP 16 BC 8765",
    "Driver Name": "Brian Lara",
    "Payment Mode": "Stripe",
    "Card Number": "************1234",
    "Transaction ID": "123456789098",
    Fare: state?.status === "Booked" ? "Pending" : "$400.00",
    "Vehicle Type": state.vehicleType ? state.vehicleType : "N/A",
  };
  return (
    <Layout2 footer={<Footer />}>
      <div>
        <div className="head">Booking Details</div>
        {Object.keys(json).map((key) => (
          <div className="inputcss mt-2" key={key}>
            <div>{key}</div>
            <div
              style={{
                color:
                  key === "Fare" && json[key] === "Pending"
                    ? "#FFB802"
                    : "inherit",
              }}
            >
              {json[key]}
            </div>
          </div>
        ))}
      </div>
      {state?.status === "Approved" && (
        <div className="displayContent">
          <div className="d-flex justify-content-center">
            <button className="proceedPay" style={{ width: "12rem" }}>
              Proceed to Pay
            </button>
          </div>
        </div>
      )}
    </Layout2>
  );
};

export default BookingDetails;
