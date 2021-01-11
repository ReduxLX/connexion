import React, { useState, useEffect } from "react";
import styled from "styled-components";

const ChooseCategory = (props) => {
  const {
    name = "",
    description = "",
    onSelect = () => {},
    disabled = false,
  } = props;
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    onSelect(name, isSelected ? "add" : "remove");
  }, [isSelected]);

  return (
    <CategoryWrapper
      selected={isSelected}
      onClick={() => {
        if (isSelected || disabled === false) {
          setIsSelected(!isSelected);
        }
      }}
    >
      <CategoryName>{name}</CategoryName>
      <p>{description}</p>
    </CategoryWrapper>
  );
};

const CategoryWrapper = styled.div`
  cursor: pointer;
  border: solid;
  border-color: ${({ selected, theme: { colors } }) =>
    selected ? colors.main : colors.disabled_light};
  border-width: 1px;
  border-radius: 2px;
  margin: 0 0 1rem;
  padding: 1rem;
  color: ${({ selected, theme: { colors } }) =>
    selected ? colors.main : colors.disabled};
`;

const CategoryName = styled.p`
  font-size: 17px;
  margin-bottom: 0.4rem;
`;

export default ChooseCategory;
