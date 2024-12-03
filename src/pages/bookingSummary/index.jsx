import React, { useEffect, useState } from "react";
import Layout2 from "../../components/layout2";
import "./index.css";
import { useNavigate, useLocation } from "react-router-dom";
import { timeFormatter } from "../../components/formatter/timeFormatter";
import moment from "moment";
import { apiCall } from "../../functions/api/apiGlobal";
import Cookies from "universal-cookie";
import { useSelector } from "react-redux";

const Index = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { data } = location.state || {};
  const cookies = new Cookies();
  const tokenUserId = cookies.get("userId");
  const tokenC = cookies.get("token");
  // Check if data is defined and has the expected structure
  const nData = data?.data?.data || {};
  const [summaryData, setSummaryData] = useState({});

  const [bookings, setBookings] = useState({});
  const totalFare = localStorage.getItem("total_fare");

  if (totalFare) {
    localStorage.removeItem("total_fare");
  }

  console.log("totalFare====>>>", summaryData);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiCall(
          "GET",
          "/service/booking-summary",
          {},
          {},
          null,
          {
            user_id: tokenUserId, // Pass tokenUserId in headers
          }
        );
        const result = response.data.bookingData;
        setSummaryData(response.data.bookingData);
        // console.log("resultxxxxxxxxxxxxxxxxxxxx", result);

        if (result.type === "group") {
          setBookings({
            "Group Name": result?.groupName && result?.groupName,
            Occasion: result?.occasion,
            "Company Name": result?.companyName,
            Email: result.email || "N/A",
            "Contact Number": result.contactNumber || "N/A",
            "No. of passengers": result?.numberOfPassengers || "N/A",
            "Pickup Location": result.pickupLocation || "N/A",
            "Drop Location": result.dropLocation || "N/A",
            Date: timeFormatter(result.dateOfRide) || "N/A",
            "Pickup Time":
              moment(result && result.time, "HH:mm").format("hh:mm A") || "N/A",
          });
        } else {
          setBookings({
            Name: result.firstName
              ? `${result.firstName || "N/A"} ${result.lastName || ""}`
              : result.groupName,
            Email: result.email || "N/A",
            "Contact Number": result.contactNumber || "N/A",
            "Pickup Location": result.pickupLocation || "N/A",
            "Drop Location": result.dropLocation || "N/A",
            "Pickup Date": timeFormatter(result.dateOfRide) || "N/A",
            "Pickup Time":
              moment(result && result.time, "HH:mm").format("hh:mm A") || "N/A",
            Fare: result.total_fare ? `$ ${result.total_fare}` : "N/A",
          });
        }
      } catch (error) {
        console.error(
          "Failed to fetch user details:",
          error.response.data.message
        );
        if (
          error.response &&
          error.response.data &&
          error.response.data.message === "User ID is required"
        ) {
          const localStorageData = localStorage.getItem("guestService");

          if (localStorageData) {
            const parsedGuestUser = JSON.parse(localStorageData);
            const parsedData = parsedGuestUser?.data?.data;
            setBookings({
              Name: parsedData.firstName
                ? `${parsedData.firstName || "N/A"} ${
                    parsedData.lastName || ""
                  }`
                : parsedData.groupName,
              Email: parsedData.email || "N/A",
              "Contact Number": parsedData.contactNumber || "N/A",
              "Pickup Location": parsedData.pickupLocation || "N/A",
              "Drop Location": parsedData.dropLocation || "N/A",
              "Pickup Date": timeFormatter(parsedData.dateOfRide) || "N/A",
              "Pickup Time":
                moment(parsedData.time, "HH:mm").format("hh:mm A") || "N/A",
              Fare: parsedData.total_fare
                ? `$ ${parsedData.total_fare}`
                : "N/A",
            });
          }
        }
      }
    };

    fetchData();
  }, [tokenUserId]);

  const handleClick = () => {
    if (summaryData?.total_fare) {
      navigate("/payment", {
        state: {
          fare: summaryData?.total_fare,
        },
      });
    }
  };

  const handleGroupNavigate = () => {
    navigate("/request-to-admin");
  };

  const handleEditBooking = () => {
    const previousRoute = location.state?.previousRoute || "/self-request";
    navigate(previousRoute, { state: { data: nData } }); // This will navigate to the previous page
  };

  console.log("summaryData==>", location, summaryData);

  return (
    <Layout2>
      <div>
        <div className="head">Booking Summary</div>
        {Object.keys(bookings).map((keys) => (
          <div key={keys} className="inputcss mt-2">
            <div>{keys}</div>
            <div>{bookings[keys]}</div>
          </div>
        ))}
      </div>
      <div className="displayContent">
        <div className="btncss">
          <button className="editBook" onClick={handleEditBooking}>
            Edit My Booking
          </button>
          {summaryData.type === "group" ? (
            <button className="proceedPay" onClick={handleGroupNavigate}>
              Confirm
            </button>
          ) : (
            <button className="proceedPay" onClick={handleClick}>
              Proceed to Pay
            </button>
          )}
        </div>
      </div>
    </Layout2>
  );
};

export default Index;
