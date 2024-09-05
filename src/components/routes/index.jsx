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
import "../../App.css";

const Index = () => {
  let { pathname } = useLocation();
  const backgroundImage =
    pathname === "/"
      ? "url(/images/icons/bg1.png)"
      : "url(/images/icons/bg2.png)";

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
    <div>
      className={isSmallScreen ? "" : "route-backgound"}
      <ToastContainer theme="dark" autoClose={5000} />
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
        <Route path="/payment" element={<Payment />} />
        <Route path="/booking-confirmation" element={<BookingConfirmation />} />
        <Route path="/booking-failed" element={<BookingFailed />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/booking-history" element={<BookingHistory />} />
        <Route path="/booking-details" element={<BookingDetails />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/feedback" element={<FeedbackForm />} />
        <Route path="/privacy-policy" element={<PrivecyPolicy />} />
        <Route path="/terms-conditions" element={<TermCondition />} />
      </Routes>
    </div>
  );
};

export default Index;
