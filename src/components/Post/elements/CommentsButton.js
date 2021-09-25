import { formattedNumberOfInteractions } from "../../../utils/PostsUtils";
import { getPostComments } from "../../../service/service";
import PostContext from "../../../contexts/PostContext";
import UserContext from "../../../contexts/UserContext";

import styled from "styled-components";
import { AiOutlineComment } from "react-icons/ai";
import { useContext, useEffect, useRef} from "react";


export default function CommentsButton() {
    const { 
        id,
        showComments,
        setShowComments,
        comments,
        setComments
    } = useContext(PostContext);
    const { login } = useContext(UserContext);
    const isMountedRef = useRef(null);

    useEffect((() => {
        isMountedRef.current = true;
        getPostComments(login.token, id, setComments, isMountedRef);
        return () => isMountedRef.current = false;
    }), [id, login.token, setComments]);

    return (
        <Wrapper>
            <CommentsBubble onClick={() => setShowComments(!showComments)} />
            <p>{formattedNumberOfInteractions(comments.length, "comment")}</p>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
    & p {
        font-size: 11px;
        font-weight: 400;
        color: #FFFFFF;
        text-align: center;
    }
    & span {
        font-weight: 700;
        font-size: 11px;
    }

    @media(max-width: 637px) {
        margin-bottom: 17px;
        & p {
            font-size: 11px;
        }
    }
`

const CommentsBubble = styled(AiOutlineComment)`
    font-size: 20px;
    font-weight: 700;
    color: #FFF;
    cursor: pointer;
    margin-bottom: 4px;

    @media(max-width: 637px) {
        font-size: 17px;
    }
`;