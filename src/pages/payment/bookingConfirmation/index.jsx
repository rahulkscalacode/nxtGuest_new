import React from "react";
import Layout2 from "../../../components/layout2";
import "../../bookingSummary/index.css";
import { TfiPlus } from "react-icons/tfi";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Cookies from "universal-cookie";

const Index = () => {
  const cookies = new Cookies();
  const name = cookies.get("name");
  const phone = cookies.get("phone");

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
