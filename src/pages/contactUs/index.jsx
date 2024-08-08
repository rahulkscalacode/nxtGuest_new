import React from "react";
import "./index.css";
import Layout1 from "../../components/layout1";

const Index = () => {
  return (
    <Layout1>
      <div className="contact-us">
        <div className="head">Contact Us</div>
        <div className="contact-details row mt-3">
          <div className="col-5 fontsixe15">
            <p>Speak with us</p>
          </div>
          <div className="col-7 fontsize15400">
            <div className="contact-item">
              <span role="img" aria-label="location">
                📍
              </span>
              <p>
                1688 Meridian Ave
                <br />
                600-700, Miami Beach, FL 33139
              </p>
            </div>
            <div className="contact-item">
              <span role="img" aria-label="phone">
                📞
              </span>
              <p>
                (305) 600 0605
                <br />
                (305) 928 2433
              </p>
            </div>
            <div className="contact-item">
              <span role="img" aria-label="email">
                ✉️
              </span>
              <p>info@nxtguest.com</p>
            </div>
          </div>
        </div>
        <button className="service-banner">
          24x7 Transportation Services Available
        </button>
        <div className="form-container">
          <p className="fontsixe15">For Queries:</p>
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
              <label htmlFor="phone" className="col-3">
                Phone:
              </label>
              <input
                type="tel"
                placeholder="Enter phone number "
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
              ></textarea>
            </div>
            <div className="d-flex gap-2">
              <button type="button" className="cancel-button col-6">
                Cancel
              </button>
              <button type="submit" className="submit-button1 col-6">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout1>
  );
};

export default Index;
