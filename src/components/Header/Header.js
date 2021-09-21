import Blank from "./elements/Blank";
import DropDownWindow from "./elements/DropDownWindow";
import HeaderWrapper from "./elements/HeaderWrapper";

import UserContext from "../../contexts/UserContext";

import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from 'react-router';
import {IoIosArrowDown} from 'react-icons/io';
import {GiMagnifyingGlass} from 'react-icons/gi';
import styled from "styled-components";

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
            <HeaderWrapper showNavBar={showNavBar}>
                <Link to="/timeline">linkr</Link>
                <SearchBar>
                    <input placeholder="Search for people and friends"/>
                    <GiMagnifyingGlass />
                </SearchBar>
                <div onClick={() => showNavBar ? setShowNavBar(false) : setShowNavBar(true)}>
                    <IoIosArrowDown />
                    <img src={!!login.token ? login.user.avatar : ""} alt="avatar" />
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

const SearchBar = styled.div`
    width: 563px;
    height: 45px;
    background: #FFFFFF;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 15px 0 17px;
    color: #C6C6C6;

    input {
        font-size: 19px;
        line-height: 23px;
        width: 100%;
        margin-right: 10px;
        outline: none;
        border: none;
    }
    input::placeholder {
        color: #C6C6C6;
    }

`;


