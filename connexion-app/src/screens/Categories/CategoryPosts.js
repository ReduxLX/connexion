import React, { useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";

import { PageWrapper } from "../SharedStyles";
import CategorySection from "../Home/CategorySection";
import PostSection from "../Home/PostSection";

const CategoryPosts = () => {
  const { category } = useParams();

  // Scroll to top when this page mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
