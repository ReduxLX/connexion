import React, { useState } from "react";
import styled from "styled-components";
import { HiReply } from "react-icons/hi";
import { FiFlag } from "react-icons/fi";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { truncateNum } from "../../utils";

import Avatar from "@material-ui/core/Avatar";
import ProfileImg1 from "../../res/images/avatar1.jpg";

const Comment = (props) => {
  const { comment, date, initialRating = 0 } = props;

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

  const renderRating = () => {
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

  return (
    <CommentWrapper>
      <CommentVotes className="commentVotes">{renderRating()}</CommentVotes>
      <CommentBody>
        <CommentHeader>
          <Avatar
            className="Avatar"
            alt="pic"
            src={ProfileImg1}
            style={{ width: "35px", height: "35px" }}
          />
          <CommentHeaderInfo>
            <CommentHeaderUsername>NaomiEX</CommentHeaderUsername>
            <CommentHeaderDate>Posted {date}</CommentHeaderDate>
          </CommentHeaderInfo>
        </CommentHeader>
        {comment}
        <CommentFooter>
          <div>
            <HiReply />
            <p style={{ fontFamily: "NunitoBold", marginLeft: "0.5rem" }}>
              Reply
            </p>
          </div>
          <div>
            <FiFlag />
            <p style={{ marginLeft: "0.5rem" }}>Flag</p>
          </div>
        </CommentFooter>
      </CommentBody>
    </CommentWrapper>
  );
};

const CommentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 4rem;
  white-space: pre-line;
`;

const CommentVotes = styled.div`
  flex: 4;
`;

const CommentBody = styled.div`
  flex: 46;
`;

const CommentHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 1rem;
  .Avatar {
    cursor: pointer;
  }
`;

const CommentHeaderInfo = styled.div`
  margin-left: 0.5rem;
`;

const CommentHeaderUsername = styled.div`
  font-size: 16px;
  font-family: "NunitoSemiBold";
  cursor: pointer;
  color: ${({ theme: { colors } }) => colors.disabled};
  &:hover {
    color: ${({ theme: { colors } }) => colors.main};
  }
`;

const CommentHeaderDate = styled.p`
  color: ${({ theme: { colors } }) => colors.disabled_light};
  font-size: 14px;
`;

const CommentFooter = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 1.8rem;
  & > * {
    p {
      @media (max-width: 350px) {
        display: none;
      }
    }
    display: flex;
    flex-direction: row;
    align-items: center;
    cursor: pointer;
    color: ${({ theme: { colors } }) => colors.main};
    margin-right: 1.8rem;
  }
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

export default Comment;
