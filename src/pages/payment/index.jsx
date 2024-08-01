import React, { useState } from "react";
import Layout2 from "../../components/layout2";
import "../bookingSummary/index.css";
import { TfiPlus } from "react-icons/tfi";
import AddCardPopup from "./addCardPopup";

import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleClick = () => {
    navigate("/booking-confirmation");
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  console.log(showModal);
  return (
    <Layout2>
      <AddCardPopup toggleModal={toggleModal} showModal={showModal} />

      <div>
        <div className="head">Payment Mode</div>
        <div className="d-flex mt-2 justify-content-between align-items-center">
          <div className="">
            <label className="">
              <input
                className="form-check-input"
                type="radio"
                name="locationType"
                value="manual"
                // checked={form.locationType === "manual"}
                // onChange={}
                style={{ marginRight: "6px" }}
              />
              Credit Card
            </label>
          </div>
          <button
            className="editBook"
            style={{ borderRadius: "10px", width: "8rem", cursor: "pointer" }}
            onClick={toggleModal}
          >
            <span className="me-2">
              <TfiPlus />
            </span>
            Add Card
          </button>
        </div>
        <div style={{ color: "#9F9F9F", marginLeft: "1.3rem" }}>
          Saved Cards
        </div>

        {/* -----image */}
        <img src="/images/icons/card.png" alt="" className="imgsty" />
      </div>
      {/* --------button------- */}
      <div className="displayContent">
        <div className="btncss">
          <button
            className="editBook"
            style={{ background: "#999", border: "none", color: "black" }}
          >
            Cancel
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
