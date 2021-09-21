import ProfileImgAndInteractionButtons from "./elements/ProfileImgAndInteractionButtons";
import PostBox from "./elements/PostBox";
import RepostHeader from "./elements/RepostHeader";

import PostContext from "../../contexts/PostContext";

import styled from "styled-components";

export default function Post({post:{ id, likes, link, linkDescription, linkImage, linkTitle, repostCount, repostId,repostedBy, text, user, hasUserLiked}}) {

    return (
        <PostContext.Provider value = {{ id, likes, link, linkDescription, linkImage, linkTitle, repostCount, repostId,repostedBy, text, user, hasUserLiked}}>
            <Wrapper>
            <RepostHeader />
            <MainPost>
                <ProfileImgAndInteractionButtons />
                <PostBox />
            </MainPost>
            </Wrapper>
        </PostContext.Provider>
    );
}

const Wrapper = styled.div`
    margin-bottom: 20px;
    font-family: 'Lato', sans-serif;
    word-break: break-word;
    background-color: #1E1E1E;
    border-radius: 16px;
`

const MainPost = styled.div`
    width: 100%;
    border-radius: 16px;
    background-color: #171717;
    padding: 18px 14px;
    display: flex;

    &:last-child {
        margin-bottom: 0px;
    }
    @media(max-width: 637px) {
        width: 100%;
        border-radius: 0px;
        padding: 15px;
    }
`