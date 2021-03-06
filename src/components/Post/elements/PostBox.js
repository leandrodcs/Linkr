import PostHeader from "./PostHeader";
import LinkBox from "./LinkBox";

import PostContext from "../../../contexts/PostContext";
import DataEvaluationContext from "../../../contexts/DataEvaluationContext";
import UserContext from "../../../contexts/UserContext";
import { TextWithHighlightedHashtags } from "../../../utils/TextAdjustmentsUtils";
import { cancelEditing, analyzeRequest } from "../../../utils/PostsUtils";

import styled from "styled-components";
import { useContext, useState, useRef, useEffect } from "react";

export default function PostBox() {

    const {isDataBeingEvaluated, setIsDataBeingEvaluated} = useContext(DataEvaluationContext);
    const { id, text, setInteractedPostId } = useContext(PostContext);
    const {login} = useContext(UserContext);
    const [editedMsg, setEditedMsg] = useState(0);
    const [isEditing, setIsEditing] = useState(false);
    const inputRef = useRef(null);

    useEffect(() => {
        if(isEditing) {
            inputRef.current.focus();
        }
    }, [isEditing]);
    
    return (
        <Wrapper>
            <PostHeader setIsEditing={setIsEditing} isEditing={isEditing} cancelEditing={cancelEditing} setEditedMsg={setEditedMsg}/>
            {isEditing ?
            <EditInput 
            disabled={isDataBeingEvaluated} 
            onKeyUp={(e) => analyzeRequest(e, setInteractedPostId, editedMsg, id, login.token, setIsDataBeingEvaluated, setIsEditing, cancelEditing, isEditing, text, setEditedMsg)} 
            ref={inputRef} 
            value={editedMsg === 0 ? text : editedMsg} 
            onChange={e => setEditedMsg(e.target.value)}
            /> 
            :
            <TextWithHighlightedHashtags 
                text = {editedMsg === 0 ? text : editedMsg}
                MainStyledComponent = {Description}
                HashtagStyledComponent = {Hashtag}
            />}
            <LinkBox />
        </Wrapper>
    );
}

const Wrapper = styled.div`
    width: calc(100% - 85px);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    @media(max-width: 637px) {
        width: calc(100% - 70px);
    }
`

const EditInput = styled.input`
    width: 100%;
    font-size: 18px;
    line-height: 25px;
    margin: 8px 0px;
    border-radius: 5px;
    border: none;
    padding: 0 5px;
    background: ${({isDataBeingEvaluated}) => isDataBeingEvaluated ? `#c2c2c2` : `#FFFFFF`};
`;

const Description = styled.span`
    font-size: 18px;
    line-height: 25px;
    color: #B7B7B7;
    display: inline-block;
    word-break: break-word;
    margin: 8px 0px;
    @media(max-width: 637px) {
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
    @media(max-width: 637px) {
        font-size: 15px;
        line-height: 20px;
    }
`