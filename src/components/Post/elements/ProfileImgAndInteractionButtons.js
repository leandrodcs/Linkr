import Likes from "./Likes";
import Reposts from "./Reposts";
import CommentsButton from "./CommentsButton";
import defaultAvatar from "../../../assets/defaultAvatar.png";

import PostContext from "../../../contexts/PostContext";
import UserContext from "../../../contexts/UserContext";

import styled from "styled-components";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";

export default function ProfileImgAndInteractionButtons() {
    const { user } = useContext(PostContext);
    const { login } = useContext(UserContext);
    const [displayedAvatar, setDisplayedAvatar] = useState(user.avatar);
    const imageRoute = user.id === Number(login.user.id) ? "/my-posts" : `/user/${user.id}`;
    return (
        <Wrapper>
            <Link to={ imageRoute }>
                <img src = { displayedAvatar } onError={() => setDisplayedAvatar(defaultAvatar)} alt = {user.username} />
            </Link>
            <Likes />
            <CommentsButton /> 
            <Reposts />
        </Wrapper>
    );
}

const Wrapper = styled.div`
    width: 75px;
    margin-right: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    & img {
        width: 50px;
        height: 50px;
        margin-bottom: 20px;
        border-radius: 50%;
        object-fit: cover;
    }

    @media(max-width: 637px) {
        width: 55px;
        margin-right: 15px;
        & img {
            width: 40px;
            height: 40px;
            margin-bottom: 17px;
        }
    }
`;