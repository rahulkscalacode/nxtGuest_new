import React, { useState, useEffect } from "react";
import Layout2 from "../../components/layout2";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../functions/api/auth";
import { toast } from "react-toastify";
import Cookies from "universal-cookie";

const Index = () => {
  const cookies = new Cookies();
  const navigate = useNavigate();
  const tokenC = cookies.get("token");
  const userNameC = cookies.get("userName");

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loginDisabled, setLoginDisabled] = useState(false);
  // console.log(user.firstName.length);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (tokenC && userNameC) {
      navigate("/dashboard");
    }
  }, [tokenC, userNameC, navigate]);

  const inputHandler = (e) => {
    e.preventDefault();
    setUser({ ...user, [e.target.name]: e.target.value });
    setLoginDisabled(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    const trimmedUser = {
      firstName: user.firstName.trim(),
      lastName: user.lastName.trim(),
      email: user.email.trim(),
      password: user.password.trim(),
      confirmPassword: user.confirmPassword.trim(),
    };
    const { firstName, email, password, confirmPassword } = trimmedUser;

    if (!firstName || !email || !password || !confirmPassword) {
      toast.error("Please fill in all required fields.");
      setLoginDisabled(true);
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      setLoginDisabled(true);
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      setLoginDisabled(true);
      return;
    }

    setLoading(true);

    try {
      const res = await register(trimmedUser);
      if (res.status === 201) {
        toast.success("Account created successfully.");
        navigate("/login");
      }
    } catch (err) {
      setLoginDisabled(true);
      console.error(err);
      if (err.response.status === 409) {
        toast.error("Email already exists.");
      } else {
        toast.error("Failed to create account.");
      }
    } finally {
      setLoginDisabled(false);
      setLoading(false);
    }
  };

  console.log("loginDisabled=>", loginDisabled);
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
          <button
            type="submit"
            className="col-12 login-btn"
            disabled={loginDisabled}
          >
            {loading ? "Creating Account..." : "Create Account"}
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
