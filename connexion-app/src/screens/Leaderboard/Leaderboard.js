import React from "react";
import { PageWrapper } from "../SharedStyles";
import styled from "styled-components";
import Avatar from "@material-ui/core/Avatar";
import ProfileImg1 from "../../res/images/avatar1.jpg";
import { truncateNum } from "../../utils";
import Divider from "../../components/Divider";

import { GiLaurelsTrophy } from "react-icons/gi";

const fakeTopUsers = [
  {
    id: 1,
    username: "Marius Von Augustus du Rene",
    role: "Alumni",
    points: 430,
  },
  {
    id: 2,
    username: "Hoagie Macintosh",
    role: "Current Student ",
    points: 394,
  },
  {
    id: 3,
    username: "Rip Van Winkle",
    role: "Prospective Student",
    points: 376,
  },
  {
    id: 4,
    username: "Arthur Calahan",
    role: "Current Student",
    points: 283,
  },
  {
    id: 5,
    username: "Arthur Calahan",
    role: "Current Student",
    points: 259,
  },
];

const currentUser = {
  id: 5,
  username: "You",
  role: "Current Student",
  points: 120,
};

const topUserIds = [fakeTopUsers[0].id, fakeTopUsers[1].id, fakeTopUsers[2].id];

const Leaderboard = () => {
  const renderUser = ({ id, username, role, points }) => {
    return (
      <UserWrapper key={id} rank={topUserIds.indexOf(id) + 1}>
        <UserDetails>
          <Avatar className="Avatar" src={ProfileImg1} alt="userProfile" />
          <UserDetailsTextWrapper>
            <Username>{username}</Username>
            <p className="Role">Role: {role}</p>
          </UserDetailsTextWrapper>
        </UserDetails>
        <PointsWrapper rank={topUserIds.indexOf(id) + 1}>
          {topUserIds.indexOf(id) >= 0 && (
            <GiLaurelsTrophy className="Trophy" />
          )}
          <Points>{truncateNum(points)}</Points>
        </PointsWrapper>
      </UserWrapper>
    );
  };

  const renderLeaderboard = () => {
    return fakeTopUsers.map((otherUser) => {
      return renderUser(otherUser);
    });
  };

  const renderCurrentUser = () => {
    return renderUser(currentUser);
  };

  return (
    <PageWrapper>
      <TopUsersWrapper>
        <Title>Leaderboard</Title>
        {renderLeaderboard()}
        <Divider width="100%" height="1px" margin="1rem 0" />
        {renderCurrentUser()}
      </TopUsersWrapper>
    </PageWrapper>
  );
};

const TopUsersWrapper = styled.div`
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.08);
  padding: 1rem 1rem 0.4rem 1rem;
  text-align: left;
`;

const Title = styled.p`
  font-family: "RalewaySemiBold";
  color: ${({ theme: { colors } }) => colors.secondary};
  margin-bottom: 1.6rem;
  margin-left: 5px;
`;

const UserWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: ${({ rank, theme: { colors } }) =>
    rank === 1 && colors.main};
  border-radius: 5px;
  padding: ${({ rank }) => (rank === 1 ? "8px 5px" : "0 5px")};
  justify-content: space-between;
  margin-bottom: 1rem;
  & > * {
    color: ${({ rank, theme: { colors } }) =>
      rank === 1
        ? "white"
        : rank === 2
        ? colors.secondary
        : rank === 3
        ? "#696969"
        : colors.disabled};
  }
  .Role {
    font-size: 12px;
    opacity: 0.6;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .Avatar {
    border: solid;
    border-color: ${({ rank }) =>
      rank === 1
        ? "rgba(255,255,255,0.2)"
        : rank === 2
        ? "rgba(31, 66, 135, 0.2)"
        : "rgba(0,0,0,0.08)"};
    width: 33px;
    height: 33px;
    margin-right: 0.4rem;
  }
`;

const UserDetails = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const UserDetailsTextWrapper = styled.div`
  max-width: 45vw;
  margin-right: 0.2rem;
  @media (max-width: 320px) {
    max-width: 40vw;
  }
`;

const Username = styled.p`
  font-family: "RalewaySemiBold";
  font-size: 14px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  @media (max-width: 350px) {
    font-size: 13px;
  }
`;

const PointsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-right: 0.2rem;
  .Trophy {
    margin-right: 8px;
    width: 22px;
    height: 22px;
    @media (max-width: 350px) {
      width: 18px;
      height: 18px;
    }
    color: ${({ rank }) =>
      rank === 1 ? "#FED843" : rank === 2 ? "#9c9c9c" : "#CD7F32"};
  }
`;

const Points = styled.p`
  font-family: "Nunito";
  font-size: 18px;
  @media (max-width: 350px) {
    font-size: 16px;
  }
`;

export default Leaderboard;
