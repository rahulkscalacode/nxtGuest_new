import React from "react";
import { RxCross2 } from "react-icons/rx";
import "./addCard.css";

const AddCardPopup = ({ toggleModal, showModal }) => {
  return (
    <div
      className="card-container"
      style={showModal ? { display: "block" } : { display: "none" }}
    >
      <div className="card-header1">
        <div className="heading">Add Card</div>
        <button className="close-button" onClick={toggleModal}>
          <RxCross2 />
        </button>
      </div>
      <form className="card-form mt-2" autoComplete="off">
        <div className="">
          <label>Card Number</label>
          {/* <div className="card-number"  > */}
          <input
            type="number"
            autoComplete="new-password"
            className="input-field"
          />
          {/* </div> */}
        </div>
        <div className="form-row mt-2">
          <div className="">
            <label>Expiry Date</label>
            <input
              type="date"
              autoComplete="new-password"
              className="input-field"
            />
          </div>
          <div className="">
            <label>CVV / CVC</label>
            <input
              type="password"
              autoComplete="new-password"
              className="input-field"
            />
          </div>
        </div>
        <div className="form-actions mt-3">
          <button type="button" className="cancel-button">
            Cancel
          </button>
          <button type="submit" className="save-button">
            Save Card
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCardPopup;
