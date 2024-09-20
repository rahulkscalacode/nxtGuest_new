import React, { useState, useEffect } from "react";
import Layout2 from "../../components/layout2";
import "./index.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { loginApi } from "../../functions/api/auth";
import Cookies from "universal-cookie";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { createStripeAccount } from "../../functions/api/stripe";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Index = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [prevEmail, setPrevEmail] = useState(""); // Store previous email
  const [prevPassword, setPrevPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [eye, setEye] = useState(false);

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
      return;
    }

    // Validate password
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }

    setIsLoading(true);
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
        cookies.set(
          "name",
          res.data.user.firstName + " " + res.data.user.lastName
        );
        navigate("/dashboard");
        toast.success("You are logged in successfully.");

        if (res.data.user.id) {
          try {
            const data = await createStripeAccount({ id: res.data.user.id });
            console.log(data);
          } catch (err) {
            // Silently catch the error and do nothing
          }
        }
      } else {
        toast.error("Enter valid user credentials.");
        setPrevEmail(email); // Store current email and password
        setPrevPassword(password);
      }
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Incorrect email or password."
      );
      setPrevEmail(email); // Store current email and password
      setPrevPassword(password);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  const handleInputChange = (setter, value) => {
    if (setter === setPassword) {
      setter(value.replace(/\s/g, ""));
    } else {
      setter(value);
    }
  };

  const handleGuest = () => {
    navigate("/dashboard");
  };

  const onEyeClick = () => {
    setEye(!eye);
  };
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
          <div className="form-group" style={{ position: "relative" }}>
            <input
              value={password}
              type={eye ? "text" : "password"}
              name="password"
              onChange={(e) => handleInputChange(setPassword, e.target.value)}
              placeholder="Enter password*"
              className="col-12 input-field"
              autoComplete="new-password"
              required
              minLength="6"
            />
            <span
              style={{ position: "absolute", right: "10px", top: "32%" }}
              onClick={onEyeClick}
            >
              {eye ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
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
            disabled={isLoading} // Disable the button if needed
          >
            {isLoading ? <ClipLoader color={"#fff"} size={20} /> : "Login"}
          </button>
        </form>
        <div className="separator">OR</div>
        <button
          className="col-12 guest-btn"
          onClick={handleGuest}
          disabled={isLoading}
        >
          Book as a Guest
        </button>
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
