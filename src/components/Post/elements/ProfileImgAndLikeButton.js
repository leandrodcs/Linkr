import Likes from "./Likes";

import PostContext from "../../../contexts/PostContext";

import styled from "styled-components";
import { Link } from "react-router-dom";
import { useContext } from "react";

export default function ProfileImgAndLikeButton() {
    const { user } = useContext(PostContext);

    return (
        <Wrapper>
            <Link to={`/user/${user.id}`}>
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
    @media(max-width: 937px) {
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