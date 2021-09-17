import PostHeader from "./PostHeader";
import LinkBox from "./LinkBox";

import PostContext from "../../../contexts/PostContext";
import DataEvaluationContext from "../../../contexts/DataEvaluationContext";
import UserContext from "../../../contexts/UserContext";
import { TextWithHighlightedHashtags } from "../../../utils/TextAdjustmentsUtils";

import styled from "styled-components";
import { useContext, useState, useRef, useEffect } from "react";
import { publishEditedPost } from "../../../service/service";

export default function PostBox() {

    const {isDataBeingEvaluated, setIsDataBeingEvaluated} = useContext(DataEvaluationContext);
    const { id, text } = useContext(PostContext);
    const {login} = useContext(UserContext);
    const [editedMsg, setEditedMsg] = useState(text);
    const [isEditing, setIsEditing] = useState(false);
    const inputRef = useRef(null);

    function cancelDeletion() {
        setIsEditing(!isEditing);
        setEditedMsg(text, id, login.token);
    }

    function editPost() {
        setIsDataBeingEvaluated(true);
        inputRef.current.blur();
        publishEditedPost(editedMsg, id, login.token, setIsDataBeingEvaluated, setIsEditing, cancelDeletion);
    }

    function analyzeRequest(e) {
        if(e.keyCode === 27) {
            cancelDeletion()
        }
        if(e.keyCode === 13) {
            editPost()
        }
    }

    useEffect(() => {
        if(isEditing) {
            inputRef.current.focus();
        }
    }, [isEditing]);
    
    return (
        <Wrapper>
            <PostHeader setIsEditing={setIsEditing} isEditing={isEditing} cancelDeletion={cancelDeletion}/>
            {isEditing ?
            <EditInput wrap="soft" isDataBeingEvaluated={isDataBeingEvaluated} onKeyUp={analyzeRequest} ref={inputRef} value={editedMsg} onChange={e => setEditedMsg(e.target.value)}/> 
            :
            <TextWithHighlightedHashtags 
                text = {editedMsg}
                MainStyledComponent = {Description}
                HashtagStyledComponent = {Hashtag}
            />}
            <LinkBox />
        </Wrapper>
    );
}

const EditInput = styled.input`
    width: 100%;
    font-size: 18px;
    line-height: 25px;
    margin: 8px 0px;
    border-radius: 5px;
    border: none;
    padding: 0 5px;
    background: ${({isDataBeingEvaluated}) => isDataBeingEvaluated ? `#c2c2c2` : `#FFFFFF`};
    pointer-events: ${({isDataBeingEvaluated}) => isDataBeingEvaluated ? `none` : `initial`};
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
    @media(max-width: 937px) {
        font-size: 15px;
        line-height: 20px;
    }
`