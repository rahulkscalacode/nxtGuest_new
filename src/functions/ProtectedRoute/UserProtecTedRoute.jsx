import React from "react";
// import { useSelector } from "react-redux";
import LoadingToRedirect from "./LoadingToRedirect";
import Cookies from "universal-cookie";

const UserRoute = ({ children, ...rest }) => {
  const cookies = new Cookies();

  const tokenC = cookies.get("token");
  const userNameC = cookies.get("userName");

  return userNameC && tokenC ? children : <LoadingToRedirect />;
};

export default UserRoute;
