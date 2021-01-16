import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import { truncateNum } from "../../utils";
import { useAuth } from "../../AuthContext";
import Divider from "../../components/Divider";
import TopUserSkeleton from "./TopUserSkeleton";

const TopUsersSection = () => {
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

  const renderUser = ({ uid, displayName, role, points, photoURL }, index) => {
    return (
      <UserWrapper key={uid} isTopUser={index === 0}>
        <UserBody>
          <Avatar
            className="Avatar"
            alt="pic"
            src={photoURL}
            style={{ width: "35px", height: "35px" }}
          />
          <TextGroup>
            <Username>
              {currentUser && uid === currentUser.uid ? "You" : displayName}
            </Username>
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
    return isFetchingTopUsers ? (
      <TopUserSkeleton num={5} />
    ) : (
      topUsers.map((user, index) => {
        return renderUser(user, index);
      })
    );
  };

  const renderCurrentUser = () => {
    if (userData && userData.uid) {
      return renderUser(userData);
    }
  };

  return (
    <SectionWrapper>
      <Link to="/leaderboard">
        <Title>Top Users</Title>
      </Link>
      {renderTopUsers()}
      {currentUser && !isFetchingTopUsers && (
        <>
          <Divider width="100%" height="1px" />
          {renderCurrentUser()}
        </>
      )}
    </SectionWrapper>
  );
};

const SectionWrapper = styled.div`
  flex: 2;
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
        overflow: hidden;
        text-overflow: ellipsis;
        width: 10vw;
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
