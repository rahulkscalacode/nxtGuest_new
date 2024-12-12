import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import "./addCard.css";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import Cookies from "universal-cookie";
import { toast } from "react-toastify";

const AddCardPopup = ({ toggleModal, showModal }) => {
  const stripe = useStripe();
  const elements = useElements();
  const cookies = new Cookies();
  const email = cookies.get("useEmail");
  const [name, setName] = useState("");

  const handleAddCard = async (e) => {
    e.preventDefault();
    console.log("email=>", email);

    if (!stripe || !elements) {
      toast.error(
        "Stripe is not properly initialized. Please try again later."
      );
      return;
    }

    const cardElement = elements.getElement(CardNumberElement);

    if (!cardElement) {
      toast.error(
        "Card details are not available. Please refresh and try again."
      );
      return;
    }

    try {
      // Create a payment method
      const { paymentMethod, error: paymentMethodError } =
        await stripe.createPaymentMethod({
          type: "card",
          card: cardElement,
          billing_details: {
            email: email && email,
            name: name,
          },
        });

      if (paymentMethodError) {
        toast.error(
          paymentMethodError.message || "Failed to create payment method."
        );
        return;
      }

      // Send payment method to server
      const response = await fetch(
        `${process.env.REACT_APP_NXTGUEST_API_URI}/payment/save-payment-method`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            paymentMethodId: paymentMethod.id,
            email,
          }),
        }
      );

      const responseData = await response.json();

      console.log(
        "response.ok && responseData.success==>",
        response.ok,
        responseData.success,
        responseData
      );
      if (response.ok && responseData.status === "success") {
        toast.success("Card added successfully!");
        toggleModal();
      } else {
        toast.error(
          responseData.message || "Failed to add card. Please try again."
        );
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      toast.error("An unexpected error occurred. Please try again later.");
    }
  };

  console.log("name==>", name);
  return (
    <div
      className="card-container"
      style={showModal ? { display: "block" } : { display: "none" }}
    >
      <div className="card-header1">
        <div className="heading">Add Card</div>
        <button className="close-button" onClick={toggleModal}>
          <RxCross2 />
        </button>
      </div>
      <form
        className="card-form mt-2"
        autoComplete="off"
        onSubmit={handleAddCard}
      >
        <div>
          <div className="input-group2">
            Card Number:
            <div className="stripe-card-container">
              <CardNumberElement
                id="card-number-element"
                options={{
                  style: {
                    base: {
                      color: "white",
                      fontSize: "16px",
                      fontFamily: "'Roboto', sans-serif",
                      "::placeholder": {
                        color: "#bfbfbf",
                      },
                    },
                    invalid: { color: "#9e2146" },
                  },
                }}
              />
            </div>
          </div>

          <div>
            <div className="input-group2">
              Expiry Date:
              <div className="stripe-card-container">
                <CardExpiryElement
                  options={{
                    style: {
                      base: {
                        color: "white",
                        fontSize: "16px",
                        fontFamily: "'Roboto', sans-serif",
                        "::placeholder": {
                          color: "#bfbfbf",
                        },
                      },
                      invalid: { color: "#9e2146" },
                    },
                  }}
                />
              </div>
            </div>
          </div>

          <div>
            <div className="input-group2">
              CVC:
              <div className="stripe-card-container">
                <CardCvcElement
                  options={{
                    style: {
                      base: {
                        color: "white",
                        fontSize: "16px",
                        fontFamily: "'Roboto', sans-serif",
                        "::placeholder": {
                          color: "#bfbfbf",
                        },
                      },
                      invalid: { color: "#9e2146" },
                    },
                  }}
                />
              </div>
            </div>
          </div>

          <div className="input-group2">
            <label>Name on card:</label>
            <input
              type="text"
              className="input-field"
              required
              value={name}
              placeholder="Enter name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>
        <div className="form-actions mt-3">
          <button type="button" className="cancel-button" onClick={toggleModal}>
            Cancel
          </button>
          <button type="submit" className="save-button">
            Save Card
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCardPopup;
