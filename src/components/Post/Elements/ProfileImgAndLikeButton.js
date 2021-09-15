import styled from "styled-components";
import { Link } from "react-router-dom";
import { formattedNumberOfLikes } from "../../../utils/PostsUtils";
import { AiOutlineHeart, AiTwotoneHeart } from "react-icons/ai";
import { useContext } from "react";
import PostContext from "../../../contexts/PostContext";

export default function ProfileImgAndLikeButton() {
    const {id, user, likes} = useContext(PostContext);
    const hasUserLikedThisPost = false;
    return (
        <Wrapper>
        <Link to={`/user/${id}`}>
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
`

const LikedHeart = styled(AiTwotoneHeart)`
font-size: 20px;
color: #AC0000;
margin-bottom: 6px;
`

const NotLikedHeart = styled(AiOutlineHeart)`
font-size: 20px;
color: #FFFFFF;
margin-bottom: 6px;
`