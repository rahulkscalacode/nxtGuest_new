import Layout1 from "../../components/layout";
import React, { useState } from "react";
import "../contactUs/index.css";
import { apiCall } from "../../functions/api/apiGlobal";
import { toast } from "react-toastify";
import Cookies from "universal-cookie";
import { loaderReducer } from "../../components/toolkit/loader";
import { useDispatch } from "react-redux";

const FeedbackForm = () => {
  const cookies = new Cookies();
  const dispatch = useDispatch();
  // const tokenC = cookies.get("token");
  const tokenUserId = cookies.get("userId");
  const [disableBtn, setDisableBtn] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    type: "feedback", // Assuming type is feedback/report
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDisableBtn(false);
    if (name === "name") {
      // Allow only alphabets and spaces
      const regex = /^[A-Za-z\s]*$/;
      if (!regex.test(value)) return; // Prevent update if invalid input
    }

    if (name === "email") {
      // Email validation regex
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(value)) {
        setErrors((prev) => ({ ...prev, email: "Invalid email address" }));
      } else {
        setErrors((prev) => ({ ...prev, email: "" }));
      }
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loaderReducer(true));
    if (!formData.name) {
      dispatch(loaderReducer(false));
      toast.error("Please enter a valid name.");
      return;
    }
    if (errors.email || !formData.email) {
      dispatch(loaderReducer(false));
      toast.error("Please enter a valid email address.");
      return;
    }
    if (!formData.message){
      dispatch(loaderReducer(false));
      toast.error("Please enter message");
      return;
    }

    try {
      const response = await apiCall(
        "POST",
        "/user/contact-feedback",
        formData,
        {},
        null,
        { user_id: tokenUserId }
      );

      if (response.data.status === "success") {
        dispatch(loaderReducer(false));
        toast.success(response.data.message);
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
          type: "feedback",
        });
        setDisableBtn(false);
      } else if (response.data.status === "error") {
        dispatch(loaderReducer(false));
        console.error(response.data.message);
        toast.error(response.data.message);
        setDisableBtn(false);
      }
    } catch (error) {
      dispatch(loaderReducer(false));
      console.error("Failed to submit feedback:", error);
      toast.error("Failed to submit feedback");
      setDisableBtn(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
      type: "feedback",
    });
    setDisableBtn(false);
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
                placeholder="Enter Name*"
                className="col-9 input-field1"
                autoComplete="new-email"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="row">
              <label htmlFor="email" className="col-3">
                Email:
              </label>
              <input
                type="email"
                placeholder="Enter Email Address*"
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
                placeholder="Enter Message*"
                value={formData.message}
                onChange={handleInputChange}
                minLength={10}
              ></textarea>
            </div>
          </form>
        </div>
        <div className="row mt-2">
          <div className="col-3"></div>
          <div className="col-9">
            <a
              href="https://www.google.com/search?q=nxtguest+&sca_esv=8e99831eb58f4f25&sca_upv=1&sxsrf=ADLYWIJZg4JdJlYOR_7Ug7ZLAbL8hQwSrg%3A1725013887834&source=hp&ei=f5_RZpycMLqUvr0P5qrF4Ag&iflsig=AL9hbdgAAAAAZtGtj2R7wM8d8zm_uP6ElBKIr9oDhWYv&ved=0ahUKEwjc147AwZyIAxU6iq8BHWZVEYwQ4dUDCBk&uact=5&oq=nxtguest+&gs_lp=Egdnd3Mtd2l6IglueHRndWVzdCAyBxAAGIAEGA0yBxAAGIAEGA0yBxAuGIAEGA0yBxAAGIAEGA0yBxAAGIAEGA0yBxAAGIAEGA0yDRAuGIAEGMcBGA0YrwEyBxAAGIAEGA0yBxAAGIAEGA0yBxAAGIAEGA1I-hFQAFiQC3AAeACQAQCYAZgBoAGaAqoBAzAuMrgBA8gBAPgBAvgBAZgCAqACogKYAwCSBwMwLjKgB5kW&sclient=gws-wiz#lrd=0x88d9b5b846467825:0xbeb3c1a9a37e2173,1"
              target="blank"
            >
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
            </a>
            <a
              href="https://www.yelp.com/biz/nxtguest-miami-beach-2"
              target="blank"
            >
              <img
                src="/images/icons/fav.ico"
                alt=""
                style={{
                  backgroundColor: "white",
                  width: "100px",
                  borderRadius: "10px",
                }}
              />
            </a>
          </div>
        </div>
      </div>
      <div className="d-flex gap-2">
        <button
          type="button"
          onClick={handleCancel}
          className="cancel-button col-6"
        >
          Cancel
        </button>
        <button
          type="submit"
          onClick={(e) => {
            setDisableBtn(true);
            handleSubmit(e);
          }}
          className="submit-button1 col-6"
          disabled={disableBtn}
        >
          Submit
        </button>
      </div>
    </Layout1>
  );
};

export default FeedbackForm;
