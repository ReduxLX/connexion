import React from "react";
import styled from "styled-components";
import { GoComment } from "react-icons/go";
import Chip from "../components/Chip";
import Avatar from "@material-ui/core/Avatar";
import ProfileImg1 from "../res/images/avatar1.jpg";

const PostContent = (props) => {
  const {
    title = "Title",
    body = "Body text",
    poster = "Poster",
    time = "42s ago",
    comments = 0,
  } = props;
  console.log("Render Post Content");
  return (
    <PostContentWrapper>
      <div>
        <TopicTitle>
          <h1>{title}</h1>
        </TopicTitle>
        <Chip />
      </div>
      <p>{body}</p>
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
  padding: 1rem 1.5rem;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  text-align: left;
  & > * {
    margin-bottom: 0.5rem;
  }
`;

const TopicTitle = styled.div`
  margin-bottom: 5px;
  transition: 0.2s;
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
