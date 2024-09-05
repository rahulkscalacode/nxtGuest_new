import React, { useState } from "react";
import "./index.css";
import Layout1 from "../../components/layout1";
import { apiCall } from '../../functions/api/apiGlobal';
import { toast } from "react-toastify"
import Cookies from "universal-cookie";
const Index = () => {
  const cookies = new Cookies();
  // const tokenC = cookies.get("token");
  const tokenUserId = cookies.get("userId");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    type: "contact",
  });
  const [disableBtn, setDisableBtn] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await apiCall('POST', '/user/contact-feedback', formData, {}, null, {"user_id": tokenUserId});
      
      if(response.data.status === "success"){
        toast.success(response.data.message);
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
          type: "contact",
        });
        setDisableBtn(false);
      } else if(response.data.status === "error") {
        console.error(response.data.message);
        toast.error(response.data.message);
        setDisableBtn(false);
      } 
    } catch (error) {
      console.error("Failed to submit feedback:", error);
      toast.error("Failed to submit feedback");
      setDisableBtn(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
      type: "contact",
    });
    setDisableBtn(false);
  };

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
        <div className="service-banner">
          24x7 Transportation Services Available
        </div>
        <div className="form-container">
          <p className="fontsixe15">For Queries:</p>
          <form onSubmit={handleSubmit}>
            <div className="row">
              <label htmlFor="name" className="col-3">
                Name:
              </label>
              <input
                type="text"
                placeholder="Enter Name"
                className="col-9 input-field1"
                autoComplete="new-email"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
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
                name="email"
                value={formData.email}
                onChange={handleInputChange}
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
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
              />
            </div>
            <div className="row">
              <label htmlFor="phone" className="col-3">
                Phone:
              </label>
              <input
                type="number"
                placeholder="Enter phone number "
                className="col-9 input-field1 no-spinner"
                autoComplete="new-email"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                onKeyDown={(e) =>
                  (e.key === "." || e.key === "-") && e.preventDefault()
                }
                min="0"
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
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Enter message"
              ></textarea>
            </div>
            <div className="d-flex gap-2 mt-4">
              <button
                type="button"
                onClick={handleCancel}
                className="cancel-button col-6"
              >
                Cancel
              </button>
              <button type="submit" onClick={()=> setDisableBtn(true)} className="submit-button1 col-6">
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
