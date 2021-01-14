import React from "react";
import styled from "styled-components";
import { PageWrapper } from "../SharedStyles";
import CategorySection from "../Home/CategorySection";
import Categories from "../../Categories";
import ProfileImg1 from "../../res/images/avatar1.jpg";
import Divider from "../../components/Divider";

import Avatar from "@material-ui/core/Avatar";
import AvatarGroup from "@material-ui/lab/AvatarGroup";

const AllCategories = () => {
  const CategoriesList = () => {
    return Categories.map(({ name, description, image, color }) => {
      return (
        <CategoryWrapper key={name}>
          <CategoryColor color={color}></CategoryColor>
          <CategoryImage src={image} alt={name} />
          <CategoryInfo>
            <CategoryName>{name}</CategoryName>
            <CategoryDescription>{description}</CategoryDescription>
          </CategoryInfo>
          <VerticalDivider />
          <CategoryDetails>
            <CategoryDetailsTop>
              <div>
                <CategoryDetailsTitle>Topics</CategoryDetailsTitle>
                <CategoryDetailsTopics>47</CategoryDetailsTopics>
              </div>
              <div className="Group">
                <CategoryDetailsTitle>Latest Activity</CategoryDetailsTitle>
                <AvatarGroup className="AvatarGroup" max={4}>
                  <Avatar alt="User1" src={ProfileImg1} />
                  <Avatar alt="User2" src={ProfileImg1} />
                  <Avatar alt="User3" src={ProfileImg1} />
                  <Avatar alt="User4" src={ProfileImg1} />
                  <Avatar alt="User5" src={ProfileImg1} />
                </AvatarGroup>
              </div>
            </CategoryDetailsTop>
            <Divider width="100%" height="1px" margin="0.5rem 0" />
            <CategoryDetailsBottom>
              <CategoryDetailsTitle>LastTopic</CategoryDetailsTitle>
              <div style={{ marginTop: "0.2rem" }}>
                <Avatar className="Avatar" alt="LastTopic" src={ProfileImg1} />
                <CategoryDetailsLastTopic>
                  Placeholder...
                </CategoryDetailsLastTopic>
              </div>
            </CategoryDetailsBottom>
          </CategoryDetails>
        </CategoryWrapper>
      );
    });
  };

  return (
    <PageWrapper>
      <CategoriesWrapper>
        <CategorySection />
        <CategoriesSection>{CategoriesList()}</CategoriesSection>
      </CategoriesWrapper>
    </PageWrapper>
  );
};

const CategoriesWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: -1rem;
`;

const CategoriesSection = styled.div`
  flex: 9;
`;

const CategoryWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 10vw;
  align-items: center;
  margin-right: 2rem;
  margin-bottom: 1.5rem;
  padding: 0.5rem 0.2rem;
  &:hover {
    cursor: pointer;
  }
  box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.08);
  @media (min-width: 1500px) {
    height: 10vw;
  }
  @media (min-width: 1700px) {
    height: 9vw;
  }
  @media (max-width: 1300px) {
    height: 12vw;
  }
  @media (max-width: 1100px) {
    height: 13vw;
  }
  @media (max-width: 900px) {
    height: 15vw;
  }
  @media (max-width: 600px) {
    height: 20vw;
  }
  @media (max-width: 500px) {
    height: 24vw;
  }
  @media (max-width: 450px) {
    height: 28vw;
  }
  @media (max-width: 400px) {
    height: 35vw;
  }
  @media (max-width: 350px) {
    height: 50vw;
  }
  @media (max-width: 290px) {
    height: 70vw;
  }
`;

const CategoryColor = styled.div`
  background-color: ${({ color }) => color};
  height: 100%;
  width: 0.3rem;
  @media (min-width: 1500px) {
    width: 0.4rem;
  }
  @media (max-width: 468px) {
    width: 0.6rem;
  }
  @media (max-width: 350px) {
    width: 0.8rem;
  }
  margin: 0 0.6rem 0 0.2rem;
  border-radius: 0.3rem;
`;

const CategoryImage = styled.img`
  height: 100%;
  width: height;
  @media (min-width: 1500px) {
    height: 80%;
    width: height;
  }
  @media (max-width: 800px) {
    height: 80%;
    width: height;
  }
  @media (max-width: 350px) {
    height: 60%;
    width: height;
  }
  @media (max-width: 290px) {
    height: 40%;
    width: height;
  }
`;

const CategoryInfo = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 0.5rem 1rem 0.5rem;
  & > * {
    text-align: left;
  }
  justify-content: space-between;
`;

const CategoryName = styled.p`
  font-family: "Raleway";
  font-size: 28px;
  @media (min-width: 1500px) {
    font-size: 32px;
  }
  @media (max-width: 1000px) {
    font-size: 24px;
  }
  @media (max-width: 800px) {
    font-size: 22px;
  }
  @media (max-width: 400px) {
    font-size: 18px;
  }
  @media (max-width: 330px) {
    font-size: 14px;
  }
`;

const CategoryDescription = styled.p`
  font-family: "NunitoLight";
  font-size: 15px;
  @media (min-width: 1500px) {
    font-size: 17px;
  }
  @media (max-width: 1000px) {
    font-size: 12px;
  }
  @media (max-width: 768px) {
    font-family: "Nunito";
  }
`;

const VerticalDivider = styled.div`
  width: 3px;
  height: 100%;
  background-color: #efefef;
  @media (max-width: 768px) {
    display: none;
  }
`;

const CategoryDetails = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: 0 0.8rem;
  width: 30rem;
  height: 100%;
  @media (max-width: 768px) {
    display: none;
  }
`;

const CategoryDetailsTop = styled.div`
  display: flex;
  flex-direction: row;
  & > * {
    margin-right: 1rem;
  }
  .Group {
    text-align: left;
    > * > * {
      width: 30px;
      height: 30px;
      @media (max-width: 1000px) {
        width: 25px;
        height: 25px;
      }
    }
  }
`;

const CategoryDetailsTitle = styled.p`
  color: ${({ theme: { colors } }) => colors.disabled};
  @media (min-width: 1500px) {
    font-size: 17px;
  }
  @media (max-width: 1000px) {
    font-size: 14px;
  }
  @media (max-width: 900px) {
    font-size: 12px;
  }
  @media (max-width: 620px) {
    font-size: 10px;
  }
`;

const CategoryDetailsTopics = styled.p`
  font-family: "Raleway";
  font-size: 24px;
  @media (max-width: 1000px) {
    font-size: 20px;
  }
`;

const CategoryDetailsBottom = styled.div`
  text-align: left;
  & > * {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .Avatar {
    width: 25px;
    height: 25px;
    @media (min-width: 1500px) {
      width: 30px;
      height: 30px;
    }
    @media (max-width: 1000px) {
      width: 20px;
      height: 20px;
    }
  }
`;

const CategoryDetailsLastTopic = styled.p`
  margin-left: 0.5rem;
  @media (max-width: 1000px) {
    font-size: 14px;
  }
  @media (max-width: 900px) {
    font-size: 12px;
  }
`;

export default AllCategories;
