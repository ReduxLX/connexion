import React from "react";
import styled from "styled-components";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import Avatar from "@material-ui/core/Avatar";
import ProfileImg1 from "../../res/images/avatar1.jpg";
import Theme from "../../Theme";
import * as actHome from "./ac-Home";

const fakeTopUsers = [
  {
    id: 1,
    username: "Cher Lumine",
    role: "Alumni",
    points: 424,
    rising: true,
  },
  {
    id: 2,
    username: "Hoagie Macintosh",
    role: "Current Student",
    points: 399,
    rising: false,
  },
  {
    id: 3,
    username: "Rip Van Winkle",
    role: "Prospective Student",
    points: 210,
    rising: true,
  },
  {
    id: 4,
    username: "Arthur Calahan",
    role: "Current Student",
    points: 193,
    rising: false,
  },
];

const currentUser = {
  id: 5,
  username: "You",
  role: "Current Student",
  points: 95,
  rising: true,
};

const TopUsersSection = () => {
  const renderUser = ({ id, username, role, points, rising }) => {
    return (
      <UserWrapper key={id}>
        <UserBody>
          <Avatar alt="pic" src={ProfileImg1} />
          <TextGroup>
            <strong>{username}</strong>
            <p>{role}</p>
          </TextGroup>
        </UserBody>
        <UserRank>
          <p>{points}</p>
          {rising ? <Upvote /> : <Downvote />}
        </UserRank>
      </UserWrapper>
    );
  };

  const renderTopUsers = () => {
    return fakeTopUsers.map((user) => {
      return renderUser(user);
    });
  };

  const renderCurrentUser = () => {
    return renderUser(currentUser);
  };

  return (
    <SectionWrapper>
      <p>Top Users</p>
      {renderTopUsers()}
      <hr />
      {renderCurrentUser(currentUser)}
    </SectionWrapper>
  );
};

const SectionWrapper = styled.div`
  /* min-width: 200px; */
  /* width: 20%; */
  flex: 2;
  height: fit-content;
  padding: 1rem;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1);
  text-align: left;
  & > * {
    margin-bottom: 1rem;
  }
  @media (max-width: 768px) {
    display: none;
  }
`;

const UserWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  color: ${({ theme: { colors } }) => colors.disabled};
`;

const UserBody = styled.div`
  display: flex;
  & > * {
    margin-right: 0.5rem;
  }
`;

const TextGroup = styled.div`
  text-align: left;
  p {
    font-size: 14px;
  }
  strong {
    cursor: pointer;
    font-weight: lighter;
    color: ${({ theme: { colors } }) => colors.main};
  }
`;

const UserRank = styled.div`
  display: flex;
  align-items: center;
`;

const Upvote = styled(FaArrowUp)`
  width: 20px;
  height: 20px;
  color: ${({ theme: { colors } }) => colors.main};
`;

const Downvote = styled(FaArrowDown)`
  width: 20px;
  height: 20px;
  color: ${({ theme: { colors } }) => colors.error};
`;

export default TopUsersSection;
