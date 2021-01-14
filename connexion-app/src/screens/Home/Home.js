import React, { useEffect } from "react";
import styled from "styled-components";
import { PageWrapper } from "../SharedStyles";
import CategorySection from "./CategorySection";
import PostSection from "./PostSection";
import TopUsersSection from "./TopUsersSection";

const Home = () => {
  // Scroll to top when this page mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
