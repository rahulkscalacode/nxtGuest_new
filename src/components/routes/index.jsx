import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "../../pages/home";
import Login from "../../pages/login";
import Register from "../../pages/register";
import DashBoard from "../../pages/dashboard";
import InvalidRoute from "../../pages/invalidRoute";
import Role from "../../pages/role";
import SelfRequestform from "../../pages/selfReqestForm";
import OtherRequsetForm from "../../pages/otherReqestForm";
import GroupRequestForm from "../../pages/groupRequestForm";
import BookingSummary from "../../pages/bookingSummary";
import Payment from "../../pages/payment";
import BookingConfirmation from "../../pages/payment/bookingConfirmation";
import BookingFailed from "../../pages/payment/bookingFailed";
import AboutUs from "../../pages/aboutUs";
import Profile from "../../pages/profile";
import BookingHistory from "../../pages/bookingHistory";
import BookingDetails from "../../pages/bookingHistory/bookingDetails";
import ContactUs from "../../pages/contactUs";
import FeedbackForm from "../../pages/feedback";
import TermCondition from "../../pages/terms&Conditions";
import PrivecyPolicy from "../../pages/privacyPolicy";
import ReqestSendtoAdmin from "../../pages/groupConfirmationPage";
import CustomPayment from "../../pages/payment/customPayment";
import "../../App.css";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardNumberElement } from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";
import Loading from "../loader";

const Index = () => {
  const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_SECRET_KEY);
  let { pathname } = useLocation();
  const backgroundImage =
    pathname === "/"
      ? "url(/images/icons/bg1.png)"
      : "url(/images/icons/bg2.png)";

  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);
  const { loader } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    const handleResize = () => {
      // Get the visible viewport height
      setViewportHeight(window.innerHeight);
    };

    // Set the height on load
    handleResize();

    // Update height on window resize or orientation change
    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
    };
  }, []);

  // console.log("viewportHeight=>", viewportHeight);
  const routeBackgroundStyle = {
    backgroundImage: backgroundImage,
    backgroundPosition: "center center",
    backgroundSize: "cover",
    height: `${viewportHeight}px`,
    width: "100%",
    backgroundRepeat: "no-repeat",
    backgroundBlendMode: "darken",
  };
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 430px)");

    // Check the initial screen size
    const handleScreenChange = (e) => {
      setIsSmallScreen(e.matches);
    };

    // Add listener for screen size changes
    mediaQuery.addEventListener("change", handleScreenChange);

    // Check on component mount
    handleScreenChange(mediaQuery);

    // Clean up the listener on unmount
    return () => {
      mediaQuery.removeEventListener("change", handleScreenChange);
    };
  }, []);

  return (
    <div style={isSmallScreen ? {} : routeBackgroundStyle}>
      <ToastContainer theme="dark" autoClose={5000} />
      {loader && <Loading />}
      <Routes>
        <Route index element={<Home />} />
        <Route path="*" element={<InvalidRoute />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/role" element={<Role />} />
        <Route path="/self-request" element={<SelfRequestform />} />
        <Route path="/other-request" element={<OtherRequsetForm />} />
        <Route path="/group-request" element={<GroupRequestForm />} />
        <Route path="/booking-summary" element={<BookingSummary />} />
        <Route
          path="/payment"
          element={
            <Elements stripe={stripePromise}>
              <Payment />
            </Elements>
          }
        />
        <Route path="/booking-confirmation" element={<BookingConfirmation />} />
        <Route path="/request-to-admin" element={<ReqestSendtoAdmin />} />
        <Route path="/booking-failed" element={<BookingFailed />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/booking-history" element={<BookingHistory />} />
        <Route path="/booking-details" element={<BookingDetails />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/feedback" element={<FeedbackForm />} />
        <Route
          path="/stripe-payment"
          element={
            <Elements stripe={stripePromise}>
              <CustomPayment />{" "}
            </Elements>
          }
        />
        <Route path="/privacy-policy" element={<PrivecyPolicy />} />
        <Route path="/terms-conditions" element={<TermCondition />} />
      </Routes>
    </div>
  );
};

export default Index;
