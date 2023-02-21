import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../navigation/NavBar.css";

import MenuIcon from "@material-ui/icons/Menu";
import logo from "../../Assets/logo.png";
import { Grid } from "@material-ui/core";
import styled from "styled-components";
import theme from "Styles/theme";

function NavBar_noauth() {
  const [sidebar, setSidebar] = useState(false);
  const resetSidebar = () => setSidebar(false);
  const showSidebar = () => setSidebar(!sidebar);

  const menuItems = [
    {
      path: "/login",
      name: "로그인",
    },
    {
      path: "/",
      name: "메인",
    },
    {
      path: "/search_book",
      name: "책",
    },
    {
      path: "/search_movie",
      name: "영화",
    },
  ];

  return (
    <>
      <StyledNavBar>
        <MenuIcon onClick={showSidebar} className="sidebarBtn" />

        <Link to="/">
          <ImageLogo src={logo} alt="logo" width="80px" height="auto" />
        </Link>

        <ul className={sidebar ? "nav-menu active" : "nav-menu"}>
          {menuItems.map((item, index) => {
            return (
              <li key={index} className="nav-items">
                <Link
                  to={item.path}
                  className="nav-item"
                  onClick={resetSidebar}
                >
                  <Grid container direction="row" alignItems="center">
                    <Grid item>
                      <span>{item.name}</span>
                    </Grid>
                  </Grid>
                </Link>
              </li>
            );
          })}
        </ul>
      </StyledNavBar>
    </>
  );
}

const StyledNavBar = styled.nav`
  background: ${theme.colors.mainColor};
  height: 80px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  font-size: 1.1rem;

  position: fixed;
  top: 0;
  left: 0;
  right: 0;
`;

const ImageLogo = styled.img`
  position: absolute;
  top: 35%;
  left: 70px;
`;

export default NavBar_noauth;
