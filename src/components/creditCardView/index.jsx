import React, { useState, useEffect } from "react";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import "./index.css";
import { TiTick } from "react-icons/ti";

const Index = ({
  arg: {
    setSelectedCard,
    listAllPaymentMethod,
    toggleSelect,
    toggleSelectCard,
  },
}) => {
  const [formState, setFormState] = useState({
    cvc: "",
    expiry: "",
    focus: "",
    name: "",
    number: "",
  });

  useEffect(() => {
    if (listAllPaymentMethod) {
      const expMonth = listAllPaymentMethod.card?.exp_month || "";
      const expYear = listAllPaymentMethod.card?.exp_year || "";
      const formattedExpiry =
        expMonth && expYear
          ? `${String(expMonth).padStart(2, "0")}/${String(expYear).slice(-2)}`
          : ""; // Format to MM/YY

      const last4 = listAllPaymentMethod.card?.last4;
      const maskedNumber = last4
        ? `000000000000${last4}` // Format to 16 digits
        : ""; // Handle case where `last4` is not available

      setFormState({
        cvc: listAllPaymentMethod.card?.cvc || "",
        expiry: formattedExpiry,
        focus: "",
        name: listAllPaymentMethod.billing_details?.name || "",
        number: maskedNumber,
      });
    }
  }, [listAllPaymentMethod]);

  const handleClick = () => {
    toggleSelectCard(); 
  };

  // console.log("listAllPaymentMethod==>", listAllPaymentMethod);

  return (
    <div
      id="PaymentForm"
      className="mt-2 position-relative"
      onClick={handleClick}
      style={{ cursor: "pointer" }}
    >
      {toggleSelect && (
        <TiTick
          style={{ color: "green", fontSize: "50px" }}
          className="position-absolute tickClass"
        />
      )}
      <Cards
        cvc={formState.cvc}
        expiry={formState.expiry}
        focused={formState.focus}
        name={formState.name}
        number={formState.number}
      />
    </div>
  );
};

export default Index;

// const handleInputFocus = (e) => {
//   setFormState((prevState) => ({
//     ...prevState,
//     focus: e.target.name,
//   }));
// };

// const handleInputChange = (e) => {
//   const { name, value } = e.target;

//   setFormState((prevState) => ({
//     ...prevState,
//     [name]: value,
//   }));
// };
{
  /* <form>
<input
  type="tel"
  name="number"
  placeholder="Card Number"
  onChange={handleInputChange}
  onFocus={handleInputFocus}
/>
<input
  type="text"
  name="name"
  placeholder="Cardholder Name"
  onChange={handleInputChange}
  onFocus={handleInputFocus}
/>
<input
  type="text"
  name="expiry"
  placeholder="MM/YY Expiry"
  onChange={handleInputChange}
  onFocus={handleInputFocus}
/>
<input
  type="tel"
  name="cvc"
  placeholder="CVC"
  onChange={handleInputChange}
  onFocus={handleInputFocus}
/>
<button type="submit">Submit</button>
</form> */
}
