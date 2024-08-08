import Layout1 from "../../components/layout1";
import React from "react";
import "../contactUs/index.css";

const FeedbackForm = () => {
  return (
    <Layout1>
      <div className="contact-us">
        <div className="head">Feedback/Report</div>
        <div className="form-container mt-4">
          <form>
            <div className="row">
              <label htmlFor="name" className="col-3">
                Name:
              </label>
              <input
                type="text"
                placeholder="Enter Name"
                className="col-9 input-field1"
                autoComplete="new-email"
              />
            </div>
            <div className="row">
              <label htmlFor="email" className="col-3">
                Email:
              </label>
              <input
                type="email"
                placeholder="Enter Email Address"
                className="col-9 input-field1"
                autoComplete="new-email"
              />
            </div>

            <div className="row">
              <label htmlFor="subject" className="col-3">
                Subject:
              </label>
              <input
                type="text"
                placeholder="Enter subject"
                className="col-9 input-field1"
                autoComplete="new-email"
              />
            </div>
            <div className="row">
              <label htmlFor="message" className="col-3">
                Message:
              </label>
              <textarea
                id="message"
                name="message"
                className="col-9 input-field1"
                placeholder="Enter Message"
              ></textarea>
            </div>
          </form>
        </div>
      </div>
      <div className="d-flex gap-2">
        <button type="button" className="cancel-button col-6">
          Cancel
        </button>
        <button type="submit" className="submit-button1 col-6">
          Submit
        </button>
      </div>
    </Layout1>
  );
};

export default FeedbackForm;
