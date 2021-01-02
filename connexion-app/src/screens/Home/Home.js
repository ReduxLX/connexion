import React from "react";
import styled from "styled-components";
import { PageWrapper } from "../SharedStyles";
import DiscussionTab from "../../components/DiscussionTab";
import Post from "../../components/Post";

const fakePosts = [
  {
    id: 1,
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    body:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. A cursus eros congue at tristique et nunc sollicitudin. Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    poster: "NaomiEX",
    comments: 5,
  },
  {
    id: 2,
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    body:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. A cursus eros congue at tristique et nunc sollicitudin. Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    poster: "NaomiEX",
    comments: 5,
  },
];

const Home = () => {
  const renderPosts = () => {
    return fakePosts.map(({ id, title, body, poster, comments }) => (
      <Post
        key={id}
        title={title}
        body={body}
        poster={poster}
        comments={comments}
      />
    ));
  };

  return (
    <PageWrapper>
      <HomeWrapper>
        <DiscussionTab />
        <div>{renderPosts()}</div>
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
