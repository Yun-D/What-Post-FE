import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../navigation/NavBar.css';

import HomeIcon from "@material-ui/icons/Home";
import MenuIcon from "@material-ui/icons/Menu";
import PostIcon from "@material-ui/icons/PostAdd";
import BookIcon from "@material-ui/icons/Book";

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
            <Link to ="/" className='nav-logo'>
                <MenuIcon onClick={showSidebar} />
                <span>What-Post!</span>
            </Link>            
                
            <ul className= {sidebar ? 'nav-menu active' : 'nav-menu'} >
                {menuItems.map( (item, index) => {
                    return (
                        <li key={index} className='nav-items'>
                            <Link to = {item.path} className='nav-item' onClick={showSidebar}>
                                {item.icon}
                                <span>{item.name}</span>
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