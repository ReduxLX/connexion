import React from "react";
import styled from "styled-components";

const Chip = (props) => {
  const { category = "General" } = props;

  const chipColor = () => {
    if (category === "Future Monashians") return "#A8E6CF";
    else if (category === "Freshmen") return "#F9ED69";
    else if (category === "Seniors") return "#3EC1D3";
    else if (category === "After Monash") return "#AA96DA";
    else return "#F85F73";
  };

  return <ChipWrapper chipColor={chipColor()}>{category}</ChipWrapper>;
};

const ChipWrapper = styled.div`
  width: fit-content;
  padding: 0 10px;
  color: ${(props) => props.chipColor};
  border: ${(props) => `1px solid ${props.chipColor}`};
  border-radius: 20px;
  transition: 0.2s;
  &:hover {
    background-color: ${(props) => props.chipColor};
    color: white;
    cursor: pointer;
  }
  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

export default React.memo(Chip);
