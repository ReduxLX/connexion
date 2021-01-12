import React, { useState, useCallback } from "react";
import styled from "styled-components";
import { PageWrapper } from "../SharedStyles";
import { useAuth } from "../../AuthContext";
import { Button, Avatar } from "@material-ui/core";
import { styled as muiStyled } from "@material-ui/styles";
import Theme from "../../Theme";
import { useDropzone } from "react-dropzone";

const Profile = () => {
  const { currentUser, uploadImage, updateProfilePicture } = useAuth();
  const { displayName, email, photoURL, uid } = currentUser || {};
  const [username, setUsername] = useState(displayName);
  const [profileUrl, setProfileUrl] = useState("");
  const [photo, setPhoto] = useState(photoURL);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    console.log("Upload", photo);
    await uploadImage(photo);
  };

  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
    setPhoto(acceptedFiles[0]);
    console.log(acceptedFiles[0]);
  }, []);

  const handleImageUpdate = () => {
    updateProfilePicture(profileUrl);
  };

  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isDragActive,
  } = useDropzone({ onDrop });

  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  return (
    <PageWrapper>
      <Form onSubmit={handleProfileUpdate}>
        <h1>Update Profile</h1>
        <AvatarWrapper>
          <Avatar
            alt="pic"
            src={photo}
            style={{ width: "100px", height: "100px" }}
          />
        </AvatarWrapper>

        <Input
          id="username"
          type="text"
          name="username"
          placeholder="Enter new username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          id="profile"
          type="text"
          name="profile"
          placeholder="Enter Profile image url"
          value={profileUrl}
          onChange={(e) => setProfileUrl(e.target.value)}
        />
        <UploadProfile {...getRootProps()}>
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Upload New Profile Picture</p>
          ) : (
            <p>Drop profile picture here</p>
          )}
        </UploadProfile>
        <h4>Files</h4>
        <ul>{files}</ul>
        <SubmitFirebase type="submit">Upload Image</SubmitFirebase>
        <SubmitFirebase onClick={handleImageUpdate}>
          Update Image url
        </SubmitFirebase>
      </Form>
    </PageWrapper>
  );
};

const Form = styled.form`
  display: flex;
  flex-direction: column;

  max-width: 500px;
  & > * {
    margin-bottom: 1rem;
  }
`;

const AvatarWrapper = styled.div`
  margin: 1rem auto;
`;

const UploadProfile = styled.div`
  display: flex;
  align-items: center;
  width: 100px;
  height: 100px;
  background-color: ${({ theme: { colors } }) => colors.disabled_light};
`;

const SubmitFirebase = muiStyled(Button)({
  background: Theme.colors.main,
  color: "white",
  fontSize: "14px",
  textTransform: "none",
  padding: "0.6rem 0.8rem",
  marginTop: "1rem",
  "&:hover": {
    backgroundColor: `${Theme.colors.main_dark}`,
  },
});

const Input = styled.input`
  padding: 0.5rem;
  border: ${({ theme: { colors } }) => `1px solid ${colors.disabled}`};
  border-radius: 5px;

  &:hover {
    border: 1px solid black;
  }
  &:focus {
    border: ${({ theme: { colors } }) => `2px solid ${colors.main}`};
  }
`;

export default Profile;
