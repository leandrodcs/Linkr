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
import {GiMagnifyingGlass} from 'react-icons/gi';
import SuggestionWindow from "./elements/SuggestionWindow";
import { DebounceInput } from "react-debounce-input";

export default function Header() {
    const [showNavBar, setShowNavBar] = useState(false);
    const history = useHistory();
    const {login, setLogin} = useContext(UserContext);
    const [search, setSearch] = useState("");

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

    function searchUsers(e) {
        console.log("oi");
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
            <SearchBar>
                <DebounceInput 
                placeholder="Search for people and friends"
                debounceTimeout={300}
                minLength={3}
                // value={search}
                onChange={e => searchUsers(e)}
                />
                <GiMagnifyingGlass />
                <SuggestionWindow>
                    <ul>
                        <li>
                            <img src="http://pm1.narvii.com/7314/fd5edae777c0f61823422e8ec0449cf4beec144br1-255-315v2_uhq.jpg" alt="avatar"/>
                            <p>João<span> • following</span></p>
                        </li>
                        <li>
                            <img src="http://pm1.narvii.com/7314/fd5edae777c0f61823422e8ec0449cf4beec144br1-255-315v2_uhq.jpg" alt="avatar"/>
                            <p>João<span> • following</span></p>
                        </li>
                    </ul>
                </SuggestionWindow>
            </SearchBar>
        </>
    );
}



