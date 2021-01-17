import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

const Chip = (props) => {
  const { category = "General", variant = "Category" } = props;
  const history = useHistory();

  const chipColor = () => {
    if (category === "Future Monashians") return "#FFC700";
    else if (category === "Freshmen") return "#14D3A6";
    else if (category === "Seniors") return "#3EC1D3";
    else if (category === "After Monash") return "#AA96DA";
    else return "#F85F73";
  };

  const redirectCategory = () => {
    if (variant === "Category") history.push(`/categories/${category}`);
  };

  return (
    <ChipWrapper
      chipColor={chipColor()}
      variant={variant}
      onClick={redirectCategory}
    >
      {category}
    </ChipWrapper>
  );
};

const ChipWrapper = styled.div`
  width: fit-content;
  opacity: 0.5;
  padding: 2px 18px;
  color: ${({ chipColor, variant }) =>
    variant === "Category" ? chipColor : "white"};
  border: ${({ chipColor, variant, theme: { colors } }) =>
    variant === "Category"
      ? `1px solid ${chipColor}`
      : `1px solid ${colors.disabled}`};
  border-radius: ${({ variant }) => (variant === "Category" ? "20px" : "5px")};
  background-color: ${({ variant, theme: { colors } }) =>
    variant === "Category" ? null : colors.disabled};
  transition: 0.2s;
  font-size: 13px;
  font-family: "NunitoSemiBold";
  &:hover {
    opacity: 0.9;

    cursor: pointer;
  }
  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

export default React.memo(Chip);
