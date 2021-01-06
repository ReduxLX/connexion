import React from "react";
import styled from "styled-components";
import { GoCommentDiscussion } from "react-icons/go";
import { styled as muiStyled } from "@material-ui/styles";
import Theme from "../../Theme";
import Button from "@material-ui/core/Button";

const fakeDiscussions = [
  {
    id: 1,
    title: "General",
  },
  {
    id: 2,
    title: "Newcomers Ahoy",
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
    title: "Super Long Category with very important stuff",
  },
];

const DiscussionSection = () => {
  const renderDiscussions = () => {
    return fakeDiscussions.map(({ id, title }) => {
      return (
        <Discussion key={id}>
          <div>
            <DiscussionLogo />
          </div>
          <strong>{title}</strong>
        </Discussion>
      );
    });
  };

  return (
    <SectionWrapper>
      <div style={{ textAlign: "left" }}>
        <NewDiscussionButton>Start a New Topic</NewDiscussionButton>
      </div>
      <Discussion>
        <div>
          <DiscussionLogo />
        </div>
        <strong>All Categories</strong>
      </Discussion>
      <br />
      {renderDiscussions()}
    </SectionWrapper>
  );
};

const SectionWrapper = styled.div`
  min-width: 150px;
  flex: 2;
  & > * {
    margin-bottom: 1rem;
  }
  @media (max-width: 768px) {
    display: none;
  }
`;

const Discussion = styled.div`
  display: flex;
  width: 90%;
  color: ${({ theme: { colors } }) => colors.disabled};
  transition: 0.2s;
  cursor: pointer;
  &:hover {
    color: ${({ theme: { colors } }) => colors.main};
  }
  strong {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-family: "NunitoBold";
    font-size: 14px;
  }
`;

const DiscussionLogo = styled(GoCommentDiscussion)`
  &:hover {
    color: ${({ theme: { colors } }) => colors.main};
  }
  margin-right: 10px;
`;

const NewDiscussionButton = muiStyled(Button)({
  background: Theme.colors.main,
  color: "white",
  fontSize: "14px",
  textTransform: "none",
  padding: "0.6rem 0.8rem",
  marginBottom: "2rem",
  "&:hover": {
    backgroundColor: `${Theme.colors.main_dark}`,
  },
});

export default DiscussionSection;
