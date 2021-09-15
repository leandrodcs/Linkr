import ProfileImgAndLikeButton from "./elements/ProfileImgAndLikeButton";
import { LikedHeart, NotLikedHeart } from "./elements/Heat";
import PostContent from "./elements/PostContent";
import Header from "./elements/Header";
import IconButton from "./elements/IconButton";
import Description from "./elements/Description";
import LinkBox from "./elements/LinkBox";

import styled from "styled-components";
import { TiPencil, TiTrash } from "react-icons/ti";

function likesText(numberOfLikes) {
    return `${numberOfLikes} ${numberOfLikes > 1 ? "likes" : "like"}`
}

export default function Post({text, user, likes}) {
    const isLiked = true;
    return (
        <Wrapper>
            <ProfileImgAndLikeButton>
                <img src = { user.avatar } alt = {user.username} />
                {isLiked ? <LikedHeart /> : <NotLikedHeart />}
                <p>{ likesText(likes.length) }</p>
            </ProfileImgAndLikeButton>
            <PostContent>
                <Header>
                    {user.username}
                    <IconButton right = {"25px"}>
                        <TiPencil />
                    </IconButton>
                    <IconButton right = {"0px"}>
                        <TiTrash />
                    </IconButton>
                </Header>
                <Description>
                    {text}
                </Description>
                <LinkBox />
            </PostContent>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    width: 100%;
    border-radius: 16px;
    background-color: #171717;
    padding: 18px;
    margin-bottom: 20px;
    display: flex;
    font-family: 'Lato', sans-serif;

    &:last-child {
        margin-bottom: 0px;
    }
`