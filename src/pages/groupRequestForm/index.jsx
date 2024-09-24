import React, { useState, useEffect, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Layout1 from "../../components/layout1";
import Footer from "../../components/footer";
import "../selfReqestForm/index.css";
import {
  groupServiceReqest,
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
    groupName: previousData.groupName || "",
    occasion: previousData.occasion || "",
    companyName: previousData.companyName || "",
    email: previousData.email || "",
    contactNumber: previousData.contactNumber || "",
    locationType: previousData.locationType || "select",
    pickupLocation: previousData.pickupLocation || "",
    dropLocation: previousData.dropLocation || "",
    vehicleType: previousData.vehicleType || "",
    dateOfRide: previousData.dateOfRide || "",
    dateOfBooking: previousData.dateOfBooking || new Date().toString(),
    time: previousData.time || value ? value : "",
    userId: cookies.get("userId"),
    type: "group",
    numberOfPassengers: previousData.numberOfPassengers || "",
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
  };

  const passengerOptions = Array.from({ length: 20 }, (_, index) => index + 1);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await groupServiceReqest(form)
        .then((res) => {
          console.log("res=>>", res);
          const serializableData = {
            data: res.data,
          };
          localStorage.setItem(
            "guestService",
            JSON.stringify(serializableData)
          );
          cookies.set("phone", res.data.data?.contactNumber);
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
          console.log(res);
          const serializableData = {
            data: res.data,
          };
          localStorage.setItem(
            "guestService",
            JSON.stringify(serializableData)
          );
          cookies.set("phone", res.data.data?.contactNumber);
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
          <div className="">
            <input
              type="text"
              name="groupName"
              placeholder="Guest Name*"
              value={form.groupName}
              onChange={handleChange}
              className="input-field"
              autoComplete="new-email"
              required
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
              placeholder="Email Address*"
              value={form.email}
              onChange={handleChange}
              className="input-field"
              autoComplete="new-email"
              required
            />
          </div>

          {/* -------------Contact Number---------- */}
          <div className="input-group">
            <input
              type="tel"
              name="contactNumber"
              placeholder="Contact Number*"
              value={form.contactNumber}
              onChange={(e) => {
                const newValue = e.target.value.replace(/\D/g, "");
                setForm((prevData) => ({
                  ...prevData,
                  contactNumber: newValue,
                }));
              }}
              onKeyDown={(e) => {
                if (e.key === "." || e.key === "-" || e.key === "e") {
                  e.preventDefault();
                }
              }}
              className="input-field"
              autoComplete="new-email"
              required
            />
            <select
              name="numberOfPassengers"
              value={form.numberOfPassengers}
              onChange={handleChange}
              disabled={form.locationType !== "select"}
              className="input-field"
              required
            >
              <option value="" disabled selected>
                No. of Passengers*
              </option>
              {passengerOptions.map((val) => (
                <option key={val} value={val}>
                  {val}
                </option>
              ))}
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
              <option value="Car">Car</option>
              <option value="Suv">SUV</option>
              <option value="Mini Bus">Mini Bus</option>
              <option value="Motor Coach">Motor Coach</option>
              {/* Add options here */}
            </select>
          </div>

          <DateAndTime
            arg={{ form, value, handleDateChange, handleTimeChange, minTime }}
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
