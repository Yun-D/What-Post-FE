import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import HomeIcon from "@material-ui/icons/Home";
import MenuIcon from "@material-ui/icons/Menu";
import PostIcon from "@material-ui/icons/PostAdd";

function NavBar(props) {
    const [sidebar, setSidebar] = useState(false);
    const showSidebar = () => setSidebar(!sidebar);

    const menuItems = [
        {
            path: "/",
            name: "메인",
            //icon: <HomeIcon />
        }, {
            path: "/my_post",
            name: "나의 포스트",
            //icon: <PostIcon />
        }
    ];

    return (
        <>
            <div className='navBar'>
            {/* <Link to "#" className="menu-bar">

            </Link> */}
            </div>
            <nav className= {sidebar ? 'nav-menuActive' : 'nav-menu'}>
                <ul className='nav-menu-items' onClick={showSidebar}>
                    <li className='navbar-toggle'>
                        <Link to ="#" className='menu-bar'>
                            hello
                        </Link>
                    </li>

                    {menuItems.map( (item, index) => {
                        return (
                            <li key={index}>
                                <Link to = {item.path}>
                                    {/* {item.icon} */}
                                    <span> {item.name}</span>
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