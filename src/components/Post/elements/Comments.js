import PostContext from "../../../contexts/PostContext";
import Comment from "./Comment";

import { useContext } from "react";
import styled from "styled-components";


export default function Comments() {
    const { comments } = useContext(PostContext);

    return (
        <Wrapper>
            {comments.map(comment => <Comment comment={comment}/>)}
        </Wrapper>
    );
}

const Wrapper = styled.div`
    padding: 0px 20px;
`;