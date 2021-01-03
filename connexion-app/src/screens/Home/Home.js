import React from "react";
import styled from "styled-components";
import { PageWrapper } from "../SharedStyles";
import DiscussionSection from "./DiscussionSection";
import PostSection from "./PostSection";
import TopUsersSection from "./TopUsersSection";

const Home = () => {
  const renderLong = () => {
    return (
      <div>
        <div>Top Content!</div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <div>Sandwich: Keep Scrolling!</div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <div>More Sandwich: Yum!</div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <div>You can scroll and see me!</div>
      </div>
    );
  };
  return (
    <PageWrapper>
      <HomeWrapper>
        {/* <DiscussionSection />
        <PostSection />
        <TopUsersSection /> */}
        {renderLong()}
      </HomeWrapper>
    </PageWrapper>
  );
};

const HomeWrapper = styled.div`
  /* display: flex; */
  & > * {
    margin: 0 1rem;
  }
`;

export default Home;
