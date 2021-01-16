import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useAuth } from "../../AuthContext";
import { PageWrapper } from "../SharedStyles";
import CloudsBG from "../../res/images/CloudsBG.png";
import * as actApp from "../../store/App/ac-App";
import ProfileTab from "./ProfileTab";
import UploadPictureModal from "./UploadPictureModal";
import EditRoleModal from "./EditRoleModal";

import Avatar from "@material-ui/core/Avatar";
import { styled as muiStyled } from "@material-ui/styles";
import { MdLocationOn } from "react-icons/md";

const Profile = () => {
  const placeholderDescription =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Volutpat, donec est ultrices suspendisse netus mattis. Vestibulum non eu, gravida porttitor pellentesque dignissim. Phasellus nibh et accumsan felis convallis ut risus suspendisse.";
  const { currentUser, fetchUserPosts, fetchUserData } = useAuth();
  const dispatch = useDispatch();
  const { displayName, photoURL } = currentUser;

  const userPosts = useSelector((state) => state.Home.userPosts);
  const isUploadingImage = useSelector((state) => state.App.isUploadingImage);
  const userData = useSelector((state) => state.Home.userData);

  console.log("User posts -> ", userPosts);

  useEffect(() => {
    if (currentUser) fetchUserPosts();
    if (Object.keys(userData).length === 0) fetchUserData();
  }, []);

  return (
    <PageWrapper>
      <UploadPictureModal />
      <EditRoleModal />
      <ContentWrapper>
        <ProfileWrapper>
          <ProfileBackground src={CloudsBG} alt="Background" />
          <ProfileContentWrapper>
            <ProfileHeader>
              <div
                onClick={() =>
                  dispatch(actApp.handleState("isPictureModalOpen", true))
                }
              >
                <ProfilePicture src={photoURL} alt="ProfilePicture" />
              </div>
              <div>
                <Username>{displayName}</Username>
                <ProfileHeaderDetails>
                  <MdLocationOn size="1.1rem" className="LocationIcon" />
                  <p>Florida, Kentucky</p>
                  <p> | Role: </p>
                  <ProfileHeaderRole
                    onClick={() =>
                      dispatch(actApp.handleState("isRoleModalOpen", true))
                    }
                  >
                    {userData ? userData.role : "Guest"}
                  </ProfileHeaderRole>
                </ProfileHeaderDetails>
              </div>
            </ProfileHeader>
            <ProfileDescription>
              {placeholderDescription}
              <strong>Edit</strong>
            </ProfileDescription>
            <ProfileTab userPosts={userPosts} bookmarkedPosts={userPosts} />
          </ProfileContentWrapper>
        </ProfileWrapper>
      </ContentWrapper>
    </PageWrapper>
  );
};

const ContentWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
`;

const ProfileWrapper = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const ProfileBackground = styled.img`
  width: 100%;
  height: 13vw;
  max-height: 10rem;
  @media (max-width: 768px) {
    height: 15vw;
    min-height: 4.5rem;
  }
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
`;

const ProfileContentWrapper = styled.div`
  text-align: left;
  width: 94%;
`;

const ProfilePicture = muiStyled(Avatar)({
  width: "8vw",
  height: "8vw",
  margin: "-4vw 0 0 0.2rem",
  border: "solid",
  borderColor: "white",
  borderWidth: "4px",
  minWidth: "2.5rem",
  minHeight: "2.5rem",
  "@media(max-width:768px)": {
    borderWidth: "2px",
  },
});

const Username = styled.p`
  font-family: "Raleway";
  font-size: 24px;
  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

const ProfileHeader = styled.div`
  display: flex;
  flex-direction: row;
  & > * {
    text-align: left;
    margin-left: 0.5rem;
  }
`;

const ProfileHeaderDetails = styled.div`
  color: ${({ theme: { colors } }) => colors.disabled};
  display: flex;
  flex-direction: row;
  white-space: pre;
  .LocationIcon {
    color: ${({ theme: { colors } }) => colors.disabled_light};
    @media (max-width: 768px) {
      width: 15px;
      height: 15px;
    }
  }
  & > * {
    font-size: 14px;
    @media (max-width: 768px) {
      font-size: 12px;
    }
  }
`;

const ProfileHeaderRole = styled.div`
  color: ${({ theme: { colors } }) => colors.main};
  text-decoration: underline;
  &:hover {
    opacity: 0.8;
    cursor: pointer;
  }
`;

const ProfileDescription = styled.p`
  margin-top: 1rem;
  font-size: 14px;
  @media (max-width: 768px) {
    font-size: 12px;
  }
  & > * {
    display: inline-block;
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
    font-size: 14px;
    margin-left: 2px;
    color: ${({ theme: { colors } }) => colors.disabled};
    text-decoration: underline;
    @media (max-width: 768px) {
      font-size: 12px;
    }
  }
`;

export default Profile;
