import React, { useEffect, useState } from "react";
import Layout from "../../components/layout";
import Footer from "../../components/footer";
import "./index.css";
import { Image } from "antd";
import { FaPencilAlt } from "react-icons/fa";
import EditProfile from "./editImage";
import Cookies from "universal-cookie";
import { apiCall } from "../../functions/api/apiGlobal";
import { toast } from "react-toastify";
const Index = () => {
  const cookies = new Cookies();
  // const tokenC = cookies.get("token");
  const tokenUserId = cookies.get("userId");
  const [edit, setEdit] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Current state values
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");

  // Original state values
  const [originalFirstName, setOriginalFirstName] = useState(firstName);
  const [originalLastName, setOriginalLastName] = useState(lastName);
  const [originalEmail, setOriginalEmail] = useState(email);
  const [originalContact, setOriginalContact] = useState(contact);
  const [originalAddress, setOriginalAddress] = useState(address);
  const [originalCity, setOriginalCity] = useState(city);
  const [originalCountry, setOriginalCountry] = useState(country);
  const [profileImage, setProfileImage] = useState(null);



  const fetchProfileImage = async () => {
    try {
      const response = await apiCall('GET', '/user/get-profile-picture', {}, {}, null, {
        "user_id": tokenUserId // Pass tokenUserId in headers
      });
      const base64Image = response.data.image; // Assuming the response contains a base64 string
      setProfileImage(base64Image);
      console.log("base64Image",base64Image)
      console.log("profile image response----->>>>", response);
    } catch (error) {
      console.error("Failed to fetch profile image:", error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await apiCall('GET', '/user/user-details', {}, {}, null, {
        "user_id": tokenUserId // Pass tokenUserId in headers
      });
      const user = response.data.user
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setEmail(user.email);
      setContact(user.contact);
      setAddress(user.address);
      setCity(user.city);
      setCountry(user.country);
    } catch (error) {
      console.error("Failed to fetch user details:", error);
    }
  };

  useEffect(() => {
    fetchProfileImage();
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const updateData = async () => {
    try {
      const response = await apiCall(
        "PUT",
        "/user/update-user-details",
        {
          firstName,
          lastName,
          email,
          contact,
          address,
          city,
          country,
        },
        {},
        null,
        {
          user_id: tokenUserId,
        }
      );
      // console.log(response.data)
      if (response.data.status === "success") {
        toast.success(response.data.message);
        setEdit(false);
      } else if (response.data.status === "error") {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error("Failed to update user details:", error);
      toast.error(error);
    }
  };

  const handleEdit = () => {
    if (!edit) {
      // Save the current values before entering edit mode
      setOriginalFirstName(firstName);
      setOriginalLastName(lastName);
      setOriginalEmail(email);
      setOriginalContact(contact);
      setOriginalAddress(address);
      setOriginalCity(city);
      setOriginalCountry(country);
    }
    setEdit(!edit);
  };

  const handleCancel = () => {
    // Revert to the original values
    setFirstName(originalFirstName);
    setLastName(originalLastName);
    setEmail(originalEmail);
    setContact(originalContact);
    setAddress(originalAddress);
    setCity(originalCity);
    setCountry(originalCountry);
    setEdit(false);
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
        <div className="d-flex gap-3">
          <Image
            style={{ borderRadius: "5px", border: "1px solid white" }}
            width={100}
            src={
              profileImage === null ? "/images/icons/self.png" : profileImage
            }
          />
          <div>
            <div
              className="headP"
              style={{ fontSize: "18px", fontWeight: 600 }}
            >
              {firstName} {lastName}
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
          {edit ? (
            <>
              <div className="inputcss align-items-center">
                <div>First Name</div>
                <input
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="input-field"
                  placeholder="Enter First Name"
                />
              </div>
              <div className="inputcss align-items-center mt-2">
                <div>Last Name</div>
                <input
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="input-field"
                  placeholder="Enter Last Name"
                />
              </div>
            </>
          ) : (
            <div className="inputcss mt-2">
              <div>Name :</div>
              <div>
                {firstName} {lastName}
              </div>
            </div>
          )}
          {edit ? (
            <>
              <div className="inputcss align-items-center mt-2">
                <div>Email</div>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field"
                  placeholder="Enter Email"
                />
              </div>
              <div className="inputcss align-items-center mt-2">
                <div>Contact</div>
                <input
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  className="input-field"
                  placeholder="Enter Contact"
                />
              </div>
              <div className="inputcss align-items-center mt-2">
                <div>Address</div>
                <input
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="input-field"
                  placeholder="Enter Address"
                />
              </div>
              <div className="inputcss align-items-center mt-2">
                <div>City</div>
                <input
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="input-field"
                  placeholder="Enter City"
                />
              </div>
              <div className="inputcss align-items-center mt-2">
                <div>Country</div>
                <input
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="input-field"
                  placeholder="Enter Country"
                />
              </div>
            </>
          ) : (
            <>
              <div className="inputcss mt-2">
                <div>Email :</div>
                <div>{email ? email : "N/A"}</div>
              </div>
              <div className="inputcss mt-2">
                <div>Contact :</div>
                <div>{contact ? contact : "N/A"}</div>
              </div>
              <div className="inputcss mt-2">
                <div>Address :</div>
                <div>{address ? address : "N/A"}</div>
              </div>
              <div className="inputcss mt-2">
                <div>City :</div>
                <div>{city ? city : "N/A"}</div>
              </div>
              <div className="inputcss mt-2">
                <div>Country :</div>
                <div>{country ? country : "N/A"}</div>
              </div>
            </>
          )}
        </div>
      </div>
      {edit && (
        <div className="displayContent mt-4">
          <div className="btncss">
            <button
              className="editBook"
              style={{ background: "#999", border: "none", color: "black" }}
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button className="proceedPay" onClick={updateData}>
              Update
            </button>
          </div>
        </div>
      )}
      <EditProfile
        arg={{ openModal, closeModal, isModalOpen, setIsModalOpen, profileImage,fetchProfileImage }}
      />
    </Layout>
  );
};

export default Index;
