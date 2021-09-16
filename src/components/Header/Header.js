import HeaderWrapper from "./elements/HeaderWrapper";
import DropDownWindow from "./elements/DropDownWindow";
import Blank from "./elements/Blank";

import {IoIosArrowDown} from 'react-icons/io';
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Header() {
    const [showNavBar, setShowNavBar] = useState(false);

    return (
        <>
            <HeaderWrapper showNavBar={showNavBar}>
                <Link to="/timeline">linkr</Link>
                <div onClick={() => showNavBar ? setShowNavBar(false) : setShowNavBar(true)}>
                    <IoIosArrowDown />
                    <img src="https://loucosporgeek.com.br/wp-content/uploads/2020/09/edward-elric-1-1.jpg" alt="" />
                </div>
            </HeaderWrapper>
            <DropDownWindow showNavBar={showNavBar}>
                <Link to="/my-posts">My posts</Link>
                <Link to="/my-likes">My likes</Link>
                <Link to="/">Logout</Link>
            </DropDownWindow>
            {showNavBar ? <Blank onClick={() => setShowNavBar(false)}/> : ""}
        </>
    );
}