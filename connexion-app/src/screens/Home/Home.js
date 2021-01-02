import React from "react";
import { PageWrapper } from "../SharedStyles";
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
      <div>{renderPosts()}</div>
    </PageWrapper>
  );
};

export default Home;
