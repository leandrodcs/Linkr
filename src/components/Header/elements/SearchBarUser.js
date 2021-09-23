import defaultAvatar from "../../../assets/defaultAvatar.png";

import { useState } from "react";
import styled from "styled-components";

export default function SearchBarUser({user, relocate, login}) {

    const [displayedAvatar, setDisplayedAvatar] = useState(user.avatar)

    return (
        <li key={user.id} onClick={() => relocate(user.id)}>
        <img src={displayedAvatar} onError={() => setDisplayedAvatar(defaultAvatar)} alt="avatar"/>
        <p><Username>{user.username}</Username><WhoIsIt>{
        Number(login.user.id) === user.id ? " • you :)" : 
        user.isFollowingLoggedUser ?"• following":""
        }</WhoIsIt></p>
        </li>
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