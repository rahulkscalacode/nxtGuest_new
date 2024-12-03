import React, { useEffect } from "react";
import Layout2 from "../../components/layout2";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/booking-history");
  };
  return (
    <Layout2>
      <div className="mt-2">
        <div className="confirmationSuccess head">Request sent to admin</div>
        <div className="confirmationSuccess">
          <img src="/images/icons/SealCheck.png" alt="" className="imgsty1" />
          {/* -----content */}
          <div className="head">
            <div>Please wait for the approval</div>
          </div>
        </div>
        <div className="mt-4 row">
          <div className="col-6 d-flex justify-content-end">
            <div>Contact for Assistance</div>
          </div>
          <div className="col-6">
            <div>123456789</div>
            <div>abc@gmail.com</div>
          </div>
        </div>
      </div>

      {/* --------button------- */}
      <div className="displayContent">
        <div className="FinishBtn">
          <button
            className="proceedPay"
            style={{ width: "11rem" }}
            onClick={handleNavigate}
          >
            Finish
          </button>
        </div>
      </div>
    </Layout2>
  );
};

export default Index;
