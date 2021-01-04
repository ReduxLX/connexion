import React from "react";
import styled from "styled-components";
import TopNavbar from "./TopNavbar";
import BottomNavbar from "./BottomNavbar";

const Navbar = () => {
  return (
    <NavWrapper>
      <TopNavbar />
      <BottomNavbar />
    </NavWrapper>
  );
};

const NavWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: auto;
  padding: 0.5rem 1rem;
  max-width: 1200px;
`;

export default Navbar;
