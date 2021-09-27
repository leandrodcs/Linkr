import PostContext from "../../../contexts/PostContext";
import UserContext from "../../../contexts/UserContext";
import DataEvaluationContext from "../../../contexts/DataEvaluationContext";
import Comment from "./Comment";
import { postComment } from "../../../service/service";
import { sendCommentAndUpdatePosts } from "../../../utils/PostsUtils";

import { useContext, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { PaperPlaneOutline } from "react-ionicons";

export default function Comments() {
    const { comments, setComments, id, repostId, setInteractedPostId } = useContext(PostContext);
    const { setIsDataBeingEvaluated } = useContext(DataEvaluationContext);
    const { login } = useContext(UserContext);
    const [text, setText] = useState("");

    return (
        <Wrapper>
            {comments.map(comment => <Comment comment={comment} key={comment.id}/>)}
            <StyledForm onSubmit={(e) => {
                sendCommentAndUpdatePosts (e, postComment, login.token, id, repostId, text, setComments, setText, setIsDataBeingEvaluated, setInteractedPostId);
            }}>
                <Link to="/my-posts" ><img src={login.user.avatar} alt="my-posts" /></Link>
                <input 
                    type="text"
                    placeholder="write a comment..."
                    required
                    value={text}
                    onChange={e => setText(e.target.value)}
                />
                <button type="submit">
                    <PaperPlaneOutline color="#F3F3F3" width="16px" />
                </button>
            </StyledForm>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    padding: 0px 20px;
`;

const StyledForm = styled.form`
    padding: 19px 5px 25px;
    display: flex;
    justify-content: space-between;
    position: relative;
    & img {
        width: 38px;
        height: 38px;
        border-radius: 38px;
        cursor: pointer;
        object-fit: cover;
    }
    & input {
        width: calc(100% - 52px);
        border: none;
        border-radius: 8px;
        background-color: #252525;
        font-family: Lato;
        font-size: 14px;
        font-weight: 400;
        color: #ACACAC;
        padding: 0px 40px 0px 15px;
    }
    & input::placeholder {
        color: #575757;
        font-style: italic;
    }
    & button {
        height: 38px;
        position: absolute;
        right: 18px;
        top: 22px;
        cursor: pointer;
    }
`;