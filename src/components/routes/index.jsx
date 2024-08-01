import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useLocation } from "react-router-dom";
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

const Index = () => {
  let { pathname } = useLocation();
  const backgroundImage =
    pathname === "/"
      ? "url(/images/icons/bg1.png)"
      : "url(/images/icons/bg2.png)";

  return (
    <div
      style={{
        backgroundImage: backgroundImage,
        backgroundPosition: "center center",
        backgroundSize: "cover",
        height: "100vh",
        width: "100%",
        backgroundRepeat: "no-repeat",
        backgroundBlendMode: "darken",
      }}
    >
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
      </Routes>
    </div>
  );
};

export default Index;
