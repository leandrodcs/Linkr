import Likes from "./Likes";

import PostContext from "../../../contexts/PostContext";
import UserContext from "../../../contexts/UserContext";

import styled from "styled-components";
import { Link } from "react-router-dom";
import { useContext } from "react";


export default function ProfileImgAndLikeButton() {
    const { user } = useContext(PostContext);
    const { login } = useContext(UserContext);
    const imageRoute = user.id === Number(login.user.id) ? "my-posts" : `/user/${user.id}`;
    return (
        <Wrapper>
            <Link to={ imageRoute }>
                <img src = { user.avatar } alt = {user.username} />
            </Link>
            <Likes />
        </Wrapper>
    );
}

const Wrapper = styled.div`
    margin-right: 18px;
    display: flex;
    flex-direction: column;
    align-items: center;
    & img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        margin-bottom: 20px;
        object-fit: cover;
    }
    & p {
        font-size: 14px;
        font-weight: 400;
        color: #FFFFFF;
    }
    & span {
        font-weight: 700;
        font-size: 11px;
    }
    @media(max-width: 637px) {
        margin-right: 14px;
        & img {
            width: 40px;
            height: 40px;
            margin-bottom: 17px;
        }
        & p {
            font-size: 11px;
        }
    }
`;