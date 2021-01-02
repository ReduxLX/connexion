import React, { useState } from "react";
import styled from "styled-components";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import Theme from "../Theme";
import PostContent from "./PostContent";

const Post = (props) => {
  const { initialRating = 0 } = props;
  const [rating, setRating] = useState(initialRating);
  const [hasVoted, setHasVoted] = useState(false);

  const hasUpvoted = hasVoted && rating === initialRating + 1;
  const hasDownvoted = hasVoted && rating === initialRating - 1;

  const handleUpvote = () => {
    if (!hasVoted || rating === initialRating - 1) {
      setRating(initialRating + 1);
      setHasVoted(true);
    } else {
      setRating(initialRating);
      setHasVoted(false);
    }
  };

  const handleDownvote = () => {
    if (!hasVoted || rating === initialRating + 1) {
      setRating(initialRating - 1);
      setHasVoted(true);
    } else {
      setRating(initialRating);
      setHasVoted(false);
    }
  };

  console.log("Render Post");
  return (
    <PostWrapper>
      <RatingWrapper>
        <div onClick={() => handleUpvote()}>
          <Upvote upvoteColor={hasUpvoted ? "blue" : "black"} />
        </div>
        <Rating rating={rating}>{rating}</Rating>
        <div onClick={() => handleDownvote()}>
          <Downvote />
        </div>
      </RatingWrapper>
      <PostContent {...props} />
    </PostWrapper>
  );
};

const PostWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const RatingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 1rem;
`;

const Rating = styled.strong`
  /* color: ${({ rating }) =>
    rating === 0
      ? "black"
      : rating > 0
      ? Theme.colors.main
      : Theme.colors.error}; */
`;

const Upvote = styled(FaArrowUp)`
  width: 20px;
  height: 20px;
  transition: 0.3s;
  cursor: pointer;
  color: ${({ upvoteColor }) => upvoteColor};
  &:hover {
    color: ${({ theme: { colors } }) => colors.main};
  }
`;

const Downvote = styled(FaArrowDown)`
  width: 20px;
  height: 20px;
  transition: 0.3s;
  cursor: pointer;
  &:hover {
    color: ${({ theme: { colors } }) => colors.error};
  }
`;

export default Post;
