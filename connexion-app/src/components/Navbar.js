import React from "react";
import styled from "styled-components";
import { NavLink as Link } from "react-router-dom";
import { BiSearch } from "react-icons/bi";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";

const Navbar = () => {
  return (
    <NavTop>
      <NavWrapper>
        <NavLeft>
          <li>
            <Link to="/">
              <LogoWrapper>CONNEXION</LogoWrapper>
            </Link>
          </li>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/about">About Us</NavLink>
          </li>
        </NavLeft>
        <NavRight>
          <SearchField
            id="outlined-required"
            size="small"
            variant="outlined"
            placeholder="Search Forum"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <BiSearch style={{ color: "#0F4C75" }} />
                </InputAdornment>
              ),
            }}
          />
          <NavButton>Sign Up</NavButton>
          <NavButton>Log In</NavButton>
        </NavRight>
      </NavWrapper>
    </NavTop>
  );
};

const SearchField = styled(TextField)`
  background-color: #edf0f7;
  font-family: "Helvetica";
  font-weight: 300;
`;
const NavTop = styled.div`
  width: 100vw;
  border-bottom: 2px solid #e1eaf7;
`;
const NavWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: auto;
  padding: 1rem 1rem 0.5rem;
  max-width: 1200px;
`;

const NavLeft = styled.ul`
  display: flex;
  align-items: center;
  white-space: nowrap;
  & > * {
    margin-left: 1rem;
  }
`;

const NavRight = styled.div`
  display: flex;
  align-items: center;
  white-space: nowrap;
  & > * {
    margin-left: 1rem;
  }
`;

const NavButton = styled.button`
  font-family: "Helvetica";
  font-weight: 300;
  color: ${({ theme: { colors } }) => colors.main};
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  font-family: "Raleway";
  font-weight: 700;
  font-size: 30px;
  color: ${({ theme: { colors } }) => colors.main};
`;

const NavLink = styled(Link)`
  color: ${({ theme: { colors } }) => colors.main};
  font-family: "Helvetica";
  font-weight: 300;
  transition: 0.3s;
  &:hover {
    color: ${({ theme: { colors } }) => colors.main_dark};
  }
`;

export default Navbar;
