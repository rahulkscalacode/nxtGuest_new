import React, { useState, useEffect, useMemo, useRef } from "react";
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
import CalculatePrice from "../../components/calculatePrice";
import FormSelectDropDown from "../../components/fromAirportFormSelectDropDown";
import airportCoordinates from "../../components/airportCoordinates";
import hotelCoordinates from "../../components/hotelCoordinates";
import { useDispatch } from "react-redux";
import { loaderReducer } from "../../components/toolkit/loader";
import { validateName, validateEmail } from "../../validations";

const Index = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const cookies = new Cookies();
  const [value, setValue] = useState("00:00");
  const [serviceDisable, setServiceDisable] = useState(false);
  const today = new Date();
  const dispatch = useDispatch();
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
    if (pickupCoordinates && dropCoordinates) {
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

          console.log("distanceMiles==>", distanceMiles);
          setDistance({ text: `${distanceMiles} miles`, value: distanceMiles });
          setError("");
        } else if (data.rows[0].elements[0].status === "ZERO_RESULTS") {
          setError("No route found between the selected locations.");
          return;
        } else {
          setError("Unable to calculate distance. Please check the locations.");
        }
      } catch (err) {
        setError("Error calculating distance. Please try again later.");
      }
    } else {
      setError("Please select both pickup and drop-off locations.");
    }
    return null;
  };

  console.log(
    "distance=>",
    distance,
    "setPickupCoordinates===>>>",
    pickupCoordinates,
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
    total_fare:
      (afterTotalFare && afterTotalFare) || previousData?.total_fare || "",
    pickupCoordinatesData: previousData?.pickupCoordinatesData || null,
    dropCoordinatesData: previousData?.dropCoordinatesData || null,
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
    if (
      newDate.getDate() === today.getDate() &&
      newDate.getMonth() === today.getMonth() &&
      newDate.getFullYear() === today.getFullYear()
    ) {
      setMinTime(today); // Set minTime to current time for today
    } else {
      setMinTime(null); // Allow any time for future dates
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

    if (name === "firstName" || name === "lastName") {
      const regex = /^[A-Za-z\s]*$/;
      if (!regex.test(value)) return;
    } else if (name === "email") {
      setError(validateEmail(value));
    }

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
          Company: form.companyName,
          phone: `+1${form?.contactNumber}`,
          email: form?.email || "",
        },
        passenger_count: form.passenger_count || "1",
        luggage_count: form.luggage_count || "",
        billing_contact: {
          first_name: form.firstName,
          last_name: form.lastName,
          Company: form.companyName,
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

    //No name validation
    if (updatedForm?.firstName.trim().length === 0) {
      dispatch(loaderReducer(false));
      return toast.error("First name is required!");
    }

    if (updatedForm.total_fare) {
      try {
        dispatch(loaderReducer(true));
        console.log("Payload being sent to API:", updatedForm);
        await otherServiceReqest(updatedForm)
          .then((res) => {
            dispatch(loaderReducer(false));
            console.log("res=>>", res);
            const serializableData = {
              data: res.data,
            };
            localStorage.setItem(
              "guestService",
              JSON.stringify(serializableData)
            );
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
        toast.error("Something went wrong!", error);
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

    //No name validation
    if (updatedForm?.firstName.trim().length === 0) {
      dispatch(loaderReducer(false));
      return toast.error("First name is required!");
    }

    if (updatedForm.total_fare) {
      try {
        dispatch(loaderReducer(true));
        console.log("Updated Form data before update:", updatedForm);
        await updateServiceForm(updatedForm, previousData._id)
          .then((res) => {
            dispatch(loaderReducer(false));
            const serializableData = {
              data: res.data,
            };
            localStorage.setItem(
              "guestService",
              JSON.stringify(serializableData)
            );
            cookies.set("phone", res.data.data.contactNumber);
            toast.success("Successfully updated self service request form.");
            navigate("/booking-summary", {
              state: {
                data: serializableData,
                previousRoute: location.pathname,
              },
            });
          })
          .catch((err) => {
            console.log(err);
            dispatch(loaderReducer(false));
            setServiceDisable(true);
            toast.error("Something went wrong!");
          });
      } catch (error) {
        dispatch(loaderReducer(false));
        toast.error(error);
        setServiceDisable(true);
      }
    }
  };

  if (form?.total_fare) {
    localStorage.setItem("total_fare", form?.total_fare);
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

  // console.log("form==>>", form);
  return (
    <Layout1 footer={<Footer />}>
      <div className="form-wrapper">
        <div className="head">Service Request</div>
        <form onSubmit={handleFormSubmit} autoComplete="off">
          <div className="input-group">
            <input
              type="text"
              name="firstName"
              placeholder="Guest First Name*"
              value={form.firstName}
              onChange={handleChange}
              className="input-field"
              autoComplete="new-email"
              minLength={2}
              maxLength={25}
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
            />
          </div>
          <div className="">
            <input
              type="tel"
              name="contactNumber"
              placeholder="Guest Contact Number*"
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
              minLength={7}
              maxLength={13}
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
              minLength={2}
              maxLength={30}
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
            </select>
          </div>

          <CalculatePrice
            arg={{ distance, form, setForm }}
            onPriceUpdate={(price) =>
              setForm((prev) => ({ ...prev, total_fare: price }))
            }
          />
          <DateAndTime
            arg={{ form, value, handleDateChange, handleTimeChange, minTime }}
          />
          <button
            type="submit"
            className="submit-button"
            disabled={serviceDisable}
            style={{ marginTop: "15px", padding: "5px" }}
          >
            Confirm Booking
          </button>
        </form>
      </div>
    </Layout1>
  );
};

export default Index;
