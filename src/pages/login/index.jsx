import React from "react";
import Layout2 from "../../components/layout2";
import "./index.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/dashboard");
  };

  return (
    <Layout2>
      <div>
        <div className="title">Login Account</div>
        <form className="login-form" autoComplete="off">
          <input
            type="email"
            placeholder="Enter Email Address"
            className="col-12 input-field"
            autoComplete="new-email"
          />
          <input
            type="password"
            placeholder="Enter password"
            className="col-12 input-field"
            autoComplete="new-password"
          />
          <div className="remember-me">
            <input
              type="checkbox"
              id="rememberMe"
              style={{ width: "16px", height: "16px" }}
              class="form-check-input"
            />
            <label htmlFor="rememberMe" style={{ marginTop: "1px" }}>
              Remember Me
            </label>
          </div>
          <button
            type="submit"
            className="col-12 login-btn"
            onClick={handleClick}
          >
            Login
          </button>
        </form>
        <div className="separator">OR</div>
        <button className="col-12 guest-btn">Book as a Guest</button>
        <div className="signup-link">
          Don't have an account,&nbsp;
          <a href="/register">
            <Link to="/register">sign up</Link>
          </a>
          &nbsp;here.
        </div>
      </div>
      <div className="footer-image"></div>
    </Layout2>
  );
};

export default Index;
