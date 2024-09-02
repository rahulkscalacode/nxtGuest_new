import React, { useState, useEffect } from "react";
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
  const [prevEmail, setPrevEmail] = useState(""); // Store previous email
  const [prevPassword, setPrevPassword] = useState(""); // Store previous password
  const [loginDisabled, setLoginDisabled] = useState(false); // Manage login button state

  const navigate = useNavigate();
  const cookies = new Cookies();
  const tokenC = cookies.get("token");
  const userNameC = cookies.get("userName");

  useEffect(() => {
    if (tokenC && userNameC) {
      navigate("/dashboard");
    }
  }, [tokenC, userNameC, navigate]);

  const validateEmail = (email) => {
    const re = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if email and password haven't changed since last submit
    if (email === prevEmail && password === prevPassword) {
      return;
    }

    // Validate email
    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address.");
      setLoginDisabled(true);
      return;
    }

    // Validate password
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      setLoginDisabled(true);
      return;
    }

    try {
      const res = await loginApi({ email, password });
      if (res.data.user) {
        cookies.set("token", res.data.token.accessToken, {
          expires: new Date(new Date().getTime() + 7 * 60 * 60 * 1000),
          maxAge: 7 * 60 * 60,
        });
        cookies.set("refreshToken", res.data.token.refreshToken, {
          expires: new Date(new Date().getTime() + 7 * 60 * 60 * 1000),
          maxAge: 7 * 60 * 60,
        });
        cookies.set("userName", res.data.user.email);
        cookies.set("userId", res.data.user.id);
        cookies.set("name", res.data.user.firstName + res.data.user.lastName);
        navigate("/dashboard");
        toast.success("You are logged in successfully.");
      } else {
        toast.error("Enter valid user credentials.");
        setPrevEmail(email); // Store current email and password
        setPrevPassword(password);
        setLoginDisabled(true); // Disable the login button
      }
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Incorrect email or password."
      );
      setPrevEmail(email); // Store current email and password
      setPrevPassword(password);
      setLoginDisabled(true); // Disable the login button
    }
  };

  const handleInputChange = (setter, value) => {
    setter(value);
    setLoginDisabled(false); // Enable the login button on any change
  };

  const handleGuest = () => {
    navigate("/dashboard");
  };

  console.log("loginDisabled", loginDisabled);
  return (
    <Layout2>
      <div>
        <div className="title">Login Account</div>
        <form
          className="login-form"
          autoComplete="off"
          noValidate
          onSubmit={handleSubmit}
        >
          <input
            value={email}
            type="email"
            name="email"
            onChange={(e) => handleInputChange(setEmail, e.target.value)}
            placeholder="Enter Email Address*"
            className="col-12 input-field"
            autoComplete="new-email"
            required
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
          />
          <input
            value={password}
            type="password"
            name="password"
            onChange={(e) => handleInputChange(setPassword, e.target.value)}
            placeholder="Enter password*"
            className="col-12 input-field"
            autoComplete="new-password"
            required
            minLength="6"
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
            disabled={loginDisabled} // Disable the button if needed
          >
            Login
          </button>
        </form>
        <div className="separator">OR</div>
        <button className="col-12 guest-btn">Book as a Guest</button>
        <div className="signup-link">
          Don't have an account,&nbsp;
          <Link to="/register">sign up</Link>
          &nbsp;here.
        </div>
      </div>
      <div className="footer-image"></div>
    </Layout2>
  );
};

export default Index;
