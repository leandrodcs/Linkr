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

    function relocate(whereTo) {
        setShowNavBar(false);
        if(!whereTo) {
            localStorage.clear();
            setUser({});
            history.push("/");
            return;
        }
        history.push(`/${whereTo}`);
    }

    return (
        <>
            <HeaderWrapper showNavBar={showNavBar}>
                <Link to="/timeline">linkr</Link>
                <div onClick={() => showNavBar ? setShowNavBar(false) : setShowNavBar(true)}>
                    <IoIosArrowDown />
                    <img src={!!user.token ? user.user.avatar : ""} alt="avatar" />
                </div>
            </HeaderWrapper>
            <DropDownWindow showNavBar={showNavBar}>
                <p onClick={() => relocate("my-posts")}>My posts</p>
                <p onClick={() => relocate("my-likes")}>My likes</p>
                <p onClick={() => relocate("")}>Logout</p>
            </DropDownWindow>
            {showNavBar ? <Blank onClick={() => setShowNavBar(false)}/> : ""}
        </>
    );
}

