import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { NavLink as Link } from "react-router-dom";
import { styled as muiStyled } from "@material-ui/styles";
import Fab from "@material-ui/core/Fab";
import {
  AiOutlineHome,
  AiOutlineInfoCircle,
  AiOutlineTrophy,
  AiOutlinePlus,
} from "react-icons/ai";
import { IoChatboxOutline } from "react-icons/io5";
import Theme from "../../Theme";
import { isMobile, showSnackbar } from "../../utils";
import { useAuth } from "../../AuthContext";

const bottomLinks = [
  { to: "/", label: "Home", icon: <AiOutlineHome /> },
  { to: "/categories", label: "Categories", icon: <IoChatboxOutline /> },
  { to: "/leaderboard", label: "Leaderboard", icon: <AiOutlineTrophy /> },
  { to: "/about", label: "About", icon: <AiOutlineInfoCircle /> },
];

const BottomNavbar = () => {
  const muiModalOpen = useSelector((state) => state.App.muiModalOpen);
  const history = useHistory();
  const { currentUser } = useAuth();

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
    <BottomNavbarWrapper muiModalOpen={muiModalOpen && !isMobile()}>
      <AddPostButton
        size="small"
        onClick={() => {
          if (currentUser) history.push("/createtopic");
          else
            showSnackbar(
              "error",
              "You need to be signed in to start a new topic"
            );
        }}
      >
        <AiOutlinePlus
          style={{ color: "white", width: "20px", height: "20px" }}
        />
      </AddPostButton>
      <BottomNavList>{renderBottomLinks()}</BottomNavList>
    </BottomNavbarWrapper>
  );
};

const NavLink = styled(Link)`
  color: ${({ theme: { colors } }) => colors.main};
  transition: 0.2s;
  &:hover {
    color: ${({ theme: { colors } }) => colors.main_dark};
  }
`;

// ------------ Bottom Navbar Styles ------------ //
// src: https://stackoverflow.com/questions/40515142/how-to-make-a-sticky-footer-in-react

const BottomNavbarWrapper = styled.div`
  display: none;
  justify-content: center;
  align-items: center;
  background-color: white;
  position: fixed;
  left: 0;
  bottom: 0;
  height: 50px;
  width: 100%;
  z-index: 999;
  font-size: 14px;
  padding-right: ${({ muiModalOpen }) => (muiModalOpen ? "17px" : "0px")};
  @media (max-width: 768px) {
    display: flex;
  }
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
  left: `calc(50vw - 40px)`, // offset by Fab width
  transform: "translate(50%, -50%)",
  background: Theme.colors.main,
  color: "white",
  "&:hover": {
    backgroundColor: `${Theme.colors.main_dark}`,
  },
});

export default BottomNavbar;
