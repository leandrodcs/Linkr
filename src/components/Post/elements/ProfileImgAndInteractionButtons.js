import Likes from "./Likes";
import Reposts from "./Reposts";

import PostContext from "../../../contexts/PostContext";
import UserContext from "../../../contexts/UserContext";

import styled from "styled-components";
import { Link } from "react-router-dom";
import { useContext } from "react";


export default function ProfileImgAndInteractionButtons() {
    const { user } = useContext(PostContext);
    const { login } = useContext(UserContext);
    const imageRoute = user.id === Number(login.user.id) ? "my-posts" : `/user/${user.id}`;
    return (
        <Wrapper>
            <Link to={ imageRoute }>
                <img src = { user.avatar } alt = {user.username} />
            </Link>
            <Likes />
            <Reposts /> 
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
        border-radius: 50%;
        object-fit: cover;
    }

    @media(max-width: 637px) {
        margin-right: 14px;
        & img {
            width: 40px;
            height: 40px;
            margin-bottom: 17px;
        }
    }
`;