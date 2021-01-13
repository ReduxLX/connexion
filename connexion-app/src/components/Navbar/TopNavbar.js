import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { NavLink as Link, useLocation, useHistory } from "react-router-dom";
import {
  Menu,
  MenuItem,
  Avatar,
  TextField,
  InputAdornment,
} from "@material-ui/core";
import { styled as muiStyled } from "@material-ui/styles";
import ProfileImg1 from "../../res/images/avatar1.jpg";
import { BiSearch } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { IoLogOutOutline } from "react-icons/io5";
import Theme from "../../Theme";
import { useAuth } from "../../AuthContext";
import * as actApp from "../../store/App/ac-App";
import { isMobile } from "../../utils";

const TopNavbar = () => {
  const [visible, setVisible] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [height, setHeight] = useState(0);
  const ref = useRef(null);
  const clientHeight = ref.current ? ref.current.clientHeight : 0;

  const dispatch = useDispatch();
  const history = useHistory();
  const muiModalOpen = useSelector((state) => state.App.muiModalOpen);

  const path = useLocation().pathname;
  const { logout, currentUser } = useAuth();

  const displaySearchbar = path === "/" || path === "/categories";

  // Calculate searchbar height offset so it appears directly below the top navbar
  useEffect(() => {
    setHeight(ref.current.clientHeight);
  }, [clientHeight]);

  const handleClose = () => {
    setAnchorEl(null);
    dispatch(actApp.handleState("muiModalOpen", false));
  };

  const handleLogout = async () => {
    try {
      await logout();
      history.push("/");
      history.go(0);
    } catch (e) {
      console.log("Failed to logout ", e);
    }
  };

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
    <TopNavbarWrapper muiModalOpen={muiModalOpen && !isMobile()}>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onEnter={() => dispatch(actApp.handleState("muiModalOpen", true))}
        onClose={handleClose}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        keepMounted
        autoFocus={false}
      >
        <MenuItem
          onClick={() => {
            handleClose();
            history.push("/profile");
          }}
        >
          <CgProfile
            style={{
              color: "#0F4C75",
              width: "25px",
              height: "25px",
              marginRight: "5px",
            }}
          />
          Profile
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            handleLogout();
          }}
        >
          <IoLogOutOutline
            style={{
              color: "#0F4C75",
              width: "25px",
              height: "25px",
              marginRight: "5px",
            }}
          />
          Log out
        </MenuItem>
      </Menu>
      <TopNavbarContent ref={ref}>
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
          {currentUser ? (
            <Avatar
              alt="pic"
              src={ProfileImg1}
              style={{ width: "30px", height: "30px" }}
              onClick={(e) => setAnchorEl(e.currentTarget)}
            />
          ) : (
            <>
              <NavLink to="/signup">Sign Up</NavLink>
              <NavLink to="/login">Log in</NavLink>
            </>
          )}
        </NavRight>
      </TopNavbarContent>
      <SearchNavbar visible={visible && displaySearchbar} offset={height}>
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
  // Offsets material ui shift to prevent fixed navbar from shifting
  padding-right: ${({ muiModalOpen }) => (muiModalOpen ? "17px" : "0px")};
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
  display: none;
  position: absolute;
  justify-content: center;
  width: 100%;
  background: white;
  max-width: 1200px;
  top: ${({ visible, offset }) => (visible ? `${offset}px` : `-20px`)};
  transition: 0.3s;
  z-index: 125;
  padding: 0 1rem;
  @media (max-width: 768px) {
    display: flex;
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
  font-size: 30px;
  color: ${({ theme: { colors } }) => colors.main};
  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const SearchButton = styled.button`
  width: 25px;
  height: 25px;
  display: none;
  @media (max-width: 768px) {
    display: ${({ visible }) => (visible ? "flex" : "none")};
  }
`;

const SearchFieldWrapper = styled.div`
  flex: 1;
  max-width: 250px;
  @media (max-width: 768px) {
    max-width: 400px;
  }
`;

const SearchField = muiStyled(TextField)({
  backgroundColor: Theme.colors.form,
});

export default TopNavbar;
