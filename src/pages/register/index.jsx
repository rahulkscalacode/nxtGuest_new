import React, { useState, useEffect, useRef } from "react";
import Layout2 from "../../components/layout2";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../functions/api/auth";
import { toast } from "react-toastify";
import Cookies from "universal-cookie";
import { loaderReducer } from "../../components/toolkit/loader";
import { useDispatch } from "react-redux";
import { validateEmail } from "../../validations";

const Index = () => {
  const cookies = new Cookies();
  const navigate = useNavigate();
  const tokenC = cookies.get("token");
  const userNameC = cookies.get("userName");
  const dispatch = useDispatch();

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    stripe_user_id: "",
  });

  // Store previous form state for comparison
  const prevUserRef = useRef(user);

  useEffect(() => {
    if (tokenC && userNameC) {
      navigate("/dashboard");
    }
  }, [tokenC, userNameC, navigate]);

  const inputHandler = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    if (name === "firstName" || name === "lastName") {
      if (/^[A-Za-z]*$/.test(value)) {
        setUser((prev) => ({ ...prev, [name]: value }));
      }
    } else if (name === "password" || name === "confirmPassword") {
      setUser((prev) => ({ ...prev, [name]: value.replace(/\s/g, "") }));
    } else {
      setUser((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loaderReducer(true));

    const trimmedUser = {
      firstName: user.firstName.trim(),
      lastName: user.lastName.trim(),
      email: user.email.trim(),
      password: user.password.trim(),
      confirmPassword: user.confirmPassword.trim(),
    };

    const { firstName, email, password, confirmPassword } = trimmedUser;

    // Check if input values changed from previous state
    const prevUser = prevUserRef.current;
    if (
      firstName === prevUser.firstName &&
      email === prevUser.email &&
      password === prevUser.password &&
      confirmPassword === prevUser.confirmPassword
    ) {
      return;
    }

    // Update previous state reference
    prevUserRef.current = trimmedUser;

    if (!firstName || !email || !password || !confirmPassword) {
      toast.error("Please fill in all required fields.");
      dispatch(loaderReducer(false));
      return;
    }
    //validate email error
    const emailError = validateEmail(email);
    if (emailError) {
      toast.error(emailError);
      dispatch(loaderReducer(false));
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      dispatch(loaderReducer(false));
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      dispatch(loaderReducer(false));
      return;
    }

    try {
      dispatch(loaderReducer(true));
      const res = await register(trimmedUser);
      if (res.status === 201) {
        dispatch(loaderReducer(false));
        toast.success("Account created successfully.");
        navigate("/login");
      }
    } catch (err) {
      dispatch(loaderReducer(false));
      console.error(err);
      if (err.response?.status === 409) {
        toast.error("Email already exists.");
      } else {
        toast.error("Failed to create account.");
      }
    } finally {
      dispatch(loaderReducer(false));
    }
  };

  return (
    <Layout2>
      <div>
        <div className="title">Create an Account</div>
        <form className="login-form" autoComplete="off" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter First Name*"
            className="col-12 input-field"
            autoComplete="new-name"
            name="firstName"
            onChange={inputHandler}
            value={user.firstName}
            pattern="^[A-Za-z]+$"
            title="Only alphabets are allowed"
            required
          />
          <input
            type="text"
            placeholder="Enter Last Name"
            className="col-12 input-field"
            autoComplete="new-last-name"
            name="lastName"
            onChange={inputHandler}
            value={user.lastName}
            pattern="^[A-Za-z]+$"
            title="Only alphabets are allowed"
          />
          <input
            type="email"
            placeholder="Enter Email Address*"
            className="col-12 input-field"
            autoComplete="new-email"
            name="email"
            onChange={inputHandler}
            value={user.email}
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
            required
          />
          <input
            type="password"
            placeholder="Enter password*"
            className="col-12 input-field"
            autoComplete="new-password"
            name="password"
            onChange={inputHandler}
            value={user.password}
            required
            minLength="6"
          />
          <input
            type="password"
            placeholder="Confirm Password*"
            className="col-12 input-field"
            autoComplete="new-confirm-password"
            name="confirmPassword"
            onChange={inputHandler}
            value={user.confirmPassword}
            required
          />
          <button type="submit" className="col-12 login-btn">
            Create Account
          </button>
        </form>
        <div className="signup-link">
          Already have an account,&nbsp;<Link to="/login">login</Link>
          &nbsp;here.
        </div>
      </div>
      <div className="footer-image"></div>
    </Layout2>
  );
};

export default Index;
