import SuggestionWindow from "./SuggestionWindow";

import UserContext from "../../../contexts/UserContext";
import { getUserList } from "../../../service/service";

import { DebounceInput } from "react-debounce-input";
import styled from "styled-components";
import { useContext, useRef, useState } from "react";
import { useHistory } from "react-router";
import { SearchOutline } from 'react-ionicons'



export default function SearchBar() {
    const [showUsers, setShowUsers] = useState(false);
    const [userList, setUserList] = useState([]);
    const [search, setSearch] = useState("");
    const {login} = useContext(UserContext);
    const history = useHistory();
    const inputRef = useRef(null);

    function closeSuggestionWindow() {
        setShowUsers(false);
        setUserList([]);
    }

    function searchForUser(e) {
        const currentSearch = e.target.value;
        if(currentSearch.length < 3) {
            setShowUsers(false);
            setUserList([]);
            return;
        }
        getUserList(currentSearch, login.token, setUserList, setShowUsers);
    }

    function analyzeKey(e, whereTo) {
        if (e.key !== "Enter" || !userList.length) {
            return;
        }
        e.target.blur();
        relocate(whereTo);
    }

    function relocate(whereTo) {
        if (!userList.length) {
            return;
        }
        setShowUsers(false);
        setSearch("");
        setUserList([]);
        if(whereTo === Number(login.user.id)) {
            history.push(`/my-posts`);
            return;
        }
        history.push(`/user/${whereTo}`);
    }

    return (
        <Wrapper>
            <DebounceInput 
            ref={inputRef}
            placeholder="Search for people and friends"
            debounceTimeout={300}
            value={search}
            onKeyUp={e => analyzeKey(e, userList.length ? userList[0].id : "")}
            onBlur={closeSuggestionWindow}
            onFocus={e => searchForUser(e)}
            onChange={e => {
                setSearch(e.target.value);
                searchForUser(e);
            }}
            />
            <button  onClick={() => relocate( userList.length ? userList[0].id : "")}>
            <SearchOutline />
            </button>
            {!showUsers ? 
            ""
            :
            !userList.length ? 
            <>
                <Fill />
                <SuggestionWindow userList={userList}>
                    <li>
                        <p><WhoIsIt>Nenhum usuário encontrado ;(</WhoIsIt></p>
                    </li>
                </SuggestionWindow> 
            </>
            :
            <>
                <Fill />
                <SuggestionWindow userList={userList}>
                    {userList.map(user => (
                        <li key={user.id} onClick={() => relocate(user.id)}>
                            <img src={user.avatar} alt="avatar"/>
                            <p><Username>{user.username}</Username><WhoIsIt>{
                            Number(login.user.id) === user.id ? " • you :)" : 
                            user.isFollowingLoggedUser ?"• following":""
                            }</WhoIsIt></p>
                        </li>
                    ))}
                </SuggestionWindow> 
            </>
             }
        </Wrapper>
    );
}

const Fill = styled.div`
    height: 60px;
    border-radius: 8px;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    background: #E7E7E7;
`;

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
    height: 45px;
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
        font-size: 24px;
        -webkit-tap-highlight-color: rgba(0,0,0,0);
        color: #C6C6C6;
    }

    button {
        cursor: pointer;
        transform: translateY(-50%);
        height: 45px;
        border-radius: 8px;
        width: 40px;
        top: 50%;
        right: 0;
        z-index: 10;
        position: absolute;
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