import React from "react";
import styled from "styled-components";

const Chip = (props) => {
  console.log("Render Chip");
  const { text = "General", color = "#F85F73" } = props;
  return <ChipWrapper chipColor={color}>{text}</ChipWrapper>;
};

const ChipWrapper = styled.div`
  width: fit-content;
  padding: 0 20px;
  color: ${(props) => props.chipColor};
  border: ${(props) => `1px solid ${props.chipColor}`};
  border-radius: 20px;
  transition: 0.2s;
  &:hover {
    background-color: ${(props) => props.chipColor};
    color: white;
    cursor: pointer;
  }
`;

export default React.memo(Chip);
