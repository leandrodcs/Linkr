import ProfileImgAndInteractionButtons from "./elements/ProfileImgAndInteractionButtons";
import PostBox from "./elements/PostBox";
import RepostHeader from "./elements/RepostHeader";
import Comments from "./elements/Comments";

import PostContext from "../../contexts/PostContext";

import styled from "styled-components";
import { useState } from "react";

export default function Post({setInteractedPostId, post:{ id, likes, link, linkDescription, linkImage, linkTitle, commentCount, repostCount, repostId,repostedBy, text, user, hasUserLiked, geolocation}}) {
    const [showComments, setShowComments] = useState(false);
    const [comments, setComments] = useState([]);
    const [isHidden, setIsHidden] = useState(false);

    return (
        <PostContext.Provider value = {{ setIsHidden, setInteractedPostId, id, likes, link, linkDescription, linkImage, commentCount, linkTitle, repostCount, repostId,repostedBy, text, user, hasUserLiked, geolocation, showComments, setShowComments, comments, setComments}}>
            <Wrapper isHidden = {isHidden}>
            <RepostHeader />
            <MainPost>
                <ProfileImgAndInteractionButtons />
                <PostBox />
            </MainPost>
            {showComments ? <Comments /> : ""}
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
    display: ${ ({isHidden}) => isHidden ? "none" : "block"};


    @media(max-width: 637px) {
        width: 100%;
        border-radius: 0px;
    }
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