import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../navigation/NavBar.css";

import MenuIcon from "@material-ui/icons/Menu";
import logo from "../../Assets/logo.png";
import styled from "styled-components";
import theme from "Styles/theme";

import { onLogout } from "Utils/auth";

function NavBar() {
  const [sidebar, setSidebar] = useState(false);
  const resetSidebar = () => setSidebar(false);
  const showSidebar = () => setSidebar(!sidebar);

  const [token, setToken] = useState();

  useEffect(() => {
    setToken(localStorage.getItem("login-token"));
  }, []);

  const menuItems = [
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
    {
      path: "/my_post",
      name: "나의 포스트",
    },
  ];
  const menuItems_noAuth = [
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

        {token ? (
          <ul className={sidebar ? "nav-menu active" : "nav-menu"}>
            <li className="nav-items" onClick={resetSidebar}>
              <Link to={"/"} className="nav-item" onClick={onLogout}>
                <span>{"로그아웃"}</span>
              </Link>
            </li>

            {menuItems.map((item, index) => {
              return (
                <li key={index} className="nav-items" onClick={resetSidebar}>
                  <Link
                    to={item.path}
                    className="nav-item"
                    onClick={resetSidebar}
                  >
                    <span>{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        ) : (
          <ul className={sidebar ? "nav-menu active" : "nav-menu"}>
            <li className="nav-items" onClick={resetSidebar}>
              <Link to={"/login"} className="nav-item">
                <span>{"로그인"}</span>
              </Link>
            </li>

            {menuItems_noAuth.map((item, index) => {
              return (
                <li key={index} className="nav-items" onClick={resetSidebar}>
                  <Link
                    to={item.path}
                    className="nav-item"
                    onClick={resetSidebar}
                  >
                    <span>{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
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
  z-index: 1;
`;

const ImageLogo = styled.img`
  position: absolute;
  top: 35%;
  left: 70px;
`;

export default NavBar;
