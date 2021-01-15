import React from "react";
import styled from "styled-components";

const Divider = (props) => {
  const { width = "100px", height = "1px", margin = 0 } = props;
  return <DividerWrapper width={width} height={height} margin={margin} />;
};

const DividerWrapper = styled.div`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  margin: ${({ margin }) => margin};
  background-color: #e5e5e5;
`;

export default Divider;
