import React, { useState, useEffect, useMemo, useRef } from "react";
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
import CalculatePrice from "../../components/calculatePrice";

const Index = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const cookies = new Cookies();
  const [value, setValue] = useState("00:00");
  const [serviceDisable, setServiceDisable] = useState(false);
  const today = new Date();
  const [minTime, setMinTime] = useState(today);

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
         setPickupCoordinates({
           latitude: place.geometry.location.lat(),
           longitude: place.geometry.location.lng(),
         });
         setForm((prevForm) => ({
           ...prevForm,
           pickupLocation: place.formatted_address,
         }));
         setError("");
       } else {
         setError("No details available for the selected place.");
       }
     });
 
     dropAutocomplete.addListener("place_changed", () => {
       const place = dropAutocomplete.getPlace();
       if (place.geometry) {
         setDropCoordinates({
           latitude: place.geometry.location.lat(),
           longitude: place.geometry.location.lng(),
         });
         setForm((prevForm) => ({
           ...prevForm,
           dropLocation: place.formatted_address,
         }));
         setError("");
       } else {
         setError("No details available for the selected place.");
       }
     });
   };
   //-----------------Calculate Distance from google api---------------------
   const calculateDistance = async () => {
     // console.log("helloo==========");
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
         } else {
           setError("Unable to calculate distance. Please check the locations.");
         }
       } catch (err) {
         setError("Error calculating distance. Please try again later.");
       }
     } else {
       setError("Please select both pickup and drop-off locations.");
     }
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
    setServiceDisable(true);

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
        passenger_count: form.numberOfPassengers || "1",
        luggage_count: form.luggage_count || "",
        billing_contact: {
          first_name: form.firstName,
          last_name: form.lastName,
          Company: form.companyName,
          phone: `+1${form?.contactNumber}`,
          email: form?.email || "",
        },
        service_type: form?.service_type || "205683",
        vehicle_type: "118351",
      };

      console.log("bodyy=======????>>>>>", body, pickupDateTime);

      if (body) {
        localStorage.setItem("registerdata", JSON.stringify(body));
      }
    }

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

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await calculateDistance();
    if (error) {
      console.error("Distance calculation failed:", error);
      return;
    }
    if (Object.keys(previousData).length > 0) {
      handleUpdateData(e);
    } else {
      handleSubmit(e);
    }
  };

  return (
    <Layout1 footer={<Footer />}>
      <div className="form-wrapper">
        <div className="head">Service Request</div>
        <form
          onSubmit={handleFormSubmit}
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
              ref={pickupRef}
              // value={form.locationType === "manual" ? form.pickupLocation : ""}
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
              // value={form.locationType === "manual" ? form.dropLocation : ""}
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
              <option value="118351">Car</option>
              <option value="118352">SUV</option>
              <option value="118353">Escalade</option>
              <option value="Mini Bus">Mini Bus</option>
              <option value="Motor Coach">Motor Coach</option>
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
