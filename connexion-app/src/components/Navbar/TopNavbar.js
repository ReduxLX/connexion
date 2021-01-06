import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { NavLink as Link, useLocation } from "react-router-dom";
import { styled as muiStyled } from "@material-ui/styles";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import { BiSearch } from "react-icons/bi";
import Theme from "../../Theme";

const TopNavbar = () => {
  const [visible, setVisible] = useState(false);
  const path = useLocation().pathname;

  const displaySearchbar = path === "/" || path === "/discussion";

  const renderSearchBar = (id = "searchbar") => {
    return (
      <SearchFieldWrapper>
        <SearchField
          id={id}
          size="small"
          variant="outlined"
          placeholder="Search Forum"
          fullWidth={true}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <BiSearch style={{ color: "#0F4C75" }} />
              </InputAdornment>
            ),
          }}
        />
      </SearchFieldWrapper>
    );
  };

  return (
    <TopNavbarWrapper>
      <TopNavbarContent>
        <Link to="/">
          <LogoWrapper>CONNEXION</LogoWrapper>
        </Link>
        <NavMiddle>
          <NavLeft>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/about">About Us</NavLink>
          </NavLeft>
          {renderSearchBar("searchBarTop")}
        </NavMiddle>
        <NavRight>
          <SearchButton
            visible={displaySearchbar}
            onClick={() => setVisible(!visible)}
          >
            <BiSearch
              style={{ color: "#0F4C75", width: "25px", height: "25px" }}
            />
          </SearchButton>
          <NavLink to="/signup">Sign Up</NavLink>
          <NavLink to="/signup">Log in</NavLink>
        </NavRight>
      </TopNavbarContent>
      <SearchNavbar visible={visible && displaySearchbar}>
        {renderSearchBar("searchBarBottom")}
      </SearchNavbar>
    </TopNavbarWrapper>
  );
};

const NavLink = styled(Link)`
  color: ${({ theme: { colors } }) => colors.main};
  transition: 0.2s;
  &:hover {
    color: ${({ theme: { colors } }) => colors.main_dark};
  }
`;

// ------------ Top Navbar Styles ------------ //
const TopNavbarWrapper = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  z-index: 100;
  transition: top 0.6s;
  border-bottom: 2px solid #e5e5e5;
`;

const TopNavbarContent = styled.div`
  display: flex;
  width: 100%;
  background: white;
  justify-content: space-between;
  flex: 1;
  padding: 1rem;
  max-width: 1200px;
  z-index: 150;
  @media (max-width: 768px) {
    padding: 0.5rem;
  }
`;

const SearchNavbar = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  width: 100%;
  background: white;
  max-width: 1200px;
  top: ${({ visible }) => (visible ? `41px` : `-20px`)};
  transition: 0.3s;
  z-index: 125;
  padding: 0 1rem;
  @media (min-width: 768px) {
    display: none;
  }
`;

const NavMiddle = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-between;
  align-items: center;
  white-space: nowrap;
  & > * {
    margin-left: 1rem;
  }
  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLeft = styled.div`
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
  @media (max-width: 768px) {
    & > * {
      font-size: 14px;
    }
  }
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  font-family: "Raleway";
  font-weight: 800;
  font-size: 20px;
  color: ${({ theme: { colors } }) => colors.main};
  @media (min-width: 768px) {
    font-size: 30px;
  }
`;

const SearchButton = styled.button`
  width: 25px;
  height: 25px;
  display: ${({ visible }) => (visible ? "flex" : "none")};
  @media (min-width: 768px) {
    display: none;
  }
`;

const SearchFieldWrapper = styled.div`
  flex: 1;
  max-width: 400px;
  @media (min-width: 768px) {
    max-width: 250px;
  }
`;

const SearchField = muiStyled(TextField)({
  backgroundColor: Theme.colors.form,
});

export default TopNavbar;
