import React from "react";
import styled from "styled-components";
import { PageWrapper } from "../SharedStyles";
import CategorySection from "./CategorySection";
import PostSection from "./PostSection";
import TopUsersSection from "./TopUsersSection";

const Home = () => {
  return (
    <PageWrapper>
      <HomeWrapper>
        <CategorySection />
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
