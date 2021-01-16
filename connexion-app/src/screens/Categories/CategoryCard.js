import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { useHistory } from "react-router-dom";
import { useAuth } from "../../AuthContext";
import ProfileImg1 from "../../res/images/avatar1.jpg";
import Divider from "../../components/Divider";
import { truncateText } from "../../utils";

import Avatar from "@material-ui/core/Avatar";
import AvatarGroup from "@material-ui/lab/AvatarGroup";

const CategoryCard = (props) => {
  const { name, description, image, color, short_description } = props;
  const history = useHistory();
  const { fetchCategoryPosts } = useAuth();
  const [categoryPosts, setCategoryPosts] = useState([]);

  useEffect(async () => {
    const fetchedPosts = await fetchCategoryPosts(name);
    if (Array.isArray(fetchedPosts)) {
      setCategoryPosts(fetchedPosts);
    }
  }, []);

  const getLastPosts = () => {
    if (categoryPosts.length >= 5) {
      return categoryPosts.slice(0, 5);
    } else {
      return categoryPosts;
    }
  };

  const renderLatestPost = () => {
    if (categoryPosts.length > 0) {
      const { photoURL, title } = getLastPosts()[0] || {};
      return (
        <>
          <Avatar className="Avatar" alt="LastTopic" src={photoURL} />
          <CategoryDetailsLastTopic>
            {truncateText(title, 18)}
          </CategoryDetailsLastTopic>
        </>
      );
    } else {
      return (
        <>
          <Avatar className="Avatar" alt="LastTopic" src={ProfileImg1} />
          <CategoryDetailsLastTopic>Loading...</CategoryDetailsLastTopic>
        </>
      );
    }
  };

  const renderLatestActivity = () => {
    if (categoryPosts.length > 0) {
      return getLastPosts().map((post, index) => {
        return <Avatar key={index} alt={`User${index}`} src={post.photoURL} />;
      });
    } else {
      return [...Array(5)].map((i, index) => (
        <Avatar key={index} alt="User1" />
      ));
    }
  };

  return (
    <CategorySectionWrapper>
      <CategoryWrapper
        key={name}
        onClick={() => {
          history.push(`/categories/${name}`);
        }}
      >
        <CategoryColor color={color}></CategoryColor>
        <CategoryImage src={image} alt={name} />
        {/* <div style={{ display: "flex"}}> */}
        <CategoryInfo>
          <CategoryName>{name}</CategoryName>
          <CategoryDescription className="FullDescription">
            {description}
          </CategoryDescription>
          <CategoryDescription className="ShortDescription">
            {short_description}
          </CategoryDescription>
        </CategoryInfo>
        {/* </div> */}
        <VerticalDivider />
        <CategoryDetails>
          <CategoryDetailsTop>
            <div>
              <CategoryDetailsTitle>Topics</CategoryDetailsTitle>
              <CategoryDetailsTopics>
                {categoryPosts.length}
              </CategoryDetailsTopics>
            </div>
            <div className="Group">
              <CategoryDetailsTitle>Latest Activity</CategoryDetailsTitle>
              <AvatarGroup className="AvatarGroup" max={4}>
                {renderLatestActivity()}
              </AvatarGroup>
            </div>
          </CategoryDetailsTop>
          {/* <Divider width="2rem" height="2px" margin="0.5rem 0" /> */}
          <Divider width="100%" height="1px" margin="0.5rem 0" />
          <CategoryDetailsBottom>
            <CategoryDetailsTitle>LastTopic</CategoryDetailsTitle>
            <div style={{ marginTop: "0.2rem" }}>{renderLatestPost()}</div>
          </CategoryDetailsBottom>
        </CategoryDetails>
      </CategoryWrapper>
    </CategorySectionWrapper>
  );
};

const CategorySectionWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const CategoryWrapper = styled.div`
  display: flex;
  width: 70vw;
  /* min-width: 51rem; */
  max-width: 52rem;
  margin: 0 2rem 1.5rem 2.2rem;
  @media (min-width: 1400px) {
    max-width: 57rem;
  }
  @media (max-width: 1000px) {
    min-width: 40rem;
  }

  @media (max-width: 768px) {
    width: 80vw;
    min-width: 10rem;
    margin: 0 0 1.5rem 0;
  }
  align-items: center;
  padding: 0.5rem 0.2rem;
  &:hover {
    cursor: pointer;
  }
  box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.08);
`;

const CategoryColor = styled.div`
  background-color: ${({ color }) => color};
  height: 100%;
  width: 0.3rem;
  margin: 0 0.6rem 0 0.2rem;
  border-radius: 0.15rem;
`;

const CategoryImage = styled.img`
  width: 8vw;
  height: 8vw;
  max-width: 10rem;
  max-height: 10rem;
  @media (max-width: 768px) {
    min-width: 6rem;
    min-height: 6rem;
  }
  @media (max-width: 400px) {
    min-width: 5rem;
    min-height: 5rem;
  }
`;

const CategoryInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  justify-content: space-around;
  padding: 0.5rem 1rem 0.5rem;
  text-align: left;
  .ShortDescription {
    display: none;
  }
  @media (max-width: 1100px) {
    .FullDescription {
      display: none;
    }
    .ShortDescription {
      display: flex;
    }
  }
  @media (max-width: 768px) {
    .FullDescription {
      display: flex;
    }
    .ShortDescription {
      display: none;
    }
  }
  @media (max-width: 500px) {
    .FullDescription {
      display: none;
    }
    .ShortDescription {
      display: flex;
    }
  }
`;

const CategoryName = styled.p`
  font-family: "Raleway";
  font-size: 28px;
  @media (max-width: 768px) {
    font-size: 20px;
  }
  @media (max-width: 410px) {
    font-size: 17px;
  }
  @media (max-width: 360px) {
    font-size: 15px;
  }
`;

const CategoryDescription = styled.p`
  font-family: "Nunito";
  font-size: 16px;
  margin-top: 1rem;
  @media (max-width: 1500px) {
    font-size: 14px;
  }
  @media (max-width: 768px) {
    font-size: 12px;
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
    font-size: 16px;
  }
  @media (max-width: 1000px) {
    font-size: 14px;
  }
  @media (max-width: 900px) {
    font-size: 12px;
  }
`;

const CategoryDetailsTopics = styled.p`
  font-family: "Raleway";
  font-size: 22px;
  @media (max-width: 1000px) {
    font-size: 18px;
  }
`;

const CategoryDetailsBottom = styled.div`
  text-align: left;
  width: 200px;
  & > * {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .Avatar {
    border: solid;
    border-width: 4px;
    border-color: rgba(0, 0, 0, 0.08);
    width: 2vw;
    height: 2vw;
    max-width: 3.5vw;
    max-height: 3.5vw;
  }
`;

const CategoryDetailsLastTopic = styled.p`
  margin-left: 0.5rem;
  white-space: nowrap;
  font-size: 15px;
  @media (min-width: 1500px) {
    font-size: 17px;
  }
  @media (max-width: 1000px) {
    font-size: 13px;
  }
  @media (max-width: 900px) {
    font-size: 12px;
  }
`;

export default CategoryCard;
