import styled from "styled-components";
import { Link } from "react-router-dom";
import { TiPencil, TiTrash } from "react-icons/ti";
import { useContext } from "react";
import PostContext from "../../../contexts/PostContext";

export default function PostHeader() {
    const { id, user } = useContext(PostContext);
    return (
        <Wrapper>
        <Link to={`/user/${id}`}>
            {user.username}
        </Link>
        <IconButton right = {"25px"}>
            <TiPencil />
        </IconButton>
        <IconButton right = {"0px"}>
            <TiTrash />
        </IconButton>
    </Wrapper>
    );
}

const Wrapper = styled.div`
    font-size: 19px;
    line-height: 25px;
    font-weight: 400;
    color: #FFFFFF;
    position: relative;
`

const IconButton = styled.button`
    font-size: 14px;
    color: #FFFFFF;
    position: absolute;
    right: ${ ({right}) => right };
    top: 0;
`