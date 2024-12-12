import React from "react";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import "./StripeStyles.css";

const CustomCardForm = () => {
  return (
    <div>
      <div className="input-group2">
        Card Number:
        <div className="stripe-card-container">
          <CardNumberElement
            id="card-number-element"
            options={{
              style: {
                base: {
                  color: "white", // Text color
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
                    color: "white", // Text color
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
          CVC1:
          <div className="stripe-card-container">
            <CardCvcElement
              options={{
                style: {
                  base: {
                    color: "white", // Text color
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
    </div>
  );
};

export default CustomCardForm;
