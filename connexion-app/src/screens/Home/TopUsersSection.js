import React from "react";
import styled from "styled-components";
import Avatar from "@material-ui/core/Avatar";
import ProfileImg1 from "../../res/images/avatar1.jpg";
import { truncateNum } from "../../utils";
import Divider from "../../components/Divider";

const fakeTopUsers = [
  {
    id: 1,
    username: "Marius Von Augustus du Rene",
    role: "Alumni",
    points: 212121212112121,
  },
  {
    id: 2,
    username: "Hoagie Macintosh",
    role: "Current Student ",
    points: 5673,
  },
  {
    id: 3,
    username: "Rip Van Winkle",
    role: "Prospective Student",
    points: 2103,
  },
  {
    id: 4,
    username: "Arthur Calahan",
    role: "Current Student",
    points: 993,
  },
  {
    id: 5,
    username: "Arthur Calahan",
    role: "Current Student",
    points: 993,
  },
];

const currentUser = {
  id: 5,
  username: "You",
  role: "Current Student",
  points: 503,
};

const isTopUser = fakeTopUsers[0].id;

const TopUsersSection = () => {
  const renderUser = ({ id, username, role, points }) => {
    return (
      <UserWrapper key={id} isTopUser={id === isTopUser}>
        <UserBody>
          <Avatar
            className="Avatar"
            alt="pic"
            src={ProfileImg1}
            style={{ width: "35px", height: "35px" }}
          />
          <TextGroup>
            <Username>{username}</Username>
            <p className="Role">{role}</p>
          </TextGroup>
        </UserBody>
        <UserRank>
          <p>{truncateNum(points)}</p>
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
      <Title>Top Users</Title>
      {renderTopUsers()}
      <Divider width="100%" height="1px" />
      {renderCurrentUser(currentUser)}
    </SectionWrapper>
  );
};

const SectionWrapper = styled.div`
  flex: 2;
  min-width: 200px;
  width: 20vw;
  height: fit-content;
  margin-left: 1rem;
  padding: 1rem 1rem 0 0.6rem;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1);
  text-align: left;
  & > * {
    margin-bottom: 1rem;
  }
  @media (max-width: 768px) {
    display: none;
  }
`;

const Title = styled.p`
  font-family: "RalewaySemiBold";
  margin-left: 0.2rem;
  margin-bottom: 1.5rem;
  color: ${({ theme: { colors } }) => colors.secondary};
`;

const UserWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.2rem;
  color: ${({ theme: { colors } }) => colors.disabled};
  & > * {
    .Avatar {
      border: solid;
      border-width: 4px;
      border-color: ${({ isTopUser }) =>
        isTopUser ? "rgba(250, 190, 44, 0.2)" : "rgba(0,0,0,0.08)"};
    }
    > * {
      .Role {
        font-size: 12px;
        opacity: ${({ isTopUser }) => (isTopUser ? 0.6 : 0.5)};
        white-space: nowrap;
      }

      color: ${({ isTopUser }) => isTopUser && "#FABE2C"};
    }
  }
`;

const UserBody = styled.div`
  display: flex;
  align-items: center;
  width: 85%;
  & > * {
    margin-right: 0.5rem;
  }
  &:hover {
    opacity: 0.85;
    cursor: pointer;
  }
`;

const TextGroup = styled.div`
  text-align: left;
  max-width: 140px;
  width: 10vw;
`;

const Username = styled.p`
  font-family: "RalewaySemiBold";
  font-weight: bold;
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const UserRank = styled.div`
  display: flex;
  align-items: center;
  p {
    font-size: 14px;
  }
`;

export default TopUsersSection;
