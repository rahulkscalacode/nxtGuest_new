import React, { useState } from "react";
import Layout1 from "../../components/layout1";
import Footer from "../../components/footer";
import { useLocation } from "react-router-dom";
import "../selfReqestForm/index.css";
import { groupServiceReqest } from "../../functions/api/serviceReqest";
import { toast } from "react-toastify";
import Cookies from "universal-cookie";

const Index = () => {
  const cookies = new Cookies();

  const [form, setForm] = useState({
    groupName: "",
    occasion: "",
    companyName: "",
    email: "",
    contactNumber: "",
    locationType: "select",
    pickupLocation: "",
    dropLocation: "",
    vehicleType: "",
    date: "",
    time: "",
    userId: cookies.get("userId"),
    type: "group",
  });

  let { pathname } = useLocation();
  console.log(pathname);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await groupServiceReqest(form)
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
          <div className="">
            <input
              type="text"
              name="groupName"
              placeholder="Group Name"
              value={form.groupName}
              onChange={handleChange}
              className="input-field"
              autoComplete="new-email"
            />
          </div>
          <div className="input-group">
            <input
              type="text"
              name="occasion"
              placeholder="Occasion"
              value={form.occasion}
              onChange={handleChange}
              className="input-field"
              autoComplete="new-email"
            />
            <input
              type="text"
              name="companyName"
              placeholder="Company Name"
              value={form.companyName}
              onChange={handleChange}
              className="input-field"
              autoComplete="new-email"
            />
          </div>

          <div className="">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              className="input-field"
              autoComplete="new-email"
              //   style={{ marginTop: "6px", padding: "5px" }}
            />
          </div>

          {/* -------------Contact Number---------- */}
          <div className="input-group">
            <input
              type="text"
              name="contactNumber"
              placeholder="Contact Number"
              value={form.contactNumber}
              onChange={handleChange}
              className="input-field"
              autoComplete="new-email"
            />
            <select
              name="pickupLocation"
              value={form.pickupLocation}
              onChange={handleChange}
              disabled={form.locationType !== "select"}
              className="input-field"
            >
              <option value="" selected>
                No. of Passengers
              </option>
              {/* Add options here */}
            </select>
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
                style={{ marginRight: "6px" }}
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
          <div className="input-group" style={{ marginTop: "4px" }}>
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
              //   style={{ marginTop: "6px", padding: "5px" }}
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
              //   style={{ marginTop: "6px", padding: "5px" }}
            />
          </div>
          <div className="">
            <select
              name="vehicleType"
              value={form.vehicleType}
              onChange={handleChange}
              className="input-field"
              //   style={{ marginTop: "6px", padding: "5px" }}
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
              //   style={{ marginTop: "6px", padding: "5px" }}
            />
            <input
              type="time"
              name="time"
              value={form.time}
              onChange={handleChange}
              className="input-field"
              //   style={{ marginTop: "6px", padding: "5px" }}
            />
          </div>
          <button
            type="submit"
            className="submit-button"
            // style={{ marginTop: "6px", padding: "5px" }}
          >
            Confirm Booking
          </button>
        </form>
      </div>
    </Layout1>
  );
};

export default Index;
