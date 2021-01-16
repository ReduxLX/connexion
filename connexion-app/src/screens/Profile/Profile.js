import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useAuth } from "../../AuthContext";
import { PageWrapper } from "../SharedStyles";
import CloudsBG from "../../res/images/CloudsBG.png";
import * as actApp from "../../store/App/ac-App";
import ProfileTab from "./ProfileTab";
import UploadPictureModal from "./UploadPictureModal";

import Avatar from "@material-ui/core/Avatar";
import { styled as muiStyled } from "@material-ui/styles";
import { MdLocationOn } from "react-icons/md";

const Profile = () => {
  const placeholderDescription =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Volutpat, donec est ultrices suspendisse netus mattis. Vestibulum non eu, gravida porttitor pellentesque dignissim. Phasellus nibh et accumsan felis convallis ut risus suspendisse.";
  const { currentUser, fetchUserPosts } = useAuth();
  const dispatch = useDispatch();
  const { displayName, photoURL } = currentUser;

  const userPosts = useSelector((state) => state.Home.userPosts);
  const isUploadingImage = useSelector((state) => state.App.isUploadingImage);
  console.log("User posts -> ", userPosts);

  useEffect(() => {
    if (currentUser) fetchUserPosts();
  }, []);

  return (
    <PageWrapper>
      <UploadPictureModal />
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
                <p style={{ fontFamily: "Raleway", fontSize: "24px" }}>
                  {displayName}
                </p>
                <ProfileHeaderDetails>
                  <MdLocationOn size="1.1rem" className="LocationIcon" />
                  <p>Florida, Kentucky</p>
                  <p> | Role: </p>
                  <ProfileHeaderRole>Senior</ProfileHeaderRole>
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
  flex: 1;
  justify-content: space-around;
`;

const ProfileWrapper = styled.div`
  width: 64%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProfileBackground = styled.img`
  width: 100%;
  height: 140px;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
`;

const ProfileContentWrapper = styled.div`
  text-align: left;
  width: 94%;
`;

const ProfilePicture = muiStyled(Avatar)({
  width: "100px",
  height: "100px",
  margin: "-50px 0 0 -2px",
  border: "solid",
  borderColor: "white",
  borderWidth: "4px",
});

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
  }
  & > * {
    font-size: 14px;
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
  }
`;

export default Profile;
