import React, { useMemo } from "react";
import styled from "styled-components";
import { GoComment } from "react-icons/go";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import Chip from "./Chip";
import Avatar from "@material-ui/core/Avatar";
import TextTruncate from "react-text-truncate";
import Theme from "../../Theme";
import Divider from "../Divider";
import { truncateNum, truncateText, convertSecondsToDate } from "../../utils";
import { useHistory } from "react-router-dom";

const PostContent = (props) => {
  const {
    postId = "",
    title = "",
    body = "",
    bodyPlain = "",
    displayName = "",
    timestamp = "",
    photoURL = "",
    university = "",
    comments = 0,
    rating = 0,
    hasUpvoted,
    hasDownvoted,
    handleUpvote = () => {},
    handleDownvote = () => {},
    categories = [],
    showRating = true,
  } = props;

  const history = useHistory();

  console.log("Render Post Content");

  const renderBodyTextMemoized = useMemo(
    () => (
      <TextTruncate
        line={3}
        element="span"
        truncateText="…"
        text={bodyPlain.trim()}
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
      <PostHeader
        onClick={() => {
          history.push(`/post/${postId}`);
        }}
      >
        {title.trim()}
      </PostHeader>
      <ChipGroup>
        <Chip key={0} category={university} variant="university" />
        {categories.map((category, index) => (
          <Chip key={index + 1} category={category} />
        ))}
      </ChipGroup>
      <PostBody>{renderBodyTextMemoized}</PostBody>
      <Divider width="100%" height="1px" margin="0.8rem 0 0.3rem 0" />
      <Footer>
        <FooterLeft>
          <Avatar
            alt="pic"
            src={photoURL}
            style={{
              width: "35px",
              height: "35px",
              border: "solid",
              borderColor: "rgba(0,0,0,0.1)",
              borderWidth: "3px",
            }}
          />
          <p className="label">Posted By</p>
          <p>
            <Poster className="PosterUsername">
              {truncateText(displayName, 15)}
            </Poster>
          </p>
        </FooterLeft>
        <FooterMiddle>
          <Time>
            <p>{convertSecondsToDate(timestamp.seconds)}</p>
          </Time>
          {showRating && <RatingControls>{renderRating()}</RatingControls>}
        </FooterMiddle>
        <FooterRight>
          <GoComment
            style={{ width: "20px", height: "20px", opacity: "0.8" }}
          />
          <p style={{ opacity: "0.8" }}>{comments}</p>
        </FooterRight>
      </Footer>
    </PostContentWrapper>
  );
};

const PostContentWrapper = styled.div`
  min-width: 250px;
  max-width: 700px;
  padding: 1.5em 1.5em 0.8em;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.08);
  border-radius: 10px;
  text-align: left;
  word-wrap: break-word;
  & > * {
    margin-bottom: 0.5rem;
  }
  .Title {
    overflow-wrap: "break-word";
  }
`;

const PostBody = styled.div`
  display: table;
  table-layout: fixed;
  width: 100%;
`;

const PostHeader = styled.h1`
  margin-bottom: 5px;
  transition: 0.2s;
  font-size: 16px;
  font-family: "Raleway";
  overflow-wrap: anywhere;
  cursor: pointer;
  &:hover {
    color: ${({ theme: { colors } }) => colors.main_dark};
  }
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const ChipGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  & > * {
    margin: 0.1rem 0.5rem 0.3rem 0;
  }
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  padding-right: 1rem;
  color: #9c9c9c;
  & > * {
    margin-top: 0.2rem;
    span {
      opacity: 0.6;
      color: ${({ theme: { colors } }) => colors.main};
    }
    & > *,
    & > * > * {
      font-size: 13px;
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
    @media (max-width: 860px) {
      display: none;
    }
  }
  .PosterUsername {
    @media (max-width: 360px) {
      display: none;
    }
    &:hover {
      opacity: 1;
      color: ${({ theme: { colors } }) => colors.main};
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
  display: flex;
  align-items: center;
  opacity: 0.8;
  @media (max-width: 860px) {
    display: none;
  }
`;

const RatingControls = styled.div`
  display: none;
  align-items: center;
  @media (max-width: 768px) {
    display: flex;
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
