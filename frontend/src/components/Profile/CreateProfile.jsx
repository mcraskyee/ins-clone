import React from "react";
import { useState } from "react";
import {
  FormContainer,
  FormButton,
  FormInput,
  FormLabel,
  ErrorMessage,
} from "./Profile.styles";
import { axiosInstance } from "../../apiConfig";
import { saveProfileData } from "../../Redux/ProfileData";
import { useDispatch } from "react-redux";

export default function CreateProfile({ userID, setIsProfileCreated }) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    bio: "",
    profilePic: "",
    userID: userID,
    followers: "22k",
    following: 666,
    verified: true,
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValidated = Object.keys(formData).every((key) => formData[key]);
    //遍历formData，如果formData里面的key都有值，isValidated就是true
    if (!isValidated) {
      setErrorMessage("Please enter the required fields!");
      return;
    }
    setErrorMessage(""); //验证成功就把errorMessage清空

    //这里是把formData里面的数据通过formDataToSubmit更新到formData里面
    const formDataToSubmit = new FormData();
    formDataToSubmit.append("name", formData.name);
    formDataToSubmit.append("category", formData.category);
    formDataToSubmit.append("bio", formData.bio);
    formDataToSubmit.append(
      "profilePic",
      formData.profilePic,
      formData.profilePic.name
    );
    formDataToSubmit.append("userID", formData.userID);
    formDataToSubmit.append("followers", formData.followers);
    formDataToSubmit.append("following", formData.following);
    formDataToSubmit.append("verified", formData.verified);

    try {
      const response = await axiosInstance.post(
        "api/profiles",
        formDataToSubmit,
        { Headers: { "Content-Type": "multipart/form-data" } }
      );
      const updatedProfiles = await axiosInstance.get("api/profiles");
      console.log("updatedProfiles", updatedProfiles);
      dispatch(saveProfileData(updatedProfiles.data));
      setIsProfileCreated(true);
      console.log("profile uploaded successfully", response.data);
    } catch (error) {
      console.error("Error uploading profile: ", error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log("selected image file", file);
    setFormData({ ...formData, profilePic: file });
    //这里的file就是input里面的文件，通过setFormData更新到formData里面
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    //这里的name是input的name值，包括name，category，bio，value就是它们对应的值
    //这三个input谁的值改变了，就把它对应的值通过setFormData更新到formData里面
  };

  return (
    <FormContainer>
      <h2>Create Your Profile</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <FormLabel htmlFor="profilePic">Profile Picture</FormLabel>
          <FormInput
            type="file"
            id="profilePic"
            name="profilePic"
            onChange={handleImageChange}
          />
        </div>
        <div>
          <FormLabel htmlFor="name">Name</FormLabel>
          <FormInput
            type="text"
            id="name"
            name="name"
            value={formData.name || ""}
            onChange={handleChange}
          />
        </div>
        <div>
          <FormLabel htmlFor="category">Category</FormLabel>
          <FormInput
            type="text"
            id="category"
            name="category"
            value={formData.category || ""}
            onChange={handleChange}
          />
        </div>
        <div>
          <FormLabel htmlFor="bio">Bio</FormLabel>
          <FormInput
            type="text"
            id="bio"
            name="bio"
            value={formData.bio || ""}
            onChange={handleChange}
          />
        </div>
        <div>
          <FormButton type="submit">Create Profile</FormButton>
        </div>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </form>
    </FormContainer>
  );
}
