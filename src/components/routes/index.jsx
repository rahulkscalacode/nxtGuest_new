import React, { useState, useEffect, lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardNumberElement } from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";
import Loading from "../loader";
import "../../App.css";

const Home = lazy(() => import("../../pages/home"));
const Login = lazy(() => import("../../pages/login"));
const Register = lazy(() => import("../../pages/register"));
const DashBoard = lazy(() => import("../../pages/dashboard"));
const InvalidRoute = lazy(() => import("../../pages/invalidRoute"));
const Role = lazy(() => import("../../pages/role"));
const SelfRequestform = lazy(() => import("../../pages/selfReqestForm"));
const OtherRequsetForm = lazy(() => import("../../pages/otherReqestForm"));
const GroupRequestForm = lazy(() => import("../../pages/groupRequestForm"));
const BookingSummary = lazy(() => import("../../pages/bookingSummary"));
const Payment = lazy(() => import("../../pages/payment"));
const BookingConfirmation = lazy(() =>
  import("../../pages/payment/bookingConfirmation")
);
const BookingFailed = lazy(() => import("../../pages/payment/bookingFailed"));
const AboutUs = lazy(() => import("../../pages/aboutUs"));
const Profile = lazy(() => import("../../pages/profile"));
const BookingHistory = lazy(() => import("../../pages/bookingHistory"));
const BookingDetails = lazy(() =>
  import("../../pages/bookingHistory/bookingDetails")
);
const ContactUs = lazy(() => import("../../pages/contactUs"));
const FeedbackForm = lazy(() => import("../../pages/feedback"));
const TermCondition = lazy(() => import("../../pages/terms&Conditions"));
const PrivecyPolicy = lazy(() => import("../../pages/privacyPolicy"));
const ReqestSendtoAdmin = lazy(() =>
  import("../../pages/groupConfirmationPage")
);
const CustomPayment = lazy(() => import("../../pages/payment/customPayment"));

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
      <Suspense fallback={<Loading />}>
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
          <Route
            path="/booking-confirmation"
            element={<BookingConfirmation />}
          />
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
      </Suspense>
    </div>
  );
};

export default Index;
