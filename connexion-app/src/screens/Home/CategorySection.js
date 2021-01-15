import React from "react";
import styled from "styled-components";
import { styled as muiStyled } from "@material-ui/styles";
import Theme from "../../Theme";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../AuthContext";
import { showSnackbar } from "../../utils";
import { FaRegComments } from "react-icons/fa";
import Categories from "../../Categories";

const CategorySection = () => {
  let history = useHistory();
  const { currentUser } = useAuth();

  const renderDiscussions = () => {
    return Categories.map(({ name, icon, color }) => {
      const redirectCategory = () => {
        history.push(`/categories/${name}`);
      };
      return (
        <Category key={name} onClick={redirectCategory}>
          <IndividualCategoryWrapper color={color}>
            <img src={icon} alt={name + "icon"} />
            <p style={{ marginLeft: "15px" }}>{name}</p>
          </IndividualCategoryWrapper>
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
            if (currentUser) history.push("/createtopic");
            else
              showSnackbar(
                "error",
                "You need to be signed in to start a new topic"
              );
          }}
        >
          <NewCategoryButtonText>Start a New Topic</NewCategoryButtonText>
        </NewCategoryButton>
      </div>
      <Category
        style={{ marginBottom: "20px" }}
        onClick={() => {
          history.push("/categories");
        }}
      >
        <AllCategoriesWrapper>
          <div style={{ marginTop: "5px" }}>
            <CategoryLogo />
          </div>
          <p style={{ marginTop: "5px" }}>All Categories</p>
        </AllCategoriesWrapper>
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
  p {
    font-family: "RalewaySemiBold";
    font-size: 14px;
    @media (max-width: 850px) {
      font-size: 13px;
    }
  }

  img {
    width: 22px;
    height: 22px;
  }
`;

const AllCategoriesWrapper = styled.div`
  display: flex;
  flex-direction: row;
  max-width: 12vw;
  &:hover {
    color: ${({ theme: { colors } }) => colors.main};
  }
  p {
    font-family: "RalewayExtraBold";
    white-space: nowrap;
  }
`;

const IndividualCategoryWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.4rem;
  margin-left: 2px;
  max-width: 11.5vw;
  min-width: 140px;

  p {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &:hover {
    cursor: pointer;
    img {
      opacity: 0.8;
    }
    p {
      color: ${({ color }) => color};
    }
  }
`;

const CategoryLogo = styled(FaRegComments)`
  width: 20px;
  height: 20px;
  margin-top: -3px;
  margin-left: 3px;
  margin-right: 15px;
  &:hover {
    color: ${({ theme: { colors } }) => colors.main};
  }
`;

const NewCategoryButton = muiStyled(Button)({
  background: Theme.colors.main,
  color: "white",
  textTransform: "none",
  padding: "0.6rem 1.2rem",
  fontSize: "2px",
  "&:hover": {
    backgroundColor: `${Theme.colors.main_dark}`,
  },
});

const NewCategoryButtonText = styled.p`
  font-family: "NunitoLight";
  font-size: 15px;
  @media (max-width: 970px) {
    font-size: 14px;
  }
`;

export default CategorySection;
