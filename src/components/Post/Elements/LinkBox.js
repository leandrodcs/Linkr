import { useContext } from "react";
import styled from "styled-components";
import PostContext from "../../../contexts/PostContext";
import { OpenLinkInNewPage } from "../../../utils/PostsUtils";
import { CheckTextSizeAndReduceItIfNeeded } from "../../../utils/TextAdjustmentsUtils";

export default function LinkBox() {
    const { link, linkTitle, linkDescription, linkImage } = useContext(PostContext);
    return (
        <Wrapper onClick = {() => OpenLinkInNewPage(link)}>
            <LinkBoxContent>
                <LinkTitle>{CheckTextSizeAndReduceItIfNeeded(linkTitle,60)}</LinkTitle>
                <LinkDescription>{CheckTextSizeAndReduceItIfNeeded(linkDescription,160)}</LinkDescription>
                <LinkUrl>{link}</LinkUrl>
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
        height: 150px;
        object-fit: cover;
        border-radius: 0px 11px 11px 0px;
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
`

const LinkTitle = styled.p`
    font-size: 16px;
    line-height: 20px;
`

const LinkDescription = styled.p`
    font-size: 11px;
    line-height: 14px;
    color: #9B9595;
`

const LinkUrl = styled.p`
    font-size: 11px;
    line-height: 14px;
`