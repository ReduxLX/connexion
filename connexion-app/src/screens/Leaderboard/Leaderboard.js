import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { PageWrapper } from "../SharedStyles";
import styled from "styled-components";
import Avatar from "@material-ui/core/Avatar";
import CircularProgress from "@material-ui/core/CircularProgress";
import { truncateNum } from "../../utils";
import Divider from "../../components/Divider";
import { useAuth } from "../../AuthContext";
import Theme from "../../Theme";

import { GiLaurelsTrophy } from "react-icons/gi";

const Leaderboard = () => {
  const { fetchTopUsers, fetchUserData, currentUser } = useAuth();

  const topUsers = useSelector((state) => state.Home.topUsers);
  const userData = useSelector((state) => state.Home.userData);
  const isFetchingTopUsers = useSelector(
    (state) => state.Home.isFetchingTopUsers
  );

  useEffect(() => {
    if (topUsers.length === 0) fetchTopUsers();
    fetchUserData();
  }, []);

  const renderUser = ({ uid, displayName, role, points, photoURL }, rank) => {
    return (
      <UserWrapper key={uid} rank={rank + 1}>
        <UserDetails>
          <Avatar className="Avatar" src={photoURL} alt="userProfile" />
          <UserDetailsTextWrapper>
            <Username>
              {currentUser && uid === currentUser.uid ? "You" : displayName}
            </Username>
            <p className="Role">Role: {role}</p>
          </UserDetailsTextWrapper>
        </UserDetails>
        <PointsWrapper rank={rank + 1}>
          {rank >= 0 && <GiLaurelsTrophy className="Trophy" />}
          <Points>{truncateNum(points)}</Points>
        </PointsWrapper>
      </UserWrapper>
    );
  };

  const renderLeaderboard = () => {
    return topUsers.map((otherUser, index) => {
      return renderUser(otherUser, index);
    });
  };

  const renderCurrentUser = () => {
    if (userData && userData.uid) {
      return renderUser(userData);
    }
  };

  return (
    <PageWrapper>
      {isFetchingTopUsers ? (
        <div style={{ margin: "auto", marginTop: "3rem" }}>
          <CircularProgress size={35} style={{ color: Theme.colors.main }} />
        </div>
      ) : (
        <TopUsersWrapper>
          <Title>Leaderboard</Title>
          {renderLeaderboard()}
          {currentUser && (
            <>
              <Divider width="100%" height="1px" margin="1rem 0" />
              {renderCurrentUser()}
            </>
          )}
        </TopUsersWrapper>
      )}
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
