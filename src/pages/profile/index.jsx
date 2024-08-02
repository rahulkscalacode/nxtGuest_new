import React, { useState } from "react";
import Layout from "../../components/layout";
import Footer from "../../components/footer";
import "./index.css";
import { Image } from "antd";
import { FaPencilAlt } from "react-icons/fa";
import EditProfile from "./editImage";

const Index = () => {
  const [edit, setEdit] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const json = {
    Name: "Christina Jones",
    Email: "cjones@gmail.com",
    Contact: "0123456789",
    Address: "Noida Sector 62",
    City: "Noida",
    Country: "India",
  };

  const handleEdit = () => {
    setEdit(!edit);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <Layout footer={<Footer />}>
      <div>
        <div className="headP mb-3">My Profile</div>
        <div className="d-flex gap-3 ">
          <Image
            style={{ borderRadius: "5px" }}
            width={100}
            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
          />
          <div>
            <div className="headP" style={{ fontSize: "18px", fontWeight: 600 }}>
              Christina Jones
            </div>
            <button
              className="editBook1 mt-2"
              style={{
                borderRadius: "5px",
                width: "8rem",
                cursor: "pointer",
                color: "white",
              }}
              onClick={edit ? openModal : handleEdit}
            >
              <span className="me-2">
                <FaPencilAlt />
              </span>
              {edit ? "Edit Image" : "Edit Profile"}
            </button>
          </div>
        </div>
        <div className={edit ? "" : "mt-3"}>
          {Object.keys(json).map((keys) => (
            <div
              className={edit ? "inputcss align-items-center" : "inputcss mt-2"}
              key={keys}
            >
              <div>{keys}</div>
              {edit ? (
                <input value={json[keys]} className="input-field " />
              ) : (
                <div>{json[keys]}</div>
              )}
            </div>
          ))}
        </div>
      </div>
      {edit ? (
        <div className="displayContent">
          <div className="btncss">
            <button
              className="editBook"
              style={{ background: "#999", border: "none", color: "black" }}
            >
              Cancel
            </button>
            <button className="proceedPay">Update</button>
          </div>
        </div>
      ) : (
        ""
      )}
      <EditProfile
        arg={{ openModal, closeModal, isModalOpen, setIsModalOpen }}
      />
    </Layout>
  );
};

export default Index;
