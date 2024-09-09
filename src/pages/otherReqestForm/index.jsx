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
  const [serviceDisable, setServiceDisable] = useState(false);
  const today = new Date();
  const [minTime, setMinTime] = useState(today);

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

  const handleDateChange = (selectedDate) => {
    setForm({ ...form, dateOfRide: selectedDate });

    // If the selected date is today, set minimum time to the current time
    if (
      selectedDate.getDate() === today.getDate() &&
      selectedDate.getMonth() === today.getMonth() &&
      selectedDate.getFullYear() === today.getFullYear()
    ) {
      setMinTime(today); // Set minTime to current time for today
    } else {
      setMinTime(null); // Allow any time for future dates
    }
  };

  const handleTimeChange = (selectedTime) => {
    setValue(selectedTime);
    setForm({ ...form, time: selectedTime });
    setServiceDisable(false);
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
          setServiceDisable(true);
          toast.error("Something went wrong!");
        });
    } catch (error) {
      setServiceDisable(true);
      toast.error("Something went wrong!", error);
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
          localStorage.setItem(
            "guestService",
            JSON.stringify(serializableData)
          );
          toast.success("Successfully updated self service request form.");
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
      toast.error(error);
      setServiceDisable(true);
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
              placeholder="Guest First Name*"
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
              type="number"
              name="contactNumber"
              placeholder="Guest Contact Number*"
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
              placeholder="Guest Email Address*"
              value={form.email}
              onChange={handleChange}
              className="input-field"
              autoComplete="new-email"
              required
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
            </select>
          </div>

          <DateAndTime
            arg={{ form, value, handleDateChange, handleTimeChange, minTime }}
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
