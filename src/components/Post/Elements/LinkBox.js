import { useContext } from "react";
import styled from "styled-components";
import PostContext from "../../../contexts/PostContext";
import { OpenLinkInNewPage } from "../../../utils/PostsUtils";
import { CheckTextLengthAndReduceItIfNeeded } from "../../../utils/TextAdjustmentsUtils";

export default function LinkBox() {
    const { link, linkTitle, linkDescription, linkImage } = useContext(PostContext);
    return (
        <Wrapper onClick = {() => OpenLinkInNewPage(link)}>
            <LinkBoxContent>
                <LinkTitle>{CheckTextLengthAndReduceItIfNeeded(linkTitle,60)}</LinkTitle>
                <LinkDescription>{CheckTextLengthAndReduceItIfNeeded(linkDescription,80)}</LinkDescription>
                <LinkUrl>{CheckTextLengthAndReduceItIfNeeded(link,55)}</LinkUrl>
            </LinkBoxContent>
            <img src = {linkImage} alt = "link" />
        </Wrapper>
    );
}

const Wrapper = styled.div`
    width: 100%;
    border: 1px solid #C4C4C4;
    border-radius: 11px;
    display: flex;
    justify-content: space-between;
    cursor: pointer;
    & img {
        width: 150px;
        min-height: 150px;
        object-fit: cover;
        border-radius: 0px 11px 11px 0px;
    }
    @media(max-width: 937px) {
        & img {
        width: 100px;
        min-height: 100px;
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
    @media(max-width: 937px) {
        padding: 11px;
    }
`

const LinkTitle = styled.p`
    font-size: 16px;
    line-height: 20px;
    word-break: break-all;
    @media(max-width: 937px) {
        font-size: 11px;
        line-height: 14px;
    }
`

const LinkDescription = styled.p`
    font-size: 11px;
    line-height: 14px;
    color: #9B9595;
    word-break: break-all;
    @media(max-width: 937px) {
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
    @media(max-width: 937px) {
        font-size: 9px;
        line-height: 11px;
    }
`