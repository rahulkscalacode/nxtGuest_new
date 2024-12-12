import React, { useState } from "react";
import airportCoordinates from "../airportCoordinates";
import hotelCoordinates from "../hotelCoordinates";
import "../../pages/selfReqestForm/index.css";
import { IoChevronDown } from "react-icons/io5";

const Index = ({
  arg: {
    form,
    handleChange,
    routeData,
    setForm,
    setPickupCoordinates,
    setDropCoordinates,
  },
}) => {
  console.log(routeData);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropDropdownOpen, setDropDropdownOpen] = useState(false);

  return (
    <div style={{ marginTop: "10px" }}>
      {/* -----------------Pickup Location------------------ */}
      <div className="input-group">
        <label>
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
        <div
          className={`custom-dropdown ${
            form.locationType !== "select" ? "disabled" : ""
          }`}
          style={{
            borderRadius: "5px",
            pointerEvents: form.locationType !== "select" ? "none" : "auto",
            opacity: form.locationType !== "select" ? 0.6 : 1,
          }}
        >
          <div
            className="dropdown-header dropdownStyle"
            onClick={() => {
              if (form.locationType === "select") {
                setDropdownOpen(!dropdownOpen);
                setDropDropdownOpen(false);
              }
            }}
          >
            <div>
              {form.pickupLocation ||
                `Select Location${form.locationType === "select" ? "*" : ""}`}
            </div>
            <IoChevronDown />
          </div>
          {dropdownOpen && form.locationType === "select" && (
            <div className="dropdown-options">
              {routeData === "toAirport"
                ? Object.keys(hotelCoordinates).map((hotel) => (
                    <div
                      key={hotel}
                      className="dropdown-option"
                      onClick={() => {
                        const pickupCoordinatesData = hotelCoordinates[hotel];
                        setForm((prevForm) => ({
                          ...prevForm,
                          pickupLocation: hotel,
                          pickupCoordinatesData,
                        }));
                        setPickupCoordinates(pickupCoordinatesData);
                        setDropdownOpen(false);
                      }}
                    >
                      {hotel}
                    </div>
                  ))
                : Object.keys(airportCoordinates).map((airport) => (
                    <div
                      key={airport}
                      className="dropdown-option"
                      onClick={() => {
                        const pickupCoordinatesData =
                          airportCoordinates[airport];
                        setForm((prevForm) => ({
                          ...prevForm,
                          pickupLocation: airport,
                          pickupCoordinatesData,
                        }));
                        setPickupCoordinates(pickupCoordinatesData);
                        setDropdownOpen(false);
                      }}
                    >
                      {airport}
                    </div>
                  ))}
            </div>
          )}
        </div>
      </div>

      {/* ------------------Drop Location------------------ */}

      <div className="input-group" style={{ marginTop: "10px" }}>
        <label style={{ marginLeft: "1.4rem" }}>Drop Location</label>
        <div
          className="custom-dropdown"
          style={{
            borderRadius: "5px",
            pointerEvents: form.locationType !== "select" ? "none" : "auto",
            opacity: form.locationType !== "select" ? 0.5 : 1,
          }}
        >
          <div
            className="dropdown-header dropdownStyle"
            onClick={() => {
              if (form.locationType === "select") {
                setDropDropdownOpen(!dropDropdownOpen);
                setDropdownOpen(false);
              }
            }}
          >
            <div>
              {form.dropLocation ||
                `Select Location${form.locationType === "select" ? "*" : ""}`}
            </div>
            <IoChevronDown />
          </div>
          {dropDropdownOpen && (
            <div className="dropdown-options">
              {routeData === "toAirport"
                ? Object.keys(airportCoordinates).map((airport) => (
                    <div
                      key={airport}
                      className="dropdown-option"
                      onClick={() => {
                        const dropCoordinatesData = airportCoordinates[airport];
                        setForm((prevForm) => ({
                          ...prevForm,
                          dropLocation: airport,
                          dropCoordinatesData,
                        }));
                        setDropCoordinates(dropCoordinatesData);
                        setDropDropdownOpen(false);
                      }}
                    >
                      {airport}
                    </div>
                  ))
                : Object.keys(hotelCoordinates).map((hotel) => (
                    <div
                      key={hotel}
                      className="dropdown-option"
                      onClick={() => {
                        const dropCoordinatesData = hotelCoordinates[hotel];
                        setForm((prevForm) => ({
                          ...prevForm,
                          dropLocation: hotel,
                          dropCoordinatesData,
                        }));
                        setDropCoordinates(dropCoordinatesData);
                        setDropDropdownOpen(false);
                      }}
                    >
                      {hotel}
                    </div>
                  ))}
            </div>
          )}
        </div>
      </div>

      {/* <div className="input-group mb-2">
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
          {routeData === "toAirport"
            ? Object.keys(airportCoordinates).map((airport) => (
                <option key={airport} value={airport}>
                  {airport}
                </option>
              ))
            : Object.keys(hotelCoordinates).map((hotel) => (
                <option key={hotel} value={hotel}>
                  {hotel}
                </option>
              ))}
        </select>
      </div> */}
    </div>
  );
};

export default Index;
