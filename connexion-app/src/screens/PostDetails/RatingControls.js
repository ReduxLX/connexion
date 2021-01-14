import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useAuth } from "../../AuthContext";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { truncateNum, showSnackbar } from "../../utils";

const RatingControls = (props) => {
  const { postId, upvotedUsers, downvotedUsers } = props;
  const { upvotePost, downvotePost, currentUser } = useAuth();
  const initialRating =
    upvotedUsers && downvotedUsers
      ? upvotedUsers.length - downvotedUsers.length
      : 0;
  const startUpvoted =
    currentUser && upvotedUsers
      ? upvotedUsers.includes(currentUser.uid)
      : false;
  const startDownvoted =
    currentUser && upvotedUsers
      ? downvotedUsers.includes(currentUser.uid)
      : false;
  const [hasUpvoted, setHasUpvoted] = useState(startUpvoted);
  const [hasDownvoted, setHasDownvoted] = useState(startDownvoted);
  const [rating, setRating] = useState(initialRating);
  const hasVoted = hasUpvoted || hasDownvoted;
  console.log("startUpvoted -> ", startUpvoted);
  console.log("startDownvoted -> ", startDownvoted);
  console.log("hasUpvoted -> ", hasUpvoted);
  console.log("hasDownvoted -> ", hasDownvoted);
  console.log("initialRating -> ", initialRating);
  console.log("rating -> ", rating);
  console.log("hasVoted -> ", hasVoted);
  const offset = () => {
    if (startUpvoted) return -1;
    if (startDownvoted) return +1;
    return 0;
  };

  const handleUpvote = () => {
    if (currentUser) {
      upvotePost(postId);
      setHasDownvoted(false);
      if (!hasVoted || hasDownvoted) {
        setRating(initialRating + 1 + offset());
        setHasUpvoted(true);
      } else {
        setRating(initialRating + offset());
        setHasUpvoted(false);
      }
    } else {
      showSnackbar("error", "You need to sign in to upvote/downvote posts");
    }
  };

  const handleDownvote = () => {
    if (currentUser) {
      downvotePost(postId);
      setHasUpvoted(false);
      if (!hasVoted || hasUpvoted) {
        setRating(initialRating - 1 + offset());
        setHasDownvoted(true);
      } else {
        setRating(initialRating + offset());
        setHasDownvoted(false);
      }
    } else {
      showSnackbar("error", "You need to be logged in to do that");
    }
  };

  useEffect(() => {
    setRating(initialRating);
  }, [initialRating]);
  useEffect(() => {
    setHasUpvoted(startUpvoted);
  }, [startUpvoted]);
  useEffect(() => {
    setHasDownvoted(startDownvoted);
  }, [startDownvoted]);

  return (
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
  );
};

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
`;

const Rating = styled.p`
  font-family: "NunitoBold";
  font-size: ${({ rating }) => (rating.length > 2 ? "12px" : "16px")};
  align-items: center;
  color: ${({ hasUpvoted, hasDownvoted, theme }) =>
    hasUpvoted
      ? theme.colors.main
      : hasDownvoted
      ? theme.colors.error
      : theme.colors.disabled};
`;

const Upvote = styled(FaArrowUp)`
  width: 20px;
  height: 20px;
  transition: 0.2s;
  cursor: pointer;
  color: ${({ hasupvoted, theme }) =>
    hasupvoted === "true" ? theme.colors.main : theme.colors.disabled};
  &:hover {
    color: ${({ theme: { colors } }) => colors.main};
  }
`;

const Downvote = styled(FaArrowDown)`
  width: 20px;
  height: 20px;
  transition: 0.2s;
  cursor: pointer;
  color: ${({ hasdownvoted, theme }) =>
    hasdownvoted === "true" ? theme.colors.error : theme.colors.disabled};
  &:hover {
    color: ${({ theme: { colors } }) => colors.error};
  }
`;

export default RatingControls;
