import React, { useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import CustomCardForm from "./cardElement";
import { CardNumberElement } from "@stripe/react-stripe-js";
import "../../bookingSummary/index.css";
import Layout2 from "../../../components/layout2";
import { toast } from "react-toastify";
import Cookies from "universal-cookie";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loaderReducer } from "../../../components/toolkit/loader";

const Index = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState("");
  const cookies = new Cookies();
  const userId = cookies.get("userId");
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { fare } = location.state || {};
  const email = cookies.get("useEmail");
  // console.log("datacustom=>", fare);

  const handlePayment = async (e) => {
    e.preventDefault();
    dispatch(loaderReducer(true));
    // Check if Stripe and Elements are loaded
    if (!stripe || !elements) {
      dispatch(loaderReducer(false));
      console.error("Stripe or Elements not loaded");
      setMessage("Stripe is not properly initialized. Please try again later.");
      return;
    }

    // Get the CardNumberElement
    const cardElement = elements.getElement(CardNumberElement);

    if (!cardElement) {
      console.error("Card Element not found");
      dispatch(loaderReducer(false));
      setMessage(
        "Card details are not available. Please refresh and try again."
      );
      return;
    }

    try {
      dispatch(loaderReducer(true));
      // Create the payment method
      const { paymentMethod, error: paymentMethodError } =
        await stripe.createPaymentMethod({
          type: "card",
          card: cardElement,
          billing_details: {
            email: email, // Replace with your email variable
          },
        });

      if (paymentMethodError) {
        dispatch(loaderReducer(false));
        console.error("Error creating payment method:", paymentMethodError);
        setMessage(
          paymentMethodError.message ||
            "Failed to create payment method. Please try again."
        );
        return;
      }

      console.log("Payment Method:", paymentMethod);

      // Send payment data to the server
      const response = await axios.post(
        `${process.env.REACT_APP_NXTGUEST_API_URI}/payment/create-payment-intent`,
        {
          paymentMethodId: paymentMethod.id,
          amount: fare * 100,
          email,
          id: userId && userId,
        }
      );

      // Handle server response
      if (response.data && response.data.success) {
        dispatch(loaderReducer(false));
        setMessage("Payment Successful!");
        console.log("Payment succeeded:", response.data);
        toast.success("Payment Successful!");
        navigate("/booking-confirmation");
      } else {
        dispatch(loaderReducer(false));
        console.error("Payment failed:", response.data);
        setMessage(
          response.data.message || "Payment failed. Please try again."
        );
        toast.error("Payment failed. Please try again.");
        navigate("/booking-failed");
      }
    } catch (error) {
      dispatch(loaderReducer(false));
      console.error("Unexpected error:", error);
      setMessage(
        error.response?.data?.message ||
          "An unexpected error occurred. Please try again."
      );
      toast.error("An unexpected error occurred. Please try again.");
      navigate("/booking-failed");
    }
  };

  return (
    <Layout2>
      <div>
        <form onSubmit={handlePayment}>
          <h2>Enter your payment details</h2>
          <div className="input-group2">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              className="input-field"
              placeholder="Enter Email"
              disabled
            />
          </div>
          <div className="input-group2">
            <label>Amount:</label>
            <input
              type="number"
              value={fare}
              className="input-field"
              required
              placeholder="Enter Amount"
              disabled
            />
          </div>

          <CustomCardForm />

          <button
            type="submit"
            className="submit-button"
            disabled={!stripe || !elements}
          >
            Pay Now
          </button>
          {/* <div className="input-group">
            <label>
              <input
                className="form-check-input"
                type="radio"
                name="locationType"
                value="select"

                style={{ marginRight: "8px" }}
              />
              Pickup Location
            </label>
          </div> */}
          {message && <p>{message}</p>}
        </form>
      </div>
    </Layout2>
  );
};

export default Index;
