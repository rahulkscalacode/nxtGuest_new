import React, { useState } from "react";
import Layout1 from "../../components/layout1";
import Footer from "../../components/footer";
import "./index.css";
import { useNavigate } from "react-router-dom";
import { selfserviceReqest } from "../../functions/api/serviceReqest";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import Cookies from "universal-cookie";

import TimePicker from "react-time-picker";

const Index = () => {
  const navigate = useNavigate();
  const cookies = new Cookies();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    contactNumber: "",
    serviceEmail: "",
    locationType: "select",
    pickupLocation: "",
    dropLocation: "",
    vehicleType: "",
    datevalue: "",
    time: "",
    userId:cookies.get("userId"),
    type:"self"
  });

  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setForm({ ...form, datevalue: date });
  };
  // console.log("selectedDate", selectedDate);

  const formatDate = (date) => {
    return date ? format(date, "MM/dd/yy") : "";
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  console.log("form=>", form);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await selfserviceReqest(form)
        .then((res) => {
          console.log("res=>>", res);
          toast.success("Successfully created self service request form.");
          navigate("/booking-summary");
        })
        .catch((err) => {
          toast.error("Something went wrong!");
        });
    } catch (error) {
      console.log("error=>>>", error);
    }
  };

  const [time, setTime] = useState("00:00");

  const formatTime = (value) => {
    const [hour, minute] = value.split(":");
    let formattedHour = parseInt(hour);
    const period = formattedHour >= 12 ? "PM" : "AM";
    formattedHour = formattedHour % 12 || 12; // Convert to 12-hour format
    return `${formattedHour}:${minute} ${period}`;
  };

  return (
    <Layout1 footer={<Footer />}>
      <div className="form-wrapper">
        <div className="head">Service Request</div>
        <form onSubmit={handleSubmit} autoComplete="off">
          <div className="input-group">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={form.firstName}
              onChange={handleChange}
              className="input-field"
              autoComplete="new-email"
              // required
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={form.lastName}
              onChange={handleChange}
              className="input-field"
              autoComplete="new-email"
            />
          </div>
          <div className="">
            <input
              type="text"
              name="contactNumber"
              placeholder="Contact Number"
              value={form.contactNumber}
              onChange={handleChange}
              className="input-field"
              autoComplete="new-email"
              // required
            />
          </div>
          <div className="">
            <input
              type="email"
              name="serviceEmail"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              className="input-field"
              autoComplete="new-email"
              // required
            />
          </div>
          {/* -----------------Pickup Location------------------ */}
          <div className="input-group">
            <label className="">
              <input
                className="form-check-input"
                type="radio"
                name="locationType"
                value="select"
                checked={form.locationType === "select"}
                onChange={handleChange}
                style={{ marginRight: "8px" }}
              />
              Pickup Location
            </label>
            <select
              name="pickupLocation"
              value={form.pickupLocation}
              onChange={handleChange}
              disabled={form.locationType !== "select"}
              className="input-field"
            >
              <option value="">Select</option>
              {/* Add options here */}
            </select>
          </div>
          {/* ------------------Drop Location------------------ */}
          <div className="input-group ">
            <label style={{ marginLeft: "1.4rem" }}>Drop Location</label>
            <select
              name="dropLocation"
              value={form.dropLocation}
              onChange={handleChange}
              disabled={form.locationType !== "select"}
              className="input-field"
            >
              <option value="">Select</option>
              {/* Add options here */}
            </select>
          </div>
          {/* -------------Other------------ */}
          <div className="input-group mt-2">
            <label className="">
              <input
                className="form-check-input"
                type="radio"
                name="locationType"
                value="manual"
                checked={form.locationType === "manual"}
                onChange={handleChange}
                style={{ marginRight: "6px" }}
              />
              Other
            </label>
          </div>
          {/* ----------------Other data---------- */}
          <div>
            <input
              type="text"
              name="pickupLocation"
              placeholder="Enter Pickup Location Manually"
              value={form.pickupLocation}
              onChange={handleChange}
              disabled={form.locationType !== "manual"}
              className="input-field"
            />
          </div>
          {/* ----------------Input field----------------- */}
          <div className="">
            <input
              type="text"
              name="dropLocation"
              placeholder="Enter Drop Location Manually"
              value={form.dropLocation}
              onChange={handleChange}
              disabled={form.locationType !== "manual"}
              className="input-field"
            />
          </div>
          <div className="">
            <select
              name="vehicleType"
              value={form.vehicleType}
              onChange={handleChange}
              className="input-field"
              // required
            >
              <option value="">Vehicle Type</option>
              {/* Add options here */}
            </select>
          </div>

          <div className="d-flex gap-2">
            <DatePicker
              className="input-field"
              name="datevalue"
              selected={form.datevalue}
              onChange={handleDateChange}
              dateFormat="MM/dd/yy"
              placeholderText="MM/DD/YY"
              // style={{ padding: "6px" }}
            />

            <TimePicker
              className="input-field"
              onChange={setTime}
              value={time}
              amPmAriaLabel="AM"
              format="h:mm a"
              shouldOpenClock={({ reason }) => reason !== "focus"}
            />
          </div>
          <button type="submit" className="submit-button">
            Confirm Booking
          </button>
        </form>
      </div>
    </Layout1>
  );
};

export default Index;
