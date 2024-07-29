import React, { Fragment, useState } from "react";
import {
  FormContainer,
  FormLabel,
  FormInput,
  FormButton,
} from "../Profile/Profile.styles"; //和profile的ui一样
import { axiosInstance } from "../../apiConfig";
import Navbar from "../Navbar/Navbar";

export default function CreatePost() {
  const [isPostCreated, setIsPostCreated] = useState(false);

  const handleSubmit = async (e) => {};

  const handleImageChange = (e) => {};

  const handleChange = (e) => {};

  return (
    <Fragment>
      <Navbar />
      {isPostCreated ? (
        "post is created"
      ) : (
        <FormContainer>
          <h2>Create Your Post</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <FormLabel htmlFor="postLink">Post Picture</FormLabel>
              <FormInput
                type="file"
                id="postLink"
                name="postLink"
                onChange={handleImageChange}
              />
            </div>
            <div>
              <FormLabel htmlFor="caption">Caption</FormLabel>
              <FormInput
                type="text"
                id="caption"
                name="caption"
                onChange={handleChange}
              />
            </div>
            <div>
              <FormLabel htmlFor="location">Location</FormLabel>
              <FormInput
                type="text"
                id="location"
                name="location"
                onChange={handleChange}
              />
            </div>
            <div>
              <FormButton type="submit">Create Post</FormButton>
            </div>
          </form>
        </FormContainer>
      )}
    </Fragment>
  );
}
