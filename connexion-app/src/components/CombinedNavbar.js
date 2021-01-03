import React from "react";
import styled from "styled-components";
import { NavLink as Link } from "react-router-dom";
import { styled as muiStyled } from "@material-ui/styles";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Button from "@material-ui/core/Button";
import Fab from "@material-ui/core/Fab";
import {
  AiOutlineHome,
  AiOutlineInfoCircle,
  AiOutlineTrophy,
  AiOutlinePlus,
} from "react-icons/ai";
import { IoChatboxOutline } from "react-icons/io5";
import { BiSearch } from "react-icons/bi";
import Theme from "../Theme";

const bottomLinks = [
  { to: "/", label: "Home", icon: <AiOutlineHome /> },
  { to: "/discussion", label: "Discussion", icon: <IoChatboxOutline /> },
  { to: "/leaderboard", label: "Leaderboard", icon: <AiOutlineTrophy /> },
  { to: "/about", label: "About", icon: <AiOutlineInfoCircle /> },
];

const Navbar = () => {
  const renderTopNavbar = () => {
    return (
      <>
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
      </>
    );
  };

  const renderBottomNavbar = () => {
    return (
      <BottomDrawer>
        <AddPostButton size="small">
          <AiOutlinePlus
            style={{ color: "white", width: "20px", height: "20px" }}
          />
        </AddPostButton>
        <BottomNavList>{renderBottomLinks()}</BottomNavList>
      </BottomDrawer>
    );
  };

  const renderBottomLinks = () => {
    return bottomLinks.map(({ to, label, icon }) => (
      <li key={to}>
        <BottomNavLink to={to} exact activeStyle={{ color: Theme.colors.main }}>
          {icon} <p>{label}</p>
        </BottomNavLink>
      </li>
    ));
  };

  return (
    <NavWrapper>
      {renderBottomNavbar()}
      {/* {renderTopNavbar()} */}
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

const NavLink = styled(Link)`
  color: ${({ theme: { colors } }) => colors.main};
  transition: 0.2s;
  &:hover {
    color: ${({ theme: { colors } }) => colors.main_dark};
  }
`;

// --- Bottom Navbar Styles --- //
// src: https://stackoverflow.com/questions/40515142/how-to-make-a-sticky-footer-in-react

const BottomDrawer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  position: fixed;
  left: 0;
  bottom: 0;
  height: 50px;
  width: 100%;
  /* @media (min-width: 550px) {
    display: none;
  } */
`;

const BottomNavList = styled.ul`
  display: flex;
  flex: 1;
  justify-content: space-evenly;
  white-space: nowrap;
  & > * {
    margin-left: 1rem;
  }
`;

const BottomNavLink = styled(NavLink)`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: gray;
  p {
    font-size: 14px;
  }
`;

const AddPostButton = muiStyled(Fab)({
  position: "absolute",
  top: "0",
  left: `calc(50vw - 40px)`,
  transform: "translate(50%, -50%)",
  background: Theme.colors.main,
  color: "white",
  "&:hover": {
    backgroundColor: `${Theme.colors.main_dark}`,
  },
});

// --- Top Navbar Styles --- //

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

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  font-family: "Raleway";
  font-weight: 800;
  font-size: 30px;
  color: ${({ theme: { colors } }) => colors.main};
`;

const SearchField = muiStyled(TextField)({
  backgroundColor: Theme.colors.form,
  borderRadius: "5px",
});

const NavButton = styled.button`
  font-weight: 300;
  color: ${({ theme: { colors } }) => colors.main};
`;

export default Navbar;
