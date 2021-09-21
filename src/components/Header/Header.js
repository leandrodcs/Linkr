import Blank from "./elements/Blank";
import DropDownWindow from "./elements/DropDownWindow";
import HeaderWrapper from "./elements/HeaderWrapper";
import DropDownMenu from "./elements/DropDownMenu";
import SearchBar from "./elements/SearchBar";

import UserContext from "../../contexts/UserContext";

import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from 'react-router';
import {IoIosArrowDown} from 'react-icons/io';

export default function Header() {
    const [showNavBar, setShowNavBar] = useState(false);
    const history = useHistory();
    const {login, setLogin} = useContext(UserContext);

    function relocate(whereTo) {
        setShowNavBar(false);
        if(!whereTo) {
            localStorage.clear();
            setLogin({});
            history.push("/");
            return;
        }
        history.push(`/${whereTo}`);
    }

    return (
        <>
            <HeaderWrapper >
                <Link to="/timeline">linkr</Link>
                <DropDownMenu onClick={() => showNavBar ? setShowNavBar(false) : setShowNavBar(true)} showNavBar={showNavBar}>
                    <IoIosArrowDown />
                    <img src={!!login.token ? login.user.avatar : ""} alt="avatar" />
                </DropDownMenu>
            </HeaderWrapper>
            <DropDownWindow showNavBar={showNavBar}>
                <p onClick={() => relocate("my-posts")}>My posts</p>
                <p onClick={() => relocate("my-likes")}>My likes</p>
                <p onClick={() => relocate("")}>Logout</p>
            </DropDownWindow>
            {showNavBar ? <Blank onClick={() => setShowNavBar(false)}/> : ""}
            <SearchBar />
        </>
    );
}



