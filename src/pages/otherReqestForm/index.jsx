import React, { useState, useEffect, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Layout1 from "../../components/layout1";
import Footer from "../../components/footer";
import {
  otherServiceReqest,
  updateServiceForm,
} from "../../functions/api/serviceReqest";
import { toast } from "react-toastify";
import Cookies from "universal-cookie";
import DateAndTime from "../../components/dateAndTime";

const Index = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const cookies = new Cookies();
  const [value, setValue] = useState("00:00");

  const previousData = useMemo(
    () => location.state?.data || {},
    [location.state?.data]
  );

  useEffect(() => {
    console.log("Received data:", previousData);
  }, [previousData]);

  const [form, setForm] = useState({
    firstName: previousData.firstName || "",
    lastName: previousData.lastName || "",
    contactNumber: previousData.contactNumber || "",
    email: previousData.email || "",
    companyName: previousData.companyName || "",
    locationType: previousData.locationType || "select",
    pickupLocation: previousData.pickupLocation || "",
    dropLocation: previousData.dropLocation || "",
    vehicleType: previousData.vehicleType || "",
    dateOfRide: previousData.dateOfRide || "",
    dateOfBooking: previousData.dateOfBooking || new Date().toString(),
    time: previousData.time || value ? value : "",
    userId: cookies.get("userId"),
    type: "other",
  });

  useEffect(() => {
    if (location.state && location.state.data) {
      setForm((prevForm) => ({
        ...prevForm,
        ...location.state.data,
      }));
    }
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleDateChange = (value) => {
    setForm({ ...form, dateOfRide: value });
  };

  const handleTimeChange = (value) => {
    setValue(value);
    setForm({ ...form, time: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await otherServiceReqest(form)
        .then((res) => {
          console.log("res=>>", res);
          const serializableData = {
            data: res.data,
          };
          localStorage.setItem("service", serializableData);
          toast.success("Successfully created self service request form.");
          navigate("/booking-summary", {
            state: { data: serializableData, previousRoute: location.pathname },
          });
        })
        .catch((err) => {
          toast.error("Something went wrong!");
        });
    } catch (error) {
      console.log("error=>>>", error);
    }
  };
  const handleUpdateData = async (e) => {
    e.preventDefault();
    try {
      console.log("Form data before update:", form);

      await updateServiceForm(form, previousData._id)
        .then((res) => {
          const serializableData = {
            data: res.data,
          };
          toast.success("Successfully updated self service request form.");
          navigate("/booking-summary", {
            state: { data: serializableData, previousRoute: location.pathname },
          });
        })
        .catch((err) => {
          console.log(err);
          toast.error("Something went wrong!");
        });
    } catch (error) {
      toast.error(error);
    }
  };
  console.log(form);
  return (
    <Layout1 footer={<Footer />}>
      <div className="form-wrapper">
        <div className="head">Service Request</div>
        <form
          onSubmit={
            Object.keys(previousData).length > 0
              ? handleUpdateData
              : handleSubmit
          }
          autoComplete="off"
        >
          <div className="input-group">
            <input
              type="text"
              name="firstName"
              placeholder="Guest First Name"
              value={form.firstName}
              onChange={handleChange}
              className="input-field"
              autoComplete="new-email"
              //   style={{ marginTop: "1px", padding: "5px" }}
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder="Guest Last Name"
              value={form.lastName}
              onChange={handleChange}
              className="input-field"
              autoComplete="new-email"
              //   style={{ marginTop: "1px", padding: "5px" }}
            />
          </div>
          <div className="">
            <input
              type="text"
              name="contactNumber"
              placeholder="Guest Contact Number"
              value={form.contactNumber}
              onChange={handleChange}
              className="input-field"
              autoComplete="new-email"
              //   style={{ marginTop: "6px", padding: "5px" }}
            />
          </div>
          <div className="">
            <input
              type="email"
              name="email"
              placeholder="Guest Email Address"
              value={form.email}
              onChange={handleChange}
              className="input-field"
              autoComplete="new-email"
              //   style={{ marginTop: "6px", padding: "5px" }}
            />
          </div>
          <div className="">
            <input
              type="text"
              name="companyName"
              placeholder="Company Name"
              value={form.companyName}
              onChange={handleChange}
              className="input-field"
              autoComplete="new-email"
              //   style={{ marginTop: "6px", padding: "5px" }}
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

          <DateAndTime
            arg={{ form, value, handleDateChange, handleTimeChange }}
          />

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
