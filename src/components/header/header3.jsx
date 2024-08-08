import React from "react";
import { Link } from "react-router-dom";

const Header3 = () => {
  return (
    <div style={{ borderBottom: "1px solid #474747" }}>
      <div className="d-flex align-items-center justify-content-center p-3">
        <Link to="/">
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
