import React from "react";
import styled from "styled-components";
import { PageWrapper } from "../SharedStyles";
import DiscussionSection from "./DiscussionSection";
import PostSection from "./PostSection";
import TopUsersSection from "./TopUsersSection";

const Home = () => {
  return (
    <PageWrapper>
      <HomeWrapper>
        <DiscussionSection />
        <PostSection />
        <TopUsersSection />
      </HomeWrapper>
    </PageWrapper>
  );
};

const HomeWrapper = styled.div`
  display: flex;
`;

export default Home;
