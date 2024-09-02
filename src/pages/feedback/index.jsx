import Layout1 from "../../components/layout1";
import React, { useState } from "react";
import "../contactUs/index.css";
import { apiCall } from '../../functions/api/apiGlobal';
import { toast } from "react-toastify";
import Cookies from "universal-cookie";
const FeedbackForm = () => {
  const cookies = new Cookies();
  // const tokenC = cookies.get("token");
  const tokenUserId = cookies.get("userId");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    type: "feedback"  // Assuming type is feedback/report
  });

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
          subject: "",
          message: "",
          type: "feedback"
        });
      } else if(response.data.status === "error") {
        console.error(response.data.message);
        toast.error(response.data.message);
      } 
    } catch (error) {
      console.error("Failed to submit feedback:", error);
      toast.error("Failed to submit feedback");
    }
  };

  const handleCancel = () => {
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
      type: "feedback"
    });
  };  


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
              <label htmlFor="message" className="col-3">
                Message:
              </label>
              <textarea
                id="message"
                name="message"
                className="col-9 input-field1"
                placeholder="Enter Message"
                value={formData.message}
                onChange={handleInputChange}
              ></textarea>
            </div>
          </form>
        </div>
        <div className="row mt-2">
          <div className="col-3"></div>
          <div className="col-9">
            <img
              src="/images/icons/google.png"
              alt=""
              style={{
                backgroundColor: "white",
                width: "100px",
                marginRight: "20px",
                borderRadius: "50%",
              }}
            />
            <img
              src="/images/icons/fav.ico"
              alt=""
              style={{
                backgroundColor: "white",
                width: "100px",
                borderRadius: "10px",
              }}
            />
          </div>
        </div>
      </div>
      <div className="d-flex gap-2">
        <button type="button" onClick={handleCancel} className="cancel-button col-6">
          Cancel
        </button>
        <button type="submit" onClick={handleSubmit} className="submit-button1 col-6">
          Submit
        </button>
      </div>
    </Layout1>
  );
};

export default FeedbackForm;
