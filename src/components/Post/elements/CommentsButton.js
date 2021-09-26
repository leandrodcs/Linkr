import { formattedNumberOfInteractions } from "../../../utils/PostsUtils";
import { getPostComments } from "../../../service/service";
import PostContext from "../../../contexts/PostContext";
import UserContext from "../../../contexts/UserContext";

import styled from "styled-components";
import { AiOutlineComment } from "react-icons/ai";
import { useContext} from "react";


export default function CommentsButton() {
    const { 
        id,
        showComments,
        setShowComments,
        commentCount,
        setComments
    } = useContext(PostContext);
    const { login } = useContext(UserContext);
    
    return (
        <Wrapper>
            <CommentsBubble onClick={() => { 
                if(!showComments) {getPostComments(login.token, id, setComments)};
                setShowComments(!showComments) }} />
            <p>{formattedNumberOfInteractions(commentCount ? commentCount : 0, "comment")}</p>
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