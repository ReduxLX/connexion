import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import * as actHome from "../Home/ac-Home";
import { PageWrapper } from "../SharedStyles";
import CategorySection from "../Home/CategorySection";
import PostSection from "../Home/PostSection";

const CategoryPosts = () => {
  const { category } = useParams();
  const dispatch = useDispatch();

  // Scroll to top when this page mounts
  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(actHome.handleState("cachedCategory", category));
  }, [category]);

  return (
    <PageWrapper>
      <CategoryPostsWrapper>
        <CategorySection />
        <PostSection category={category} />
      </CategoryPostsWrapper>
    </PageWrapper>
  );
};

const CategoryPostsWrapper = styled.div`
  display: flex;
`;

export default CategoryPosts;
