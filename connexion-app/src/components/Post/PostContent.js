import React, { useState, useMemo } from "react";
import styled from "styled-components";
import { GoComment } from "react-icons/go";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import Chip from "./Chip";
import Avatar from "@material-ui/core/Avatar";
import ProfileImg1 from "../../res/images/avatar1.jpg";
import TextTruncate from "react-text-truncate";
import Theme from "../../Theme";
import { truncateNum, truncateText } from "../../utils";

const PostContent = (props) => {
  const {
    title = "Title",
    body = "Body text",
    poster = "Poster",
    time = "42s ago",
    comments = 0,
    rating = 0,
    hasUpvoted,
    hasDownvoted,
    handleUpvote = () => {},
    handleDownvote = () => {},
  } = props;

  console.log("Render Post Content");

  const renderBodyTextMemoized = useMemo(
    () => (
      <TextTruncate
        line={3}
        element="span"
        truncateText="…"
        text={body.trim()}
      />
    ),
    []
  );

  const renderRating = () => {
    return (
      <RatingWrapper>
        <div onClick={() => handleUpvote()}>
          <Upvote hasupvoted={hasUpvoted.toString()} />
        </div>
        <div
          style={{
            minWidth: "40px",
            textAlign: "center",
            verticalAlign: "center",
          }}
        >
          <Rating hasUpvoted={hasUpvoted} hasDownvoted={hasDownvoted}>
            {truncateNum(rating)}
          </Rating>
        </div>
        <div onClick={() => handleDownvote()}>
          <Downvote hasdownvoted={hasDownvoted.toString()} />
        </div>
      </RatingWrapper>
    );
  };

  return (
    <PostContentWrapper>
      <PostHeader>{title.trim()}</PostHeader>
      <Chip />
      <PostBody>{renderBodyTextMemoized}</PostBody>
      <hr />
      <Footer>
        <FooterLeft>
          <Avatar
            alt="pic"
            src={ProfileImg1}
            style={{ width: "30px", height: "30px" }}
          />
          <p className="label">Posted By</p>
          <p>
            <Poster>{truncateText(poster, 15)}</Poster>
          </p>
        </FooterLeft>
        <FooterMiddle>
          <Time>
            <p>{time}</p>
          </Time>
          <RatingControls>{renderRating()}</RatingControls>
        </FooterMiddle>
        <FooterRight>
          <GoComment style={{ width: "25px", height: "25px" }} />
          <p>{comments}</p>
        </FooterRight>
      </Footer>
    </PostContentWrapper>
  );
};

const PostContentWrapper = styled.div`
  min-width: 250px;
  max-width: 700px;
  padding: 1em 2em 0.5em;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  text-align: left;
  word-wrap: break-word;
  & > * {
    margin-bottom: 0.5rem;
  }
`;

const PostBody = styled.div`
  display: table;
  table-layout: fixed;
  width: 100%;
  word-wrap: break-word;
`;

const PostHeader = styled.h1`
  margin-bottom: 5px;
  transition: 0.2s;
  font-size: 16px;
  font-family: "NunitoBold";
  cursor: pointer;
  &:hover {
    color: ${({ theme: { colors } }) => colors.main};
  }
  @media (min-width: 768px) {
    font-size: 20px;
  }
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  padding-right: 1rem;
  color: #9c9c9c;
  & > * {
    span {
      opacity: 0.6;
      color: ${({ theme: { colors } }) => colors.main};
    }
    @media (max-width: 768px) {
      & > *,
      & > * > * {
        font-size: 12px;
      }
    }
  }
`;

const FooterLeft = styled.div`
  display: flex;
  align-items: center;
  & > * {
    margin-right: 0.5rem;
  }
  .label {
    @media (max-width: 768px) {
      display: none;
    }
  }
`;

const FooterMiddle = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;
  padding-right: 5px;
`;

const Time = styled.div`
  display: none;
  align-items: center;
  @media (min-width: 768px) {
    display: flex;
  }
`;

const RatingControls = styled.div`
  display: flex;
  align-items: center;
  @media (min-width: 768px) {
    display: none;
  }
  & > * {
    margin-right: 0.5rem;
  }
`;

const FooterRight = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  & > * {
    margin-left: 0.2rem;
  }
  &:hover {
    color: ${({ theme: { colors } }) => colors.main};
  }
`;

const Poster = styled.span`
  cursor: pointer;
`;

const RatingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 1rem;
`;

const Rating = styled.p`
  font-family: "NunitoBold";
  font-size: 14px;
  align-items: center;
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
  @media (max-width: 768px) {
    width: 15px;
    height: 15px;
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
  @media (max-width: 768px) {
    width: 15px;
    height: 15px;
  }
`;

export default React.memo(PostContent);
