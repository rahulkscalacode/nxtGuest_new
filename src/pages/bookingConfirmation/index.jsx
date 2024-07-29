import React from "react";
import Layout2 from "../../components/layout2";
import "../bookingSummary/index.css";
import { TfiPlus } from "react-icons/tfi";

const Index = () => {
  const json = {
    "Booking ID": "123456789",
    "Transaction ID": "0123456789",
    "Card Number": "************1234",
    Name: "Lokesh k Dewangan",
    Contact: "1234567890",
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
            <div className="inputcss mt-2">
              <div>{keys}</div>
              <div>{json[keys]}</div>
            </div>
          ))}
        </div>
      </div>
      {/* --------button------- */}
      <div className="displayContent">
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
