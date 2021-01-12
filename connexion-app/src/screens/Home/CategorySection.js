import React from "react";
import styled from "styled-components";
import { GoCommentDiscussion } from "react-icons/go";
import { styled as muiStyled } from "@material-ui/styles";
import Theme from "../../Theme";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";

const placeholderCategories = [
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

const CategorySection = () => {
  let history = useHistory();

  const renderDiscussions = () => {
    return placeholderCategories.map(({ id, title }) => {
      return (
        <Category key={id}>
          <div>
            <CategoryLogo />
          </div>
          <strong>{title}</strong>
        </Category>
      );
    });
  };

  return (
    <SectionWrapper>
      <div style={{ textAlign: "left" }}>
        <NewCategoryButton
          className="CreateTopicButton"
          onClick={() => {
            history.push("/createtopic");
          }}
        >
          <NewCategoryButtonText>Start a New Topic</NewCategoryButtonText>
        </NewCategoryButton>
      </div>
      <Category
        onClick={() => {
          history.push("/categories");
        }}
      >
        <div>
          <CategoryLogo />
        </div>
        <strong>All Categories</strong>
      </Category>
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

const Category = styled.div`
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

const CategoryLogo = styled(GoCommentDiscussion)`
  &:hover {
    color: ${({ theme: { colors } }) => colors.main};
  }
  margin-right: 10px;
`;

const NewCategoryButton = muiStyled(Button)({
  background: Theme.colors.main,
  color: "white",
  textTransform: "none",
  padding: "0.6rem 0.8rem",
  marginBottom: "2rem",
  fontSize: "2  px",
  "&:hover": {
    backgroundColor: `${Theme.colors.main_dark}`,
  },
});

const NewCategoryButtonText = styled.p`
  font-size: 14px;
  @media (max-width: 970px) {
    font-size: 12px;
  }
`;

export default CategorySection;
