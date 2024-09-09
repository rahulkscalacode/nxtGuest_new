import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import TimePicker from "react-time-picker";
import { CiCalendarDate } from "react-icons/ci";
import "./index.css";

const Index = ({
  arg: { form, value, handleDateChange, handleTimeChange, minTime },
}) => {
  return (
    <div className="d-flex gap-2 ">
      <div className="d-flex position-relative">
        <DatePicker
          className="input-field"
          name="dateOfRide"
          selected={form.dateOfRide}
          onChange={handleDateChange}
          dateFormat="MM/dd/yy"
          placeholderText="MM/DD/YY"
          // style={{ padding: "6px" }}
          required
          minDate={new Date()}
        />
        <CiCalendarDate style={{ fontSize: "25px" }} className="calendericon" />
      </div>
      <div className="widthTimePicker">
        <TimePicker
          className="input-field p-1"
          onChange={handleTimeChange}
          value={value}
          amPmAriaLabel="AM"
          format="h:mm a"
          disableClock={true}
          required
          minTime={minTime}
        />
      </div>
    </div>
  );
};

export default Index;
