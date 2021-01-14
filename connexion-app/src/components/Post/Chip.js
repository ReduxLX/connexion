import React from "react";
import styled from "styled-components";

const Chip = (props) => {
  const { category = "General" } = props;

  const chipColor = () => {
    if (category === "Future Monashians") return "#FFC700";
    else if (category === "Freshmen") return "#14D3A6";
    else if (category === "Seniors") return "#3EC1D3";
    else if (category === "After Monash") return "#AA96DA";
    else return "#F85F73";
  };

  return <ChipWrapper chipColor={chipColor()}>{category}</ChipWrapper>;
};

const ChipWrapper = styled.div`
  width: fit-content;
  opacity: 0.5;
  padding: 2px 18px;
  color: ${(props) => props.chipColor};
  border: ${(props) => `1px solid ${props.chipColor}`};
  border-radius: 20px;
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
