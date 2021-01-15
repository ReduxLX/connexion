import React from "react";
import styled from "styled-components";
import CategoryCard from "./CategoryCard";

import { PageWrapper } from "../SharedStyles";
import CategorySection from "../Home/CategorySection";
import Categories from "../../Categories";

const AllCategories = () => {
  const CategoriesList = () => {
    return Categories.map(({ name, description, image, color }) => {
      return (
        <CategoryCard
          key={name}
          name={name}
          description={description}
          image={image}
          color={color}
        />
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

export default AllCategories;
