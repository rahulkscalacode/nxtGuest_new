import React, { useState, useEffect } from "react";
import Layout2 from "../../components/layout2";
import "../bookingSummary/index.css";
import { TfiPlus } from "react-icons/tfi";
import AddCardPopup from "./addCardPopup";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { useDispatch } from "react-redux";
import { userStripeReducer } from "../../components/toolkit/stripe";
import Cookies from "universal-cookie";

const Index = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const cookies = new Cookies();
  const userId = cookies.get("userId");

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const [paymentType, setPaymentType] = useState("manual");

  // Handler for radio button change
  const handlePaymentTypeChange = (event) => {
    setPaymentType(event.target.value);
  };
  // payment integration
  const makePayment = async () => {
    const stripe = await loadStripe(process.env.REACT_APP_STRIPE_SECRET_KEY);

    const body = {
      items: [
        {
          price_data: {
            currency: "usd",
            unit_amount: 500,
            product_data: {
              name: "self",
              images: ["https://nxtguest.vercel.app/images/asset/logo1.png"],
            },
          },
          quantity: "1",
        },
      ],
      id: userId,
    };
    const headers = {
      "Content-Type": "application/json",
    };
    const response = await fetch(
      `${process.env.REACT_APP_NXTGUEST_API_URI}/payment/create-checkout-session`,
      {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
      }
    );

    const session = await response.json();
    dispatch(userStripeReducer(session));
    console.log("session==>>", session);
    const result = stripe.redirectToCheckout({
      sessionId: session.checkoutPayment.id,
    });

    if (result.error) {
      console.log(result.error);
    }
  };

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
                name="paymentType"
                value="manual"
                checked={paymentType === "manual"}
                onChange={handlePaymentTypeChange}
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
        <div style={{ color: "#9F9F9F" }}>
          <input
            className="form-check-input"
            type="radio"
            name="paymentType"
            value="saved"
            checked={paymentType === "saved"}
            onChange={handlePaymentTypeChange}
            style={{ marginRight: "6px" }}
          />
          Saved Cards
        </div>
        {/* -----image */}
        {paymentType === "manual" ? (
          <img src="/images/icons/card.png" alt="" className="imgsty" />
        ) : (
          <div className="mt-3 ms-1 text-danger">No Saved card</div>
        )}
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
          <button className="proceedPay" onClick={makePayment}>
            Proceed to Pay
          </button>
        </div>
      </div>
    </Layout2>
  );
};

export default Index;
