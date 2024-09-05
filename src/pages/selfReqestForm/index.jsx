import React, { useState, useEffect, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  selfserviceReqest,
  updateServiceForm,
} from "../../functions/api/serviceReqest";
import { toast } from "react-toastify";
import Layout1 from "../../components/layout1";
import Footer from "../../components/footer";
import "./index.css";
import Cookies from "universal-cookie";
import DateAndTime from "../../components/dateAndTime";

const Index = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const cookies = new Cookies();
  const [value, setValue] = useState("00:00");
  const [serviceDisable, setServiceDisable] = useState(false);

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
    locationType: previousData.locationType || "select",
    pickupLocation: previousData.pickupLocation || "",
    dropLocation: previousData.dropLocation || "",
    vehicleType: previousData.vehicleType || "",
    dateOfRide: previousData.dateOfRide || "",
    dateOfBooking: previousData.dateOfBooking || new Date().toString(),
    time: previousData.time || value,
    userId: cookies.get("userId"),
    type: "self",
  });

  useEffect(() => {
    if (location.state && location.state.data) {
      setForm((prevForm) => ({
        ...prevForm,
        ...location.state.data,
      }));
    }
  }, [location.state]);

  const handleDateChange = (value) => {
    setForm({ ...form, dateOfRide: value });
    setServiceDisable(false);
  };

  const handleTimeChange = (value) => {
    setValue(value);
    setForm({ ...form, time: value });
    setServiceDisable(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "locationType") {
      if (value === "manual") {
        setForm({
          ...form,
          locationType: value,
          pickupLocation: "",
          dropLocation: "",
        });
        setServiceDisable(false);
      } else if (value === "select") {
        setForm({
          ...form,
          locationType: value,
          pickupLocation: "",
          dropLocation: "",
        });
        setServiceDisable(false);
      }
    } else {
      setForm({
        ...form,
        [name]: value,
      });
      setServiceDisable(false);
    }
  };

  // console.log("serviceDisable", serviceDisable);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await selfserviceReqest(form)
        .then((res) => {
          console.log("res=>>", res);
          const serializableData = {
            data: res.data,
          };
          localStorage.setItem(
            "guestService",
            JSON.stringify(serializableData)
          );
          toast.success("Successfully created self service request form.");
          navigate("/booking-summary", {
            state: { data: serializableData, previousRoute: location.pathname },
          });
        })
        .catch((err) => {
          console.log(err);
          setServiceDisable(true);
          toast.error("Something went wrong!");
        });
    } catch (error) {
      console.log("error=>>>", error);
      setServiceDisable(true);
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
          localStorage.setItem(
            "guestService",
            JSON.stringify(serializableData)
          );
          navigate("/booking-summary", {
            state: { data: serializableData, previousRoute: location.pathname },
          });
        })
        .catch((err) => {
          console.log(err);
          setServiceDisable(true);
          toast.error("Something went wrong!");
        });
    } catch (error) {
      setServiceDisable(true);
      toast.error(error);
    }
  };

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
              placeholder="First Name*"
              value={form.firstName}
              onChange={handleChange}
              className="input-field"
              autoComplete="new-email"
              required
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
              type="number"
              name="contactNumber"
              placeholder="Contact Number*"
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
              name="email"
              placeholder="Email Address*"
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
              value={form.locationType === "select" ? form.pickupLocation : ""}
              onChange={handleChange}
              disabled={form.locationType !== "select"}
              className="input-field"
              required={form.locationType === "select"}
            >
              <option value="">
                Select{form.locationType === "select" ? "*" : ""}
              </option>
              <option value="New York">New York</option>
              <option value="Miami">Miami</option>
              <option value="Florida">Florida</option>
            </select>
          </div>
          {/* ------------------Drop Location------------------ */}
          <div className="input-group ">
            <label style={{ marginLeft: "1.4rem" }}>Drop Location</label>
            <select
              name="dropLocation"
              value={form.locationType === "select" ? form.dropLocation : ""}
              onChange={handleChange}
              disabled={form.locationType !== "select"}
              className="input-field"
              required={form.locationType === "select"}
            >
              <option value="">
                Select{form.locationType === "select" ? "*" : ""}
              </option>
              <option value="New York">New York</option>
              <option value="Miami">Miami</option>
              <option value="Florida">Florida</option>
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
              placeholder={`Enter Pickup Location Manually${
                form.locationType === "manual" ? "*" : ""
              }`}
              value={form.locationType === "manual" ? form.pickupLocation : ""}
              onChange={handleChange}
              disabled={form.locationType !== "manual"}
              className="input-field"
              required={form.locationType === "manual"}
            />
          </div>
          {/* ----------------Input field----------------- */}
          <div className="">
            <input
              type="text"
              name="dropLocation"
              placeholder={`Enter Drop Location Manually${
                form.locationType === "manual" ? "*" : ""
              }`}
              value={form.locationType === "manual" ? form.dropLocation : ""}
              onChange={handleChange}
              disabled={form.locationType !== "manual"}
              className="input-field"
              required={form.locationType === "manual"}
            />
          </div>
          <div className="">
            <select
              name="vehicleType"
              value={form.vehicleType}
              onChange={handleChange}
              className="input-field"
              required
            >
              <option value="">Vehicle Type*</option>
              <option value="car">car</option>
              <option value="xuv">xuv</option>
              {/* Add options here */}
            </select>
          </div>

          <DateAndTime
            arg={{ form, value, handleDateChange, handleTimeChange }}
          />

          <button
            type="submit"
            className="submit-button"
            disabled={serviceDisable}
          >
            Confirm Booking
          </button>
        </form>
      </div>
    </Layout1>
  );
};

export default Index;
