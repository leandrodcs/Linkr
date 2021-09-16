import PostContext from "../../../contexts/PostContext";
import UserContext from "../../../contexts/UserContext";

import {deletePost} from "../../../service/service";

import styled from "styled-components";
import { Link } from "react-router-dom";
import { TiPencil, TiTrash } from "react-icons/ti";
import { useContext } from "react";
import axios from "axios";

export default function PostHeader() {
    const { id, user } = useContext(PostContext);
    const {login} = useContext(UserContext);

    return (
        <Wrapper>
            <Link to={`/user/${id}`}>
                {user.username}
            </Link>
            {(login.user.id == user.id) ? 
                <>
                    <IconButton right = {"25px"}>
                        <TiPencil />
                    </IconButton>
                    <IconButton right = {"0px"} onClick={() => deletePost(login.token, id)}>
                        <TiTrash />
                    </IconButton>
                </>
            : ""}
        </Wrapper>
    );
}

const Wrapper = styled.div`
    font-size: 19px;
    line-height: 25px;
    font-weight: 400;
    color: #FFFFFF;
    position: relative;
    & a {
            display: inline-block;
            width: 85%;
        }
    @media(max-width: 937px) {
        font-size: 17px;
        line-height: 20px;
    }
`;

const IconButton = styled.button`
    font-size: 14px;
    color: #FFFFFF;
    position: absolute;
    right: ${ ({right}) => right };
    top: 0;
    cursor: pointer;
`;