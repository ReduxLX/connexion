import React, { useState } from "react";
import styled from "styled-components";
import { GoComment } from "react-icons/go";
import Chip from "../components/Chip";
import Avatar from "@material-ui/core/Avatar";
import ProfileImg1 from "../res/images/avatar1.jpg";
import TextTruncate from "react-text-truncate";

const PostContent = (props) => {
  const {
    title = "Title",
    body = "Body text",
    poster = "Poster",
    time = "42s ago",
    comments = 0,
  } = props;

  const [isExpanded, toggleExpand] = useState(false);
  console.log("Render Post Content");
  const getText = () => body.trim();
  return (
    <PostContentWrapper>
      <PostHeader>
        <TopicTitle>{title}</TopicTitle>
      </PostHeader>
      <Chip />
      <PostBody>
        {!isExpanded ? (
          <TextTruncate
            line={3}
            element="span"
            truncateText="…"
            text={getText()}
            textTruncateChild={
              <ReadMore onClick={() => toggleExpand(true)}>Read More</ReadMore>
            }
          />
        ) : (
          body
        )}
      </PostBody>
      <hr />
      <Footer>
        <FooterLeft>
          <Avatar
            alt="pic"
            src={ProfileImg1}
            style={{ width: "30px", height: "30px" }}
          />
          <p>
            Posted By <Poster>{poster}</Poster>
          </p>
          <p>{time}</p>
        </FooterLeft>
        <CommentCount>
          <GoComment style={{ width: "25px", height: "25px" }} />
          <p>{comments}</p>
        </CommentCount>
      </Footer>
    </PostContentWrapper>
  );
};

const PostContentWrapper = styled.div`
  min-width: 350px;
  max-width: 700px;
  padding: 1rem 2rem;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  text-align: left;
  word-wrap: break-word;
  & > * {
    margin-bottom: 0.5rem;
  }
`;

const PostHeader = styled.div`
  display: table;
  table-layout: fixed;
  width: 100%;
`;

const PostBody = styled.div`
  display: table;
  table-layout: fixed;
  width: 100%;
  word-wrap: break-word;
`;

const ReadMore = styled.a`
  cursor: pointer;
  color: ${({ theme: { colors } }) => colors.disabled};
  &:hover {
    color: ${({ theme: { colors } }) => colors.main};
  }
`;

const TopicTitle = styled.div`
  display: table-cell;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  margin-bottom: 5px;
  transition: 0.2s;
  font-size: 20px;
  font-family: "NunitoBold";
  cursor: pointer;
  &:hover {
    color: ${({ theme: { colors } }) => colors.main};
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
  }
`;

const FooterLeft = styled.div`
  display: flex;
  align-items: center;
  & > * {
    margin-right: 0.5rem;
  }
  p {
    font-size: 14px;
  }
`;

const CommentCount = styled.div`
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
  p {
    font-size: 14px;
  }
`;

const Poster = styled.span`
  cursor: pointer;
`;

export default React.memo(PostContent);
