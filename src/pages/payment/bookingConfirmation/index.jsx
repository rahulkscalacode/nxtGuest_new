import React, { useEffect } from "react";
import Layout2 from "../../../components/layout2";
import "../../bookingSummary/index.css";
import { TfiPlus } from "react-icons/tfi";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Cookies from "universal-cookie";
import { listAllCustomerPaymentMethods } from "../../../functions/api/stripe";
import axios from "axios";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";

const Index = () => {
  const cookies = new Cookies();
  const name = cookies.get("userName");
  const phone = cookies.get("phone");
  const id = cookies.get("userId");
  const location = useLocation();

  const { stripe } = useSelector((state) => ({
    ...state,
  }));

  console.log("clientSecret=>", stripe);
  const json = {
    "Booking ID": stripe?.checkoutPayment?.customer || "cus_QsOZMb0g9g21Zr",
    "Transaction ID":
      stripe?.checkoutPayment?.id?.substring(20, 40) || "123456789",
    "Card Number": "************4242",
    Name: name || "N/A",
    Contact: phone || "1234567890",
  };
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/booking-history");
  };

  const listAllPaymentMethords = async () => {
    await listAllCustomerPaymentMethods({ id })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    listAllPaymentMethords();
  }, []);

  const body = localStorage.getItem("registerdata");

  const handleNewReservation = async () => {
    const hasRun = localStorage.getItem("hasRunNewReservation");

    // Ensure API is called only once
    if (!hasRun && body) {
      try {
        const parsedBody = JSON.parse(body);

        // Immediately set the flag before making the API call
        localStorage.setItem("hasRunNewReservation", "true");

        // API call to register endpoint
        const response = await axios.post(
          `${process.env.REACT_APP_NXTGUEST_API_URI}/limoanywhere/register`,
          parsedBody
        );

        const resData = response.data;
        console.log("res=>>", resData);

        // Storing data in localStorage and cookies
        const serializableData = { data: resData };
        localStorage.setItem("guestService", JSON.stringify(serializableData));

        // Success notification
        toast.success("Successfully created self-service request form.");
      } catch (error) {
        console.error("Error submitting form:", error);
        toast.error("Something went wrong in zapier form!");
        // Reset flag in case of failure
        localStorage.removeItem("hasRunNewReservation");
      }
    }
  };

  useEffect(() => {
    handleNewReservation();
  }, []);

  return (
    <Layout2>
      <div>
        <div className="confirmationSuccess">
          <img src="/images/icons/SealCheck.png" alt="" className="imgsty1" />
          {/* -----content */}

          <div className="head">
            Booking Confirmed{" "}
            <div className="confirmationSuccess">Successfully</div>
          </div>
        </div>
        <div className="mt-4">
          {Object.keys(json).map((keys) => (
            <div className="row mt-2">
              <div className="col-5">{keys} : </div>
              <div className="col-7" style={{ wordBreak: "break-all" }}>
                {json[keys]}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* --------button------- */}
      <div className="displayContent" onClick={handleNavigate}>
        <div className="FinishBtn">
          <button className="proceedPay" style={{ width: "11rem" }}>
            Finish
          </button>
        </div>
      </div>
    </Layout2>
  );
};

export default Index;
