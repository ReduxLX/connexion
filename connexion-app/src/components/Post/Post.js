import React, { useState } from "react";
import styled from "styled-components";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import Theme from "../../Theme";
import PostContent from "./PostContent";
import { truncateNum } from "../../utils";

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

  return (
    <PostWrapper>
      <RatingWrapper>
        <div onClick={() => handleUpvote()}>
          <Upvote hasupvoted={hasUpvoted.toString()} />
        </div>

        <Rating
          hasUpvoted={hasUpvoted}
          hasDownvoted={hasDownvoted}
          rating={truncateNum(rating)}
        >
          {truncateNum(rating)}
        </Rating>
        <div onClick={() => handleDownvote()}>
          <Downvote hasdownvoted={hasDownvoted.toString()} />
        </div>
      </RatingWrapper>
      <PostContent
        rating={rating}
        hasDownvoted={hasDownvoted}
        hasUpvoted={hasUpvoted}
        handleUpvote={handleUpvote}
        handleDownvote={handleDownvote}
        {...props}
      />
    </PostWrapper>
  );
};

const PostWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RatingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-right: 0.4rem;
  min-width: 40px;
  & > * {
    margin-bottom: 0.5rem;
  }
  @media (max-width: 768px) {
    display: none;
  }
`;

const Rating = styled.strong`
  align-items: center;
  font-size: ${({ rating }) => (rating.length > 2 ? "12px" : "16px")};
  color: ${({ hasUpvoted, hasDownvoted }) =>
    hasUpvoted
      ? Theme.colors.main
      : hasDownvoted
      ? Theme.colors.error
      : Theme.colors.disabled};
`;

const Upvote = styled(FaArrowUp)`
  width: 20px;
  height: 20px;
  transition: 0.2s;
  cursor: pointer;
  color: ${({ hasupvoted }) =>
    hasupvoted === "true" ? Theme.colors.main : Theme.colors.disabled};
  &:hover {
    color: ${({ theme: { colors } }) => colors.main};
  }
`;

const Downvote = styled(FaArrowDown)`
  width: 20px;
  height: 20px;
  transition: 0.2s;
  cursor: pointer;
  color: ${({ hasdownvoted }) =>
    hasdownvoted === "true" ? Theme.colors.error : Theme.colors.disabled};
  &:hover {
    color: ${({ theme: { colors } }) => colors.error};
  }
`;

export default Post;
