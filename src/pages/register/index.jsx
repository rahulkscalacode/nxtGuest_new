import React, { useState } from "react";
import Layout2 from "../../components/layout2";
import { Link, useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const inputHandler = (e) => {
    e.preventDefault();
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("user", user);
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
            name="firstName"
            onChange={(e) => inputHandler(e)}
          />
          <input
            type="text"
            placeholder="Enter Last Name"
            className="col-12 input-field"
            autoComplete="new-last-name"
            name="lastName"
            onChange={(e) => inputHandler(e)}
          />
          <input
            type="text"
            placeholder="Enter Email Address*"
            className="col-12 input-field"
            autoComplete="new-email"
            name="email"
            onChange={(e) => inputHandler(e)}
          />
          <input
            type="text"
            placeholder="Enter password"
            className="col-12 input-field"
            autoComplete="new-password"
            name="password"
            onChange={(e) => inputHandler(e)}
          />
          <input
            type="text"
            placeholder="Confirm Password*"
            className="col-12 input-field"
            autoComplete="new-confirm-password"
            name="confirmPassword"
            onChange={(e) => inputHandler(e)}
          />
          <button
            type="submit"
            className="col-12 login-btn"
            onClick={handleSubmit}
          >
            Create Account
          </button>
        </form>
        <div className="signup-link">
          Already have an account,&nbsp;<Link href="/login">login</Link>
          &nbsp;here.
        </div>
      </div>
      <div className="footer-image"></div>
    </Layout2>
  );
};

export default Index;
