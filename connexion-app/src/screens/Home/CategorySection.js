import React from "react";
import styled from "styled-components";
import { styled as muiStyled } from "@material-ui/styles";
import Theme from "../../Theme";
import Button from "@material-ui/core/Button";
import { useHistory, NavLink } from "react-router-dom";
import { useAuth } from "../../AuthContext";
import { showSnackbar } from "../../utils";
import { FaRegComments } from "react-icons/fa";
import Categories from "../../Categories";
import All_Categories_2 from "../../res/images/All_Categories_2.png";
import All_Categories_Activated_2 from "../../res/images/All_Categories_Activated_2.png";

const CategorySection = () => {
  let history = useHistory();
  const { currentUser } = useAuth();

  const renderDiscussions = () => {
    return Categories.map(({ name, icon, color }, index) => {
      return (
        <Category key={index}>
          <IndividualCategoryWrapper color={color}>
            <NavLink
              to={`/categories/${name}`}
              activeStyle={{
                fontWeight: "bold",
                color,
              }}
              style={{
                display: "flex",
                alignItems: "center",
                color: Theme.colors.disabled,
              }}
            >
              <img src={icon} alt={name + "icon"} />
              <p style={{ marginLeft: "15px" }}>{name}</p>
            </NavLink>
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
            <CategoryLogo className="Inactivated" src={All_Categories_2} />
            <CategoryLogo
              className="Activated"
              src={All_Categories_Activated_2}
            />
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
  position: sticky;
  display: flex;
  align-self: flex-start;
  left: 0;
  top: 6rem;
  flex-direction: column;
  align-items: center;
  margin-right: 1rem;
  min-width: 150px;
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
  & > * {
    .Inactivated {
      display: flex;
    }
    .Activated {
      display: none;
    }
  }
  &:hover {
    & > * {
      .Inactivated {
        display: none;
      }
      .Activated {
        display: flex;
      }
    }
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

const CategoryLogo = styled.img`
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
