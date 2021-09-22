import SuggestionWindow from "./SuggestionWindow";

import UserContext from "../../../contexts/UserContext";
import { getUserList } from "../../../service/service";

import { DebounceInput } from "react-debounce-input";
import styled from "styled-components";
import { useContext, useState } from "react";
import { useHistory } from "react-router";
import {GiMagnifyingGlass} from 'react-icons/gi';

export default function SearchBar() {
    const [userList, setUserList] = useState([]);
    const [search, setSearch] = useState("");
    const {login} = useContext(UserContext);
    const history = useHistory();

    function searchForUser(e) {
        const currentSearch = e.target.value;
        console.log("oi");
        if(currentSearch.length < 3) {
            return setUserList([]);
        }
        getUserList(currentSearch, login.token, setUserList);
    }

    function relocate(e ,whereTo) {
        setSearch("");
        setUserList([]);
        if(whereTo === Number(login.user.id)) {
            return history.push(`/my-posts`);
        }
        history.push(`/user/${whereTo}`);
    }

    return (
        <Wrapper>
            <DebounceInput 
            placeholder="Search for people and friends"
            debounceTimeout={300}
            value={search}
            minLength={3}
            onChange={e => {
                setSearch(e.target.value);
                searchForUser(e);
            }}
            />
            <GiMagnifyingGlass />
            {userList.length ? 
            <SuggestionWindow>
                {userList.map(user => (
                    <li key={user.id} onClick={(e) => relocate(e, user.id)}>
                        <img src={user.avatar} alt="avatar"/>
                        <p><Username>{user.username}</Username><WhoIsIt>{
                        Number(login.user.id) === user.id ? " • you :)" : 
                        user.isFollowingLoggedUser ?"• following":""
                        }</WhoIsIt></p>
                    </li>
                ))}
            </SuggestionWindow> 
            : "" }
        </Wrapper>
    );
}

const Username= styled.span`
    overflow-x: hidden;
    text-overflow: ellipsis;
    max-width: 70%;

    @media(max-width: 937px) {
        max-width: 60%;
    }
        @media(max-width: 637px) {
            max-width: 70%;
    }
`;

const WhoIsIt = styled.span`
    color: #C5C5C5;
    margin-left: 5px;
`;

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
    z-index: 6;
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
        z-index: 2;
        position: relative;
        width: 90vw;
        height: 45px;
        margin-top: 82px;

        input {
            font-size: 17px;
        }
    }
`;