import React from "react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";

const Header3 = () => {
  const cookies = new Cookies();
  const tokenC = cookies.get("token");
  return (
    <div style={{ borderBottom: "1px solid #474747" }}>
      <div className="d-flex align-items-center justify-content-center p-3">
        <Link to={tokenC ? "/dashboard" : "/"}>
          <img
            src="/images/asset/logo1.png"
            alt="Logo"
            style={{
              display: "flex",
              margin: "auto",
              width: "89px",
              height: "67px",
            }}
          />
        </Link>
      </div>
    </div>
  );
};

export default Header3;
