import React, { useState } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import { apiCall } from "../../functions/api/apiGlobal";
import Cookies from "universal-cookie";

const Index = ({
  arg: { openModal, closeModal, isModalOpen, setIsModalOpen },
}) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const cookies = new Cookies();
  const tokenUserId = cookies.get("userId");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdate = async () => {
    // Handle the update logic, e.g., uploading the file to the server
    // console.log("Updated profile picture:", selectedFile);
    // setIsModalOpen(false);
    try {
      const formData = new FormData();
      formData.append("profilePicture", selectedFile);

      const response = await apiCall(
        "POST",
        "/user/update-profile-picture",
        formData,
        {},
        null,
        {
          user_id: tokenUserId,
        }
      );

      if (response.data.status === "success") {
        toast.success(response.data.message);
        setIsModalOpen(false);
      } else if (response.data.status === "error") {
        console.error(response.data.message);
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Failed to update profile picture:", error);
      toast.error("Failed to update profile picture");
    }
  };

  return (
    <>
      {isModalOpen && (
        <ModalOverlay>
          <ModalContainer>
            <Header>Update Profile Picture</Header>
            <ImageWrapper>
              {preview ? (
                <ProfileImage src={preview} alt="Profile Preview" />
              ) : (
                <ProfileImage
                  src="/images/icons/self.png"
                  alt="Current Profile"
                />
              )}
            </ImageWrapper>
            <UploadButton htmlFor="upload-photo">
              <UploadIcon>&#x1F4E4;</UploadIcon> Upload Photo
            </UploadButton>
            <input
              id="upload-photo"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
            <ButtonWrapper>
              <CancelButton onClick={closeModal}>Cancel</CancelButton>
              <UpdateButton onClick={handleUpdate}>Update</UpdateButton>
            </ButtonWrapper>
          </ModalContainer>
        </ModalOverlay>
      )}
    </>
  );
};

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background-color: #333;
  color: white;
  padding: 20px;
  border-radius: 10px;
  width: 400px;
  text-align: center;
`;

const Header = styled.h2`
  margin-bottom: 20px;
`;

const ImageWrapper = styled.div`
  margin-bottom: 20px;
`;

const ProfileImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
`;

const UploadButton = styled.label`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  cursor: pointer;
  color: #ddd;
`;

const UploadIcon = styled.span`
  margin-right: 8px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CancelButton = styled.button`
  background-color: #aaa;
  color: #333;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const UpdateButton = styled.button`
  background-color: #ffc107;
  color: #333;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

export default Index;
