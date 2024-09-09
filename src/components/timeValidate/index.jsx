import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

const TimeValidator = ({ value, dateOfRide, onValidTime, minTime }) => {
  const today = new Date();
  const [error, setError] = useState("");

  const validateTime = (selectedTime) => {
    const currentTime = new Date(); // Get the current time
    const selectedDateTime = new Date(dateOfRide); // Ensure ride date is valid

    // If the date of ride is today, validate that the time is not in the past
    if (
      selectedDateTime.getDate() === today.getDate() &&
      selectedDateTime.getMonth() === today.getMonth() &&
      selectedDateTime.getFullYear() === today.getFullYear()
    ) {
      const [hours, minutes] = selectedTime.split(":");
      const meridian = selectedTime.split(" ")[1]; // AM/PM
      const isPM = meridian === "PM" && hours !== "12";
      selectedDateTime.setHours(
        isPM ? parseInt(hours, 10) + 12 : parseInt(hours, 10)
      ); // Handle AM/PM
      selectedDateTime.setMinutes(parseInt(minutes.split(" ")[0], 10));

      // If the selected time is in the past, show error toast and stop further actions
      if (selectedDateTime < currentTime) {
        setError("Invalid time! Please select a future time.");
        toast.error("Invalid time! Please select a future time.");
        return false;
      } else {
        setError(""); // Clear the error if the time is valid
        return true;
      }
    }
    return true;
  };

  useEffect(() => {
    if (value) {
      const isValid = validateTime(value);
      onValidTime(isValid);
    }
  }, [value]);
};

export default TimeValidator;
