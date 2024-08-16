import React, { useState } from "react";
import Layout1 from "../../components/layout1";
import Footer from "../../components/footer";
import "./index.css";
import { useNavigate } from "react-router-dom";
import { selfserviceReqest } from "../../functions/api/selfServiceReqest";
import { toast } from "react-toastify";

const Index = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    contactNumber: "",
    serviceEmail: "",
    locationType: "select",
    pickupLocation: "",
    dropLocation: "",
    vehicleType: "",
    date: "",
    time: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await selfserviceReqest(form)
        .then((res) => {
          console.log("res=>>", res);
          toast.success("Successfully created self service request form.");
          // navigate("/booking-summary");
        })
        .catch((err) => {
          toast.error("Something went wrong!");
        });
    } catch (error) {
      console.log("error=>>>", error);
    }
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
              required
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
              required
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

          <div className="input-group">
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="input-field"
              required
            />
            <input
              type="time"
              name="time"
              value={form.time}
              onChange={handleChange}
              className="input-field"
              required
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
