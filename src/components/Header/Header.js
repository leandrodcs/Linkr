import Blank from "./elements/Blank";
import DropDownWindow from "./elements/DropDownWindow";
import HeaderWrapper from "./elements/HeaderWrapper";

import UserContext from "../../contexts/UserContext";

import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from 'react-router';
import {IoIosArrowDown} from 'react-icons/io';

export default function Header() {
    const [showNavBar, setShowNavBar] = useState(false);
    const history = useHistory();
    const {user, setUser} = useContext(UserContext);
    console.log(user);

    function relocateToMyPosts() {
        setShowNavBar(false);
        history.push("/my-posts");
    }
    function relocateToMyLikes() {
        setShowNavBar(false);
        history.push("/my-likes");
    }
    function relocateToLogin() {
        localStorage.clear();
        setUser({});
        setShowNavBar(false);
        history.push("/");
    }

    return (
        <>
            <HeaderWrapper showNavBar={showNavBar}>
                <Link to="/timeline">linkr</Link>
                <div onClick={() => showNavBar ? setShowNavBar(false) : setShowNavBar(true)}>
                    <IoIosArrowDown />
                    <img src={!!user.token ? user.user.avatar : ""} alt="" />
                </div>
            </HeaderWrapper>
            <DropDownWindow showNavBar={showNavBar}>
                <p onClick={relocateToMyPosts} to="/my-posts">My posts</p>
                <p onClick={relocateToMyLikes} to="/my-likes">My likes</p>
                <p onClick={relocateToLogin}>Logout</p>
            </DropDownWindow>
            {showNavBar ? <Blank onClick={() => setShowNavBar(false)}/> : ""}
        </>
    );
}


