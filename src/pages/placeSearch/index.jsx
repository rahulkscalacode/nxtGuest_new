import React, { useState, useRef, useEffect } from "react";

const App = () => {
  const [pickupCoordinates, setPickupCoordinates] = useState(null);
  const [dropCoordinates, setDropCoordinates] = useState(null);
  const [distance, setDistance] = useState(null);
  const [error, setError] = useState("");

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
      pickupRef.current,
      { types: ["establishment"] } // Use "geocode" for broader results
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
        setError("");
      } else {
        setError("No details available for the selected pickup location.");
      }
    });

    dropAutocomplete.addListener("place_changed", () => {
      const place = dropAutocomplete.getPlace();
      if (place.geometry) {
        setDropCoordinates({
          latitude: place.geometry.location.lat(),
          longitude: place.geometry.location.lng(),
        });
        setError("");
      } else {
        setError("No details available for the selected drop-off location.");
      }
    });
  };

  const calculateDistance = async () => {
    if (pickupCoordinates && dropCoordinates) {
      const origin = `${pickupCoordinates.latitude},${pickupCoordinates.longitude}`;
      const destination = `${dropCoordinates.latitude},${dropCoordinates.longitude}`;

      try {
        const response = await fetch(
          `${process.env.REACT_APP_NXTGUEST_API_URI}/limoanywhere/distance?origins=${origin}&destinations=${destination}`
        );
        const data = await response.json();

        if (data.rows[0].elements[0].status === "OK") {
          const distanceText = data.rows[0].elements[0].distance.text;
          const distanceValue = data.rows[0].elements[0].distance.value;
          setDistance({ text: distanceText, value: distanceValue });
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

  return (
    <div style={{ padding: "20px" }}>
      <h2>Calculate Distance</h2>
      <div>
        <input
          type="text"
          placeholder="Enter Pickup Location"
          ref={pickupRef}
          className="input-field"
          style={{ width: "300px", marginRight: "10px" }}
        />
      </div>
      <br />
      <div>
        <input
          type="text"
          placeholder="Enter Drop-off Location"
          ref={dropRef}
          className="input-field"
          style={{ width: "300px", marginRight: "10px" }}
        />
      </div>
      <br />
      <button
        onClick={calculateDistance}
        style={{
          padding: "10px 20px",
          background: "blue",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        Calculate Distance
      </button>
      <br />
      <br />
      {distance && (
        <p>
          Distance: <strong>{distance.text}</strong>
        </p>
      )}
      {error && (
        <p style={{ color: "red" }}>
          <strong>{error}</strong>
        </p>
      )}
    </div>
  );
};

export default App;
