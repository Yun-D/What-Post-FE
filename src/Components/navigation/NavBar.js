import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../navigation/NavBar.css';

import HomeIcon from "@material-ui/icons/Home";
import MenuIcon from "@material-ui/icons/Menu";
import PostIcon from "@material-ui/icons/PostAdd";
import BookIcon from "@material-ui/icons/Book";
import { Grid } from '@material-ui/core';

function NavBar(props) {
    const [sidebar, setSidebar] = useState(false);
    const showSidebar = () => setSidebar(!sidebar);

    const menuItems = [
        {
            path: "/",
            name: "메인",
            icon: <HomeIcon />
        }, {
            path: "/my_post",
            name: "나의 포스트",
            icon: <PostIcon />
        }, {
            path: "/search_book",
            name: "책 검색",
            icon: <BookIcon />
        }
    ];

    return (
        <>
        <nav className='navBar'>
            <MenuIcon onClick={showSidebar} className='sidebarBtn' />
            <Link to ="/" className='temp-logo'>
                What-Post!
            </Link>

            <ul className= {sidebar ? 'nav-menu active' : 'nav-menu'} >
                {menuItems.map( (item, index) => {
                    return (
                        <li key={index} className='nav-items'>
                            <Link to = {item.path} className='nav-item' onClick={showSidebar}>
                                <Grid container direction='row' alignItems='center'>
                                    <Grid item>
                                        {item.icon}
                                    </Grid>
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