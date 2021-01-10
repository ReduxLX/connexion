import React from "react";
import styled from "styled-components";
import { PageWrapper } from "../SharedStyles";
import { useAuth } from "../../AuthContext";

const Profile = () => {
  const { currentUser } = useAuth();

  return (
    <PageWrapper>
      {currentUser ? <h1>Logged in</h1> : <h1>Not Logged in</h1>}
    </PageWrapper>
  );
};

export default Profile;
