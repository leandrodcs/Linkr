import Modal from "../../Modals/PreviewModal";

import PostContext from "../../../contexts/PostContext";
import { OpenLinkInNewPage } from "../../../utils/PostsUtils";
import { CheckTextLengthAndReduceItIfNeeded } from "../../../utils/TextAdjustmentsUtils";

import styled from "styled-components";
import { useContext, useState } from "react";
import getYouTubeID from "get-youtube-id";

export default function LinkBox() {
    const { link, linkTitle, linkDescription, linkImage } = useContext(PostContext);
    const [openModal, setOpenModal] = useState(false);
    const youtubeId = getYouTubeID(link);

    if(youtubeId) {
        return (
            <Wrapper video={true}>
                <iframe
                    title={linkTitle}
                    src={"https://www.youtube.com/embed/" + youtubeId}
                />
                <LinkUrlUnderVideo onClick = {() => OpenLinkInNewPage(link)}>
                    {link}
                </LinkUrlUnderVideo>
            </Wrapper>
        );
    }

    return (
        <>
            <Wrapper onClick = {() => setOpenModal(true)}>
                <LinkBoxContent>
                    <LinkTitle>{CheckTextLengthAndReduceItIfNeeded(linkTitle, 50)}</LinkTitle>
                    <LinkDescription>{CheckTextLengthAndReduceItIfNeeded(linkDescription,100)}</LinkDescription>
                    <LinkUrl>{link}</LinkUrl>
                </LinkBoxContent>
                <img src = {linkImage} alt = "link" />
            </Wrapper>
            <Modal openModal = { openModal } setOpenModal = { setOpenModal } />
        </>
    );
}

const Wrapper = styled.div`
    width: 100%;
    min-height: 155px;
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
        width: 100%;
        height: calc( 493px * 9 / 16 );
    }
    @media(max-width: 637px) {
        & img {
            width: 100px;
            height: 100%;
        }
        & iframe {
            width: calc(100vw - 120px);
            height: calc((100vw - 120px) / 16 * 9);
        }
    }
`

const LinkBoxContent = styled.div`
    width: calc(100% - 150px);
    height: 100%;
    padding: 16px;
    font-weight: 400;
    color: #CECECE;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    @media(max-width: 637px) {
        width: calc(100% - 100px);
        padding: 11px;
    }
`

const LinkTitle = styled.p`
    font-size: 16px;
    line-height: 20px;
    word-break: break-word;

    @media(max-width: 637px) {
        font-size: 11px;
        line-height: 14px;
    }
`

const LinkDescription = styled.p`
    font-size: 11px;
    line-height: 14px;
    color: #9B9595;
    word-break: break-word;
    
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
    word-break: break-word;
    max-width: 90%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    @media(max-width: 637px) {
        font-size: 9px;
        line-height: 11px;
    }
`

const LinkUrlUnderVideo = styled.p`
    font-size: 17px;
    font-weight: 400;
    color: #B7B7B7;
    margin: 10px 0px 4px;
    max-width: 90%;
    white-space: nowrap;
    overflow:hidden;
    text-overflow: ellipsis;

    @media(max-width: 637px) {
        font-size: 12px;
        line-height: 11px;
    }
`
