import React, { useEffect, useState } from "react";
import Layout2 from "../../components/layout1";
import Footer from "../../components/footer";
import { useLocation } from "react-router-dom";
import moment from "moment";
import { bookingDetails } from "../../functions/api/booking";
import { timeFormatter } from "../../components/formatter/timeFormatter";
import { useSelector } from "react-redux";

const BookingDetails = () => {
  const location = useLocation();
  const { state } = location || {};
  const [details, setDetails] = useState({});
  const { stripe } = useSelector((state) => ({
    ...state,
  }));
  // console.log("state", state._id);

  const handleData = async () => {
    await bookingDetails(state?._id)
      .then((res) => {
        setDetails(res?.data?.bookingDetails);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    handleData();
  }, [state?._id]);

  console.log(details);
  const json = {
    "Pickup Location": details?.pickupLocation
      ? details?.pickupLocation
      : "N/A",
    "Drop Location": details?.dropLocation ? details?.dropLocation : "N/A",
    "Date of Booking": details?.dateOfBooking
      ? timeFormatter(details?.dateOfBooking)
      : "N/A",
    "Date of Ride": details?.dateOfRide
      ? timeFormatter(details?.dateOfRide)
      : "N/A",
    Time: moment(details && details?.time, "HH:mm").format("hh:mm A"),
    "Car Model Name": "Cadillac Escalade",
    "Car Number": "UP 16 BC 8765",
    "Driver Name": "Brian Lara",
    "Payment Mode": "Stripe",
    "Card Number": "************4242",
    "Transaction ID": stripe?.clientSecret?.substring(0, 15) || "123456789",
    Fare: state?.status === "Booked" ? "Pending" : "$400.00",
    "Vehicle Type": details?.vehicleType ? details?.vehicleType : "N/A",
  };
  return (
    <Layout2 footer={<Footer />}>
      <div>
        <div className="head">Booking Details</div>
        {details &&
          Object.keys(json).map((key) => (
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
