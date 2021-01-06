import styled from "styled-components";

export const PageWrapper = styled.div`
  margin: auto;
  text-align: center;
  padding: 4rem 2rem;
  max-width: 1200px;
  & > * {
    margin: 0 0 2rem;
  }
  // Gives room for the dropdown search
  @media (max-width: 768px) {
    padding: 1.5rem 2rem 4rem;
  }
`;
