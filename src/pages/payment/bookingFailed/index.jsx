import React from "react";
import Layout2 from "../../../components/layout2";
import "../../bookingSummary/index.css";
import { TfiPlus } from "react-icons/tfi";
import { useNavigate } from "react-router-dom"

const Index = () => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/payment");
  };
  return (
    <Layout2>
      <div>
        <div className="oopsCss">Oops!</div>
        <div className="confirmationSuccess">
          <img
            src="/images/icons/WarningCircle.png"
            alt=""
            className="imgsty1"
          />
          {/* -----content */}

          <div className="head mt-2">Transaction Failed</div>
        </div>
      </div>

      {/* --------button------- */}
      <div className="displayContent">
        <div className="FinishBtn">
          <div className="mb-4" style={{ fontWeight: "600" }}>
            Contact for Assistance
          </div>
          <div>+1 (305) 600 0605</div>
          <div>+1 (305) 928 2433</div>
          <div className="mb-4">info@nxtguest.com</div>

          <button
            className="proceedPay"
            style={{ width: "11rem" }}
            onClick={handleNavigate}
          >
            Back
          </button>
        </div>
      </div>
    </Layout2>
  );
};

export default Index;
