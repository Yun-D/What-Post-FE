import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../navigation/NavBar.css";

import MenuIcon from "@material-ui/icons/Menu";
import logo from "../../Assets/logo.png";
import { Grid } from "@material-ui/core";

function NavBar(props) {
  const [sidebar, setSidebar] = useState(false);
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
      path: "/my_post",
      name: "나의 포스트",
    },
  ];

  return (
    <>
      <nav className="navBar">
        <MenuIcon onClick={showSidebar} className="sidebarBtn" />
        <Link to="/" className="temp-logo">
          <img src={logo} alt="logo" width="80px" height="auto" />
        </Link>

        <ul className={sidebar ? "nav-menu active" : "nav-menu"}>
          {menuItems.map((item, index) => {
            return (
              <li key={index} className="nav-items">
                <Link to={item.path} className="nav-item" onClick={showSidebar}>
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
      </nav>
    </>
  );
}

export default NavBar;
