import React from "react";
import Layout2 from "../../components/layout2";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/login");
  };
  return (
    <Layout2>
      <div>
        <div className="title">Create an Account</div>
        <form className="login-form" autoComplete="off">
          <input
            type="text"
            placeholder="Enter First Name*"
            className="col-12 input-field"
            autoComplete="new-name"
          />
          <input
            type="text"
            placeholder="Enter Last Name"
            className="col-12 input-field"
            autoComplete="new-last-name"
          />
          <input
            type="text"
            placeholder="Enter Email Address*"
            className="col-12 input-field"
            autoComplete="new-email"
          />
          <input
            type="text"
            placeholder="Enter password"
            className="col-12 input-field"
            autoComplete="new-password"
          />
          <input
            type="text"
            placeholder="Confirm Password*"
            className="col-12 input-field"
            autoComplete="new-confirm-password"
          />
          <button
            type="submit"
            className="col-12 login-btn"
            onClick={handleClick}
          >
            Create Account
          </button>
        </form>
        <div className="signup-link">
          Already have an account,&nbsp;<a href="/register">login</a>&nbsp;here.
        </div>
      </div>
      <div className="footer-image"></div>
    </Layout2>
  );
};

export default Index;
