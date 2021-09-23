import PostContext from "../../../contexts/PostContext";
import { OpenLinkInNewPage } from "../../../utils/PostsUtils";
import { CheckTextLengthAndReduceItIfNeeded } from "../../../utils/TextAdjustmentsUtils";

import styled from "styled-components";
import { useContext, useState } from "react";
import getYouTubeID from "get-youtube-id";

export default function LinkBox() {
    const { link, linkTitle, linkDescription, linkImage } = useContext(PostContext);
    const youtubeId = getYouTubeID(link);
    const [displayedImage, setDisplayedImage] = useState(linkImage);

    if(youtubeId) {
        return (
            <Wrapper video={true}>
                <iframe
                    title={linkTitle}
                    src={"https://www.youtube.com/embed/" + youtubeId}
                />
                <p onClick = {() => OpenLinkInNewPage(link)}>{link}</p>
            </Wrapper>
        );
    }

    console.log(linkImage);

    return (
        <Wrapper onClick = {() => OpenLinkInNewPage(link)}>
            <LinkBoxContent>
                <LinkTitle>{CheckTextLengthAndReduceItIfNeeded(linkTitle,60)}</LinkTitle>
                <LinkDescription>{CheckTextLengthAndReduceItIfNeeded(linkDescription,80)}</LinkDescription>
                <LinkUrl>{CheckTextLengthAndReduceItIfNeeded(link,55)}</LinkUrl>
            </LinkBoxContent>
            <img src = {linkImage} onError={"this.onerror=null;this.src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png';"} alt = "link" />
        </Wrapper>
    );
}

const Wrapper = styled.div`
    width: 500px;
    border: ${props => props.video ? "none" : "1px solid #C4C4C4"};
    border-radius: ${props => props.video ? "0px" : "11px"};
    display: ${props => props.video ? "initial" : "flex"};
    justify-content: space-between;
    cursor: pointer;
    & img {
        width: 150px;
        height: 150px;
        object-fit: cover;
        border-radius: 0px 11px 11px 0px;
    }
    & iframe {
        width: 500px;
        height: 281px;
    }
    p {
        font-family: Lato;
        font-size: 17px;
        font-weight: 400;
        color: #B7B7B7;
        margin: 10px 0px 4px;
    }
    @media(max-width: 637px) {
        & img {
        width: 100px;
        height: 100px;
        }
        & iframe {
            height: calc((100vw / 16) * 9);
        }
    }
`

const LinkBoxContent = styled.div`
    width: 100%;
    padding: 16px;
    font-weight: 400;
    color: #CECECE;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    @media(max-width: 637px) {
        padding: 11px;
    }
`

const LinkTitle = styled.p`
    font-size: 16px;
    line-height: 20px;
    @media(max-width: 637px) {
        font-size: 11px;
        line-height: 14px;
    }
`

const LinkDescription = styled.p`
    font-size: 11px;
    line-height: 14px;
    color: #9B9595;
    @media(max-width: 637px) {
        font-size: 9px;
        line-height: 11px;
        display: inline-block;
        margin: 8px 0px;
    }
`

const LinkUrl = styled.p`
    font-size: 11px;
    line-height: 14px;
    word-break: break-all;
    @media(max-width: 637px) {
        font-size: 9px;
        line-height: 11px;
    }
`