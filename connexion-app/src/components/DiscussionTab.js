import React from "react";
import styled from "styled-components";
import { GoCommentDiscussion } from "react-icons/go";
import { styled as muiStyled } from "@material-ui/styles";
import Theme from "../Theme";
import Button from "@material-ui/core/Button";

const fakeDiscussions = [
  {
    id: 1,
    title: "General",
  },
  {
    id: 2,
    title: "Units",
  },
  {
    id: 3,
    title: "After Monash",
  },
  {
    id: 4,
    title: "Category 1",
  },
  {
    id: 5,
    title: "Category 2",
  },
  {
    id: 6,
    title: "Category 3",
  },
  {
    id: 7,
    title: "Category 4",
  },
];

const DiscussionTab = () => {
  const renderDiscussions = () => {
    return fakeDiscussions.map(({ id, title }) => {
      return (
        <Discussion key={id}>
          <GoCommentDiscussion
            style={{ color: Theme.colors.main, marginRight: "5px" }}
          />
          <p>{title}</p>
        </Discussion>
      );
    });
  };

  return (
    <div>
      <DiscussionWrapper>
        <NewDiscussionButton>Start a New Topic</NewDiscussionButton>
        <Discussion>
          <GoCommentDiscussion
            style={{ color: Theme.colors.main, marginRight: "5px" }}
          />
          <p>All Discussions</p>
        </Discussion>
        {renderDiscussions()}
      </DiscussionWrapper>
    </div>
  );
};

const DiscussionWrapper = styled.div`
  & > * {
    margin-bottom: 1rem;
  }
`;

const Discussion = styled.div`
  display: flex;
  color: ${({ theme: { colors } }) => colors.disabled};
  transition: 0.2s;
  cursor: pointer;
  font-family: "Helvetica";
  font-weight: bold;
  &:hover {
    color: ${({ theme: { colors } }) => colors.main};
  }
`;

const NewDiscussionButton = muiStyled(Button)({
  background: Theme.colors.main,
  color: "white",
  fontSize: "16px",
  textTransform: "none",
  padding: "0.6rem 1.2rem",
  marginBottom: "2rem",
  "&:hover": {
    backgroundColor: `${Theme.colors.main_dark}`,
  },
});

export default DiscussionTab;
