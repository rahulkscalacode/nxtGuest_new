import React, { useState, useEffect, useMemo, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom"
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
import TimeValidator from "../../components/timeValidate";
import CalculatePrice from "../../components/calculatePrice";
import FormSelectDropDown from "../../components/fromAirportFormSelectDropDown";
import airportCoordinates from "../../components/airportCoordinates";
import hotelCoordinates from "../../components/hotelCoordinates";
import { useDispatch } from "react-redux";
import { loaderReducer } from "../../components/toolkit/loader";
import {userTotalFare} from "../../components/toolkit/totalFare";

// ----------
const Index = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const cookies = new Cookies();
  const dispatch = useDispatch();
  const [value, setValue] = useState("00:00");
  const [serviceDisable, setServiceDisable] = useState(false);
  const today = new Date();
  const [minTime, setMinTime] = useState(today);
  const { routeData } = location.state || {};

  //--------------------Coordinates fetch api---------------------------------
  const [pickupCoordinates, setPickupCoordinates] = useState(null);
  const [dropCoordinates, setDropCoordinates] = useState(null);
  const [error, setError] = useState("");
  const [distance, setDistance] = useState(null);

  const pickupRef = useRef(null);
  const dropRef = useRef(null);

  useEffect(() => {
    // Check if Google Maps API has loaded, then initialize autocomplete for each input
    const interval = setInterval(() => {
      if (window.google && window.google.maps) {
        clearInterval(interval);
        initializeAutocomplete();
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const initializeAutocomplete = () => {
    const pickupAutocomplete = new window.google.maps.places.Autocomplete(
      pickupRef?.current,
      { types: ["establishment"] } // For broader location types
    );

    const dropAutocomplete = new window.google.maps.places.Autocomplete(
      dropRef.current,
      { types: ["establishment"] }
    );

    pickupAutocomplete.addListener("place_changed", () => {
      const place = pickupAutocomplete.getPlace();
      if (place.geometry) {
        const coordinates = {
          latitude: place.geometry.location.lat(),
          longitude: place.geometry.location.lng(),
        };
        if (coordinates) {
          setForm((prevForm) => ({
            ...prevForm,
            pickupLocation: place.formatted_address,
            pickupCoordinatesData: coordinates,
          }));
          setPickupCoordinates(coordinates);
        }
        setError("");
      } else {
        setError("No details available for the selected place.");
      }
    });

    dropAutocomplete.addListener("place_changed", () => {
      const place = dropAutocomplete.getPlace();
      if (place.geometry) {
        const coordinates = {
          latitude: place.geometry.location.lat(),
          longitude: place.geometry.location.lng(),
        };
        if (coordinates) {
          setForm((prevForm) => ({
            ...prevForm,
            dropLocation: place.formatted_address,
            dropCoordinatesData: coordinates,
          }));
          setDropCoordinates(coordinates);
        }
        setError("");
      } else {
        setError("No details available for the selected place.");
      }
    });
  };
  //-----------------Calculate Distance from google api---------------------
  const calculateDistance = async () => {
    dispatch(loaderReducer(true));
    if (pickupCoordinates && dropCoordinates) {
      console.log("2handleFormSubmit==>>>");
      const origin = `${pickupCoordinates.latitude},${pickupCoordinates.longitude}`;
      const destination = `${dropCoordinates.latitude},${dropCoordinates.longitude}`;
      console.log("origin==>>", origin, destination);
      try {
        const response = await fetch(
          `${process.env.REACT_APP_NXTGUEST_API_URI}/limoanywhere/distance?origins=${origin}&destinations=${destination}`
        );
        const data = await response.json();

        if (data.rows[0].elements[0].status === "OK") {
          const distanceMeters = data.rows[0].elements[0].distance.value;
          const distanceMiles = (distanceMeters * 0.000621371).toFixed(2);

          dispatch(loaderReducer(false));
          setDistance({ text: `${distanceMiles} miles`, value: distanceMiles });
          setError("");
        } else if (data.rows[0].elements[0].status === "ZERO_RESULTS") {
          setError("No route found between the selected locations.");
          dispatch(loaderReducer(false));
          return;
        } else {
          setError("Unable to calculate distance. Please check the locations.");
          dispatch(loaderReducer(false));
        }
      } catch (err) {
        setError("Error calculating distance. Please try again later.");
        dispatch(loaderReducer(false));
      }
    } else {
      setError("Please select both pickup and drop-off locations.");
      dispatch(loaderReducer(false));
    }
    return null;
  };

  console.log(
    "distance=>",
    distance,
    "setPickupCoordinates===>>>",
    pickupCoordinates,
    "setdropCoordinates===>>>",
    dropCoordinates
  );

  //--------------------Coordinates fetch api---------------------------------

  const previousData = useMemo(
    () => location.state?.data || {},
    [location.state?.data]
  );

  useEffect(() => {
    // console.log("Received data:", previousData);
    setPickupCoordinates(previousData?.pickupCoordinatesData);
    setDropCoordinates(previousData?.dropCoordinatesData);
  }, [previousData]);

  const afterTotalFare = localStorage.getItem("total_fare");

  const [form, setForm] = useState({
    firstName: previousData?.firstName || "",
    lastName: previousData?.lastName || "",
    contactNumber: previousData?.contactNumber || "",
    email: previousData?.email || "",
    locationType: previousData?.locationType || "select",
    pickupLocation: previousData?.pickupLocation || "",
    dropLocation: previousData?.dropLocation || "",
    vehicleType: previousData?.vehicleType || "",
    dateOfRide: previousData?.dateOfRide || "",
    dateOfBooking: previousData?.dateOfBooking || new Date().toString(),
    time: previousData?.time || value,
    userId: cookies.get("userId"),
    type: "self",
    total_fare:
      (afterTotalFare && afterTotalFare) || previousData?.total_fare || "",
    pickupCoordinatesData: previousData?.pickupCoordinatesData || {},
    dropCoordinatesData: previousData?.dropCoordinatesData || {},
  });

  useEffect(() => {
    if (location.state && location.state.data) {
      setForm((prevForm) => ({
        ...prevForm,
        ...location.state.data,
      }));
    }
  }, [location.state]);

  const handleDateChange = (selectedDate) => {
    const newDate = new Date(selectedDate);
    setForm((prevForm) => ({
      ...prevForm,
      dateOfRide: newDate,
    }));

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset today's time to midnight for comparison

    if (newDate.getTime() === today.getTime()) {
      const currentTime = new Date();
      setMinTime(currentTime); // Set minTime to the current time
    } else {
      setMinTime(new Date(0, 0, 0, 0, 0, 0, 0)); // Allow any time (start from 12:00 AM)
    }
  };

  const handleTimeChange = (selectedTime) => {
    // console.log("selectedTime==>>", selectedTime);
    setValue(selectedTime);
    setForm((prevForm) => ({
      ...prevForm,
      time: selectedTime, // Set time as a string in "HH:MM" format
    }));
    setServiceDisable(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "locationType") {
      setForm((prev) => ({
        ...prev,
        locationType: value,
        pickupLocation: "",
        dropLocation: "",
        pickupCoordinatesData: null,
        dropCoordinatesData: null,
      }));
      setServiceDisable(false);
    } else if (name === "pickupLocation") {
      let pickupCoordinatesData = null;
      if (form.locationType === "select") {
        pickupCoordinatesData =
          routeData === "toAirport"
            ? hotelCoordinates[value]
            : airportCoordinates[value] || null;
      }

      setForm((prev) => ({
        ...prev,
        pickupLocation: value,
        pickupCoordinatesData,
      }));
      setPickupCoordinates(pickupCoordinatesData);
    } else if (name === "dropLocation") {
      let dropCoordinatesData = null;
      if (form.locationType === "select") {
        dropCoordinatesData =
          routeData === "toAirport"
            ? airportCoordinates[value]
            : hotelCoordinates[value] || null;
      }

      setForm((prev) => ({
        ...prev,
        dropLocation: value,
        dropCoordinatesData,
      }));
      setDropCoordinates(dropCoordinatesData);
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
      setServiceDisable(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServiceDisable(true);
    dispatch(loaderReducer(true));

    // Construct body object from form data
    if (form) {
      const pickupDateTime = new Date(
        `${form.dateOfRide.toISOString().split("T")[0]}T${form.time}:00`
      ).toISOString();

      const dropoffDateTime = new Date(
        new Date(pickupDateTime).getTime() + 6 * 60 * 60 * 1000
      ).toISOString();

      const body = {
        userId: cookies.get("userId"),
        company_alias: "",
        pickup_Date_Time: pickupDateTime,
        dropoff_date_time: dropoffDateTime,
        rate_id: "12345678",
        total_fare: form?.total_fare,
        pickup: {
          name: form.pickupLocation,
          airport_iata_code: "",
          airline_iata_code: "",
          flight_number: "",
          location: {
            latitude: pickupCoordinates?.latitude,
            longitude: pickupCoordinates?.longitude,
          },
        },
        drop_off: {
          name: form?.dropLocation || "",
          airport_iata_code: "",
          airline_iata_code: "",
          flight_number: "",
          location: {
            latitude: dropCoordinates?.latitude || "",
            longitude: dropCoordinates?.longitude || "",
          },
        },
        passenger: {
          first_name: form.firstName,
          last_name: form.lastName,
          Company: "",
          phone: `+1${form?.contactNumber}`,
          email: form?.email || "",
        },
        passenger_count: form.passenger_count || "1",
        luggage_count: form.luggage_count || "",
        billing_contact: {
          first_name: form.firstName,
          last_name: form.lastName,
          Company: "",
          phone: `+1${form?.contactNumber}`,
          email: form?.email || "",
        },
        service_type: form?.service_type || "205683",
        vehicle_type: form?.vehicleType,
      };

      console.log("bodyy=======????>>>>>", body, pickupDateTime);

      if (body) {
        localStorage.setItem("registerdata", JSON.stringify(body));
      }
    }
    const totalFare = localStorage.getItem("total_fare");

    const updatedForm = {
      ...form,
      total_fare: totalFare || form.total_fare,
    };

    if (updatedForm.total_fare) {
      try {
        dispatch(loaderReducer(true));
        await selfserviceReqest(updatedForm)
          .then((res) => {
            dispatch(loaderReducer(false));
            // console.log("res=>>", res);
            const serializableData = {
              data: res.data,
            };
            localStorage.setItem("guestService", JSON.stringify(updatedForm));
            cookies.set("phone", res.data.data.contactNumber);
            toast.success("Successfully created self service request form.");
            navigate("/booking-summary", {
              state: {
                data: serializableData,
                previousRoute: location.pathname,
              },
            });
          })
          .catch((err) => {
            dispatch(loaderReducer(false));
            setServiceDisable(true);
            toast.error("Something went wrong!");
          });
      } catch (error) {
        dispatch(loaderReducer(false));
        setServiceDisable(true);
      }
    }
  };

  const handleUpdateData = async (e) => {
    e.preventDefault();
    dispatch(loaderReducer(true));
    const totalFare = localStorage.getItem("total_fare");
    const updatedForm = {
      ...form,
      total_fare: totalFare || form.total_fare,
    };

    if (updatedForm.total_fare) {
      try {
        await updateServiceForm(updatedForm, previousData._id)
          .then((res) => {
            dispatch(loaderReducer(false));
            const serializableData = {
              data: res.data,
            };
            toast.success("Successfully updated self service request form.");
            localStorage.setItem(
              "guestService",
              JSON.stringify(serializableData)
            );
            cookies.set("phone", res.data.data.contactNumber);
            navigate("/booking-summary", {
              state: {
                data: serializableData,
                previousRoute: location.pathname,
              },
            });
          })
          .catch((err) => {
            dispatch(loaderReducer(false));
            setServiceDisable(true);
            toast.error("Something went wrong!");
          });
      } catch (error) {
        setServiceDisable(true);
        toast.error(error);
        dispatch(loaderReducer(false));
      }
    }
  };

  if (form?.total_fare) {
    localStorage.setItem("total_fare", form?.total_fare);
    // dispatch(userTotalFare(form.total_fare));
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await calculateDistance();

    if (error) {
      toast.error(error);
      console.log("Distance calculation failed:", error);
      return;
    }
    setTimeout(() => {
      const totalFare = localStorage.getItem("total_fare");

      if (form.total_fare || totalFare) {
        if (Object.keys(previousData).length > 0) {
          handleUpdateData(e); // Update existing data
        } else {
          handleSubmit(e); // Submit new data
        }
      } else {
        toast.error("Total fare not set. Cannot proceed.");
      }
    }, 10);
  };

  console.log("form==>>", form);

  return (
    <Layout1 footer={<Footer />}>
      <div className="form-wrapper">
        <div className="head">Service Request</div>
        <form onSubmit={handleFormSubmit} autoComplete="off">
          <div className="d-flex gap-2">
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
              minLength={7}
              maxLength={13}
              onKeyDown={(e) => {
                if (e.key === "." || e.key === "-" || e.key === "e") {
                  e.preventDefault();
                }
              }}
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

          {/*------------- Form DropDown ---------------*/}

          <FormSelectDropDown
            arg={{
              form,
              handleChange,
              setForm,
              routeData,
              setPickupCoordinates,
              setDropCoordinates,
            }}
          />

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
              ref={pickupRef}
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
              ref={dropRef}
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
              style={{ padding: "6px" }}
            >
              <option value="" disabled>
                Vehicle Type*
              </option>
              <option value="154479">Sedan</option>
              <option value="155644">SUV</option>
              <option value="155645">Mini Bus</option>
              <option value="155647">Motor Coach</option>
              <option value="155648">Executive Sprinter</option>
              <option value="155649">VIP Sprinter</option>
              {/* Add options here */}
            </select>
          </div>

          <DateAndTime
            arg={{ form, value, handleDateChange, handleTimeChange, minTime }}
          />
          <CalculatePrice
            arg={{ distance, form, setForm }}
            onPriceUpdate={(price) =>
              setForm((prev) => ({ ...prev, total_fare: price }))
            }
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
