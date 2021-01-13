import React from "react";
import styled from "styled-components";
import { PageWrapper } from "../SharedStyles";
import CloudsBG from "../../res/images/CloudsBG.png";
import ProfileImg1 from "../../res/images/avatar1.jpg";
import ProfileTab from "./ProfileTab";

import Avatar from "@material-ui/core/Avatar";
import { styled as muiStyled } from "@material-ui/styles";
import { MdLocationOn } from "react-icons/md";

const fakePosts = [
  {
    id: 1,
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    body:
      "nospaceword_nospaceword_nospaceword_nospaceword_nospaceword_nospaceword_nospaceword_nospaceword_nospaceword_nospaceword_nospaceword_nospaceword_nospaceword_nospaceword_nospaceword_nospaceword_nospaceword_nospaceword_nospaceword_nospaceword_nospaceword_nospaceword_nospaceword_nospaceword_nospaceword_nospaceword_nospaceword_nospaceword_nospaceword_nospaceword_nospaceword_nospaceword_nospaceword_nospaceword_nospaceword_nospaceword_nospaceword_nospaceword_nospaceword_nospaceword_nospaceword_nospaceword_nospaceword_nospaceword_nospaceword_nospaceword_nospaceword_nospaceword_nospaceword_nospaceword_nospaceword",
    poster: "Arthur Calahan",
    comments: 100,
    rating: 100000,
  },
  {
    id: 2,
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    body:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec lacinia, turpis eu euismod venenatis, nulla magna convallis tortor, eu blandit nibh ante non orci. Nunc sed ante volutpat, suscipit libero sit amet, vestibulum ex. Vestibulum in fringilla augue. Integer ligula enim, scelerisque et maximus id, pellentesque id dui. Vestibulum at mattis massa. Fusce viverra iaculis faucibus. Vestibulum molestie sapien vel mauris varius molestie non sed metus. Duis placerat ac ligula porttitor varius. Cras eu vulputate velit, sit amet gravida mauris. Duis non dictum erat, non semper ligula. Phasellus id sem quis eros tempor accumsan ut ac tellus. Ut dignissim accumsan justo vitae porttitor.",
    poster: "Marius Von Augustus Herr",
    comments: 5,
    rating: 999,
  },
  {
    id: 3,
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    body:
      "I am a moderately short post, not too short and not too long, this should not have a read more as it is only two lines long",
    poster: "NaomiEX",
    comments: 5,
    rating: 25,
  },
  {
    id: 4,
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    body:
      "This text will fit 2 lines approximately on a desktop monitor, read more should not apply but maybe sometimes it does, well lets find out shall we__________",
    poster: "NaomiEX",
    comments: 5,
    rating: 10,
  },
  {
    id: 5,
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    body:
      "This text tests the boundary of when text starts to truncate, read more should pop up when removing/adding 1 character making this a nice edge case. From the looks of things, it seems to only truncate after the third line overflows which is allright ?  ?",
    poster: "NaomiEX",
    comments: 5,
    rating: -10,
  },
];

const userPosts = fakePosts.filter((post) => post.poster === "NaomiEX");
const bookmarkedPosts = fakePosts.filter((post) => post.poster !== "NaomiEX");

const Profile = () => {
  const placeholderDescription =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Volutpat, donec est ultrices suspendisse netus mattis. Vestibulum non eu, gravida porttitor pellentesque dignissim. Phasellus nibh et accumsan felis convallis ut risus suspendisse.";

  return (
    <PageWrapper>
      <ContentWrapper>
        <ProfileWrapper>
          <ProfileBackground src={CloudsBG} alt="Background" />
          <ProfileContentWrapper>
            <ProfileHeader>
              <ProfilePicture src={ProfileImg1} alt="ProfilePicture" />
              <div>
                <p style={{ fontFamily: "Raleway", fontSize: "24px" }}>
                  ReduxLX
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
              <p>Edit</p>
            </ProfileDescription>
            <ProfileTab
              userPosts={userPosts}
              bookmarkedPosts={bookmarkedPosts}
            />
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
