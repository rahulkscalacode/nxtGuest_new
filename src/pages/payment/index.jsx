import React, { useState, useEffect } from "react";
import Layout2 from "../../components/layout2";
import "../bookingSummary/index.css";
import axios from "axios";
import { TfiPlus } from "react-icons/tfi";
import AddCardPopup from "./addCardPopup";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { userStripeReducer } from "../../components/toolkit/stripe";
import Cookies from "universal-cookie";
import CardView from "../../components/creditCardView";
import { listAllCustomerPaymentMethods } from "../../functions/api/stripe";
import { loaderReducer } from "../../components/toolkit/loader";

const Index = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [listAllPaymentMethod, setListAllPaymentMethod] = useState([]);
  const dispatch = useDispatch();
  const cookies = new Cookies();
  const location = useLocation();
  const { fare } = location.state || {};
  const id = cookies.get("userId");
  const email = cookies.get("useEmail");
  const [paymentType, setPaymentType] = useState("manual");
  const [selectedCard, setSelectedCard] = useState("");
  const [toggleSelect, setToggleSelect] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };
  const toggleSelectCard = () => {
    setToggleSelect(!toggleSelect);
  };

  // Handler for radio button change
  const handlePaymentTypeChange = (event) => {
    setPaymentType(event.target.value);
  };

  const handleCancel = () => {
    navigate("/dashboard");
  };

  const listAllPaymentMethords = async () => {
    dispatch(loaderReducer(true));
    await listAllCustomerPaymentMethods({ id })
      .then((res) => {
        dispatch(loaderReducer(false));
        setListAllPaymentMethod(res.data?.defaultPaymentMethod);
      })
      .catch((err) => {
        dispatch(loaderReducer(false));
        // toast.error(err);
        console.log(err);
      });
  };

  useEffect(() => {
    listAllPaymentMethords();
  }, [showModal]);

  const makePayment = async () => {
    dispatch(loaderReducer(true));
    if (!fare) {
      dispatch(loaderReducer(false));
      navigate("/dashboard");
      toast.error("An unexpected error occurred in payment. Please try again.");
      return;
    }

    if (selectedCard) {
      // Proceed with saved card
      try {
        dispatch(loaderReducer(true));
        const response = await axios.post(
          `${process.env.REACT_APP_NXTGUEST_API_URI}/payment/create-payment-intent`,
          {
            paymentMethodId: selectedCard.id,
            amount: fare * 100,
            email,
            id: id && id,
          }
        );

        if (response.data?.success) {
          dispatch(loaderReducer(false));
          toast.success("Payment Successful!");
          navigate("/booking-confirmation");
        } else {
          dispatch(loaderReducer(false));
          toast.error("Payment failed. Please try again.");
          navigate("/booking-failed");
        }
      } catch (error) {
        dispatch(loaderReducer(false));
        console.error("Payment error:", error);
        toast.error("Payment failed. Please try again.");
      }
    } else {
      dispatch(loaderReducer(false));
      // Redirect to Stripe payment page
      navigate("/stripe-payment", {
        state: {
          fare,
        },
      });
    }
  };

  useEffect(() => {
    if (toggleSelect) {
      if (listAllPaymentMethod) {
        setSelectedCard(toggleSelect ? listAllPaymentMethod : null);
      }
    } else if (!toggleSelect) {
      setSelectedCard("");
    }
  }, [toggleSelect]);

  console.log(
    "data==>",
    selectedCard,
    "&&",
    toggleSelect,
    "listAllPaymentMethod==>>",
    listAllPaymentMethod
  );
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
                checked={!toggleSelect}
                onChange={toggleSelectCard}
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
            checked={toggleSelect && Boolean(listAllPaymentMethod?.id)}
            onChange={toggleSelectCard}
            style={{ marginRight: "6px" }}
          />
          Saved Cards
        </div>
        {/* -----image */}
        {/* {paymentType === "manual" ? ( */}
        <CardView
          arg={{
            listAllPaymentMethod,
            selectedCard,
            setSelectedCard,
            toggleSelectCard,
            toggleSelect,
          }}
        />
        {/* ) : (
          <div className="mt-3 ms-1 text-danger">No Saved card</div>
        )} */}
      </div>
      {/* --------button------- */}
      <div className="displayContent">
        <div className="btncss">
          <button
            className="editBook"
            style={{ background: "#fbc810", border: "none", color: "black" }}
            onClick={handleCancel}
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

// payment integration
// const makePayment = async () => {
//   const stripe = await loadStripe(process.env.REACT_APP_STRIPE_SECRET_KEY);

//   const body = {
//     items: [
//       {
//         price_data: {
//           currency: "usd",
//           unit_amount: fare && fare * 100,
//           product_data: {
//             name: "self",
//             images: ["https://nxtguest.vercel.app/images/asset/logo1.png"],
//           },
//         },
//         quantity: "1",
//       },
//     ],
//     id: userId,
//   };

//   const headers = {
//     "Content-Type": "application/json",
//   };

//   // Fetch saved payment methods for the user
//   // const paymentMethodsResponse = await fetch(
//   //   `${process.env.REACT_APP_NXTGUEST_API_URI}/payment/list-payment-methords`,
//   //   {
//   //     method: "post",
//   //     headers,
//   //     body: JSON.stringify({ id: userId }),
//   //   }
//   // );
//   // const savedPaymentMethods = await paymentMethodsResponse.json();

//   // console.log("savedPaymentMethods=>", savedPaymentMethods.paymentMethods.data);

//   // Create checkout session
//   const response = await fetch(
//     `${process.env.REACT_APP_NXTGUEST_API_URI}/payment/create-checkout-session`,
//     {
//       method: "POST",
//       headers: headers,
//       body: JSON.stringify(body),
//     }
//   );

//   const session = await response.json();
//   dispatch(userStripeReducer(session));
//   console.log("session==>>", session);

//   if (session.status === "failed") {
//     toast.error("Login before checkout");
//     navigate("/login");
//   }

//   const result = stripe.redirectToCheckout({
//     sessionId: session.checkoutPayment?.id,
//   });

//   if (result.error) {
//     toast.error(result.error.message);
//   }
// };
