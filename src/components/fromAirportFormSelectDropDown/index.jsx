import React from "react";
import airportCoordinates from "../airportCoordinates";
import hotelCoordinates from "../hotelCoordinates";
import "../../pages/selfReqestForm/index.css";

const Index = ({ arg: { form, handleChange } }) => {
  return (
    <div>
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
          className="input-field dropdown-menu1"
          required={form.locationType === "select"}
        >
          <option value="">
            Select{form.locationType === "select" ? "*" : ""}
          </option>
          {Object.keys(airportCoordinates).map((airport) => (
            <option key={airport} value={airport}>
              {airport}
            </option>
          ))}
        </select>
      </div>
      {/* ------------------Drop Location------------------ */}
      <div className="input-group mb-2">
        <label style={{ marginLeft: "1.4rem" }}>Drop Location</label>
        <select
          name="dropLocation"
          value={form.locationType === "select" ? form.dropLocation : ""}
          onChange={handleChange}
          disabled={form.locationType !== "select"}
          className="input-field dropdown-menu1"
          required={form.locationType === "select"}
        >
          <option value="">
            Select{form.locationType === "select" ? "*" : ""}
          </option>
          {Object.keys(hotelCoordinates).map((hotel) => (
            <option key={hotel} value={hotel}>
              {hotel}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Index;
