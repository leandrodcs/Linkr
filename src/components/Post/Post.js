import ProfileImgAndLikeButton from "./elements/ProfileImgAndLikeButton";
import PostBox from "./elements/PostBox";

import PostContext from "../../contexts/PostContext";

import styled from "styled-components";

export default function Post({post:{ id, text, link, linkTitle, linkDescription, linkImage, user, likes}}) {

    return (
        <PostContext.Provider value = {{ id, text, link, linkTitle, linkDescription, linkImage, user, likes }}>
            <Wrapper>
                <ProfileImgAndLikeButton />
                <PostBox />
            </Wrapper>
        </PostContext.Provider>
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
    hyphens: auto;
    &:last-child {
        margin-bottom: 0px;
    }
    @media(max-width: 937px) {
        border-radius: 0px;
        padding: 15px;
    }
`