import React from "react";
import styled from "styled-components";
import TopNavbar from "./TopNavbar";
import BottomNavbar from "./BottomNavbar";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const path = useLocation().pathname;
  const hideNavbar = path === "/login" || path === "/signup";

  return (
    <NavWrapper hide={hideNavbar}>
      <TopNavbar />
      <BottomNavbar />
    </NavWrapper>
  );
};

const NavWrapper = styled.div`
  display: ${({ hide }) => (hide ? "none" : "flex")};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: auto;
  padding: 1rem;
  max-width: 1200px;
`;

export default Navbar;
