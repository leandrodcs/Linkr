import PostHeader from "./PostHeader";
import LinkBox from "./LinkBox";

import PostContext from "../../../contexts/PostContext";
import { TextWithHighlightedHashtags } from "../../../utils/TextAdjustmentsUtils";

import styled from "styled-components";
import { useContext, useState } from "react";

export default function PostBox() {

    const { text } = useContext(PostContext);
    const [isEditing, setIsEditing] = useState(false);
    
    return (
        <Wrapper>
            <PostHeader setIsEditing={setIsEditing}/>
            {isEditing ?<EditInput value={text}/> :
            <TextWithHighlightedHashtags 
                text = {text}
                MainStyledComponent = {Description}
                HashtagStyledComponent = {Hashtag}
            />}
            <LinkBox />
        </Wrapper>
    );
}

const EditInput = styled.input`
    font-size: 18px;
    line-height: 25px;
    margin: 8px 0px;
`;

const Wrapper = styled.div`
    width: 100%;
`

const Description = styled.span`
    font-size: 18px;
    line-height: 25px;
    color: #B7B7B7;
    display: inline-block;
    margin: 8px 0px;
    word-wrap: break-word;
    @media(max-width: 937px) {
        font-size: 15px;
        line-height: 20px;
    }
`

const Hashtag = styled.p`
    font-size: 18px;
    line-height: 25px;
    font-weight: 700;
    color: #FAFAFA;
    display: inline-block;
    word-wrap: break-word;
    @media(max-width: 937px) {
        font-size: 15px;
        line-height: 20px;
    }
`