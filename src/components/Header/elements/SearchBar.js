import styled from "styled-components";
import { DebounceInput } from "react-debounce-input";
import SuggestionWindow from "./SuggestionWindow";
import {GiMagnifyingGlass} from 'react-icons/gi';
import { useContext, useState } from "react";
import { getUserList } from "../../../service/service";
import UserContext from "../../../contexts/UserContext";




export default function SearchBar() {
    const [showUserList, setShowUserList] = useState(false);
    const [userList, setUserList] = useState([]);
    const {login} = useContext(UserContext);

    function searchForUser(e) {
        if(e.target.value.length < 3) {
            setUserList([]);
            return setShowUserList(false);
        }
        setShowUserList(true);
        getUserList(e.target.value, login.token, setUserList);
    }

    return (
        <Wrapper>
            <DebounceInput 
            placeholder="Search for people and friends"
            debounceTimeout={300}
            minLength={3}
            onChange={e => searchForUser(e)}
            />
            <GiMagnifyingGlass />
            {showUserList && userList.length ? 
            <SuggestionWindow>
                {userList.map(user => (
                    <li>
                        <img src={user.avatar} alt="avatar"/>
                        <p>{user.username}<span>{!user.isFollowingLoggedUser||"• following"}</span></p>
                    </li>
                ))}
            </SuggestionWindow> 
            : "" }
        </Wrapper>
    );
}

const Wrapper = styled.div`
    width: 563px;
    min-height: 45px;
    background: #FFFFFF;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #C6C6C6;
    position: fixed;
    font-family: 'Lato', sans-serif;
    z-index: 10;
    left: 50%;
    top: 36px;
    transform: translate(-50%, -50%);

    input {
        position: absolute;
        font-size: 19px;
        width: 100%;
        margin-right: 10px;
        outline: none;
        border: none;
        height: 45px;
        border-radius: 8px;
        padding: 0 50px 0 17px;
        z-index: 1;

    }
    input::placeholder {
        color: #C6C6C6;
    }

    svg {
        transform: rotate(270deg);
        font-size: 21px;
        cursor: pointer;
        position: absolute;
        top: 50%;
        right: 15px;
        transform: translateY(-50%);
        z-index: 1;
        -webkit-tap-highlight-color: rgba(0,0,0,0);
    }

    @media(max-width: 937px) {
        width: 350px;
    }

    @media(max-width: 637px) {
        z-index: 0;
        position: relative;
        width: 90vw;
        height: 45px;
        margin-top: 82px;

        input {
            font-size: 17px;
        }
    }
`;