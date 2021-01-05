import React from "react";
import styled from "styled-components";
import Avatar from "@material-ui/core/Avatar";
import ProfileImg1 from "../../res/images/avatar1.jpg";

const fakeTopUsers = [
  {
    id: 1,
    username: "Marius Von Augustus du Rene",
    role: "Alumni / Lecturer / Hacker",
    points: 212121212112121,
  },
  {
    id: 2,
    username: "Hoagie Macintosh",
    role: "Current Student / Community Leader",
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
];

const currentUser = {
  id: 5,
  username: "You",
  role: "Current Student",
  points: 503,
};

const TopUsersSection = () => {
  const renderUser = ({ id, username, role, points }) => {
    return (
      <UserWrapper key={id}>
        <UserBody>
          <Avatar
            alt="pic"
            src={ProfileImg1}
            style={{ width: "40px", height: "40px" }}
          />
          <TextGroup>
            <strong>{username}</strong>
            <p>{role}</p>
          </TextGroup>
        </UserBody>
        <UserRank>
          <p>{points < 10000 ? points : `${points % 1000}k`}</p>
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
  flex: 2;
  min-width: 240px;
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
  width: 85%;
  & > * {
    margin-right: 0.5rem;
  }
`;

const TextGroup = styled.div`
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  p {
    font-size: 12px;
  }
  strong {
    font-size: 14px;
    cursor: pointer;
    font-weight: normal;
    color: ${({ theme: { colors } }) => colors.main};
  }
`;

const UserRank = styled.div`
  display: flex;
  align-items: center;
  p {
    font-size: 14px;
  }
`;

export default TopUsersSection;
