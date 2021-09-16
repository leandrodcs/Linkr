import PostContext from "../../../contexts/PostContext";
import UserContext from "../../../contexts/UserContext";
import { formattedNumberOfLikes } from "../../../utils/PostsUtils";

import styled from "styled-components";
import { Link } from "react-router-dom";
import { AiOutlineHeart, AiTwotoneHeart } from "react-icons/ai";
import { useContext } from "react";


export default function ProfileImgAndLikeButton() {
    const { user, likes} = useContext(PostContext);
    const { login } = useContext(UserContext);
    const hasUserLikedThisPost = false;
    const imageRoute = user.id === Number(login.user.id) ? "my-posts" : `/user/${user.id}`;
    return (
        <Wrapper>
            <Link to={ imageRoute }>
                <img src = { user.avatar } alt = {user.username} />
            </Link>
            {hasUserLikedThisPost ? <LikedHeart /> : <NotLikedHeart />}
            <p>{ formattedNumberOfLikes(likes.length) }</p>
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
`

const LikedHeart = styled(AiTwotoneHeart)`
    font-size: 20px;
    color: #AC0000;
    margin-bottom: 6px;
    @media(max-width: 937px) {
        font-size: 17px;
        margin-bottom: 12px;
    }
`

const NotLikedHeart = styled(AiOutlineHeart)`
    font-size: 20px;
    color: #FFFFFF;
    margin-bottom: 6px;
    @media(max-width: 937px) {
        font-size: 17px;
        margin-bottom: 12px;
    }
`