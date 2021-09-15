import styled from "styled-components";
import Header from "./PostHeader";
import LinkBox from "./LinkBox";
import { TextWithHighlightedHashtags } from "../../../utils/TextAdjustmentsUtils";
import { useContext } from "react";
import PostContext from "../../../contexts/PostContext";

export default function PostBox() {
    const { text } = useContext(PostContext);
    return (
        <Wrapper>
            <Header />
            <TextWithHighlightedHashtags 
                text = {text}
                MainStyledComponent = {Description}
                HashtagStyledComponent = {Hashtag}
            />
            <LinkBox />
        </Wrapper>
    );
}

const Wrapper = styled.div`
    width: 100%;
`

const Description = styled.span`
    font-size: 18px;
    color: #B7B7B7;
    display: inline-block;
    margin: 8px 0px;
`

const Hashtag = styled.p`
    font-size: 18px;
    font-weight: 700;
    color: #FAFAFA;
    display: inline-block;
    margin: 8px 0px;
`