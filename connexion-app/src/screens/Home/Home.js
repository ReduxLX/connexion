import React from "react";
import styled from "styled-components";
import { PageWrapper } from "../SharedStyles";
import DiscussionSection from "./DiscussionSection";
import PostSection from "./PostSection";

const Home = () => {
  return (
    <PageWrapper>
      <HomeWrapper>
        <DiscussionSection />
        <PostSection />
      </HomeWrapper>
    </PageWrapper>
  );
};

const HomeWrapper = styled.div`
  display: flex;
  & > * {
    margin: 0 1rem;
  }
`;

export default Home;
