import React, { useEffect, useState } from "react";
import Layout2 from "../../components/layout2";
import "./index.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { loginApi } from "../../functions/api/auth";
import Cookies from "universal-cookie";
import { toast } from "react-toastify";

const Index = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const cookies = new Cookies();
  const tokenC = cookies.get("token");
  const userNameC = cookies.get("userName");
  const refreshTokenC = cookies.get("refreshToken");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setLoading(true);
    try {
      await loginApi({ email, password })
        .then((res) => {
          console.log("res==>", res.data.user);
          if (res.data.user) {
            // setLoading(false);
            cookies.set("token", res.data.token.accessToken, {
              expires: new Date(new Date().getTime() + 7 * 60 * 60 * 1000), // 5 days in milliseconds
              maxAge: 7 * 60 * 60, // 5 days in seconds
            });
            cookies.set("refreshToken", res.data.token.refreshToken, {
              expires: new Date(new Date().getTime() + 7 * 60 * 60 * 1000), //ms
              maxAge: 7 * 60 * 60, //Sec
            });
            cookies.set("userName", res.data.user.email);
            cookies.set("userId", res.data.user.id);
            cookies.set(
              "name",
              res.data.user.firstName + res.data.user.lastName
            );
            navigate("/dashboard");
            toast.success("You are login successfully..");
          } else {
            toast.error("Enter Valid User Credentials");
            // setLoading(false);
          }
        })
        .catch((err) => {
          toast.error(
            err.response.data.message || "Incorrect email or password."
          );
          // setLoading(false);
        });
    } catch (error) {
      toast.error(error || "User not found.");
    }
  };

  return (
    <Layout2>
      <div>
        <div className="title">Login Account</div>
        <form className="login-form" autoComplete="off">
          <input
            value={email}
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Email Address"
            className="col-12 input-field"
            autoComplete="new-email"
          />
          <input
            value={password}
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            className="col-12 input-field"
            autoComplete="new-password"
          />
          <div className="remember-me">
            <input
              type="checkbox"
              id="rememberMe"
              style={{ width: "16px", height: "16px" }}
              className="form-check-input"
            />
            <label htmlFor="rememberMe" style={{ marginTop: "1px" }}>
              Remember Me
            </label>
          </div>
          <button
            type="submit"
            className="col-12 login-btn"
            onClick={handleSubmit}
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
