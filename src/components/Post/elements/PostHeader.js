import PostContext from "../../../contexts/PostContext";
import UserContext from "../../../contexts/UserContext";
import DataEvaluationContext from "../../../contexts/DataEvaluationContext";
import Modal from "../../Modals/DeleteModal";

import { isUsersOriginalPost, isUsersRepost } from "../../../utils/PostsUtils";

import styled from "styled-components";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { RiPencilFill } from "react-icons/ri";
import { useContext, useState } from "react";

export default function PostHeader({setIsEditing, isEditing, cancelEditing, setEditedMsg}) {
    const {isDataBeingEvaluated} = useContext(DataEvaluationContext)
    const { user, text, repostedBy } = useContext(PostContext);
    const {login} = useContext(UserContext);
    const [openModal, setOpenModal] = useState(false);
    const imageRoute = user.id === Number(login.user.id) ? "my-posts" : `/user/${user.id}`;

    return (
        <Wrapper>
            <Link to={imageRoute}>
                <span>{user.username}</span>
            </Link>
            {isUsersOriginalPost(repostedBy, login.user.id, user.id) ? 
                <IconButton right = {"25px"} onClick={() => isEditing ? cancelEditing(isEditing, text, setIsEditing, setEditedMsg) : setIsEditing(!isEditing)} disabled={isDataBeingEvaluated}>
                    <RiPencilFill />
                </IconButton>
                : ""
            }
            { isUsersOriginalPost(repostedBy, login.user.id, user.id) || isUsersRepost(repostedBy, login.user.id) ?
                <IconButton right = {"0px"} onClick={() => setOpenModal(true)} disabled={isDataBeingEvaluated}>
                    <FaTrash />
                </IconButton>
            : ""
            }
            {openModal ? <Modal setOpenModal={setOpenModal} /> : ""}
        </Wrapper>
    );
}

const Wrapper = styled.div`
    width: 100%;
    font-size: 19px;
    line-height: 25px;
    font-weight: 400;
    display: flex;
    align-items: center;
    color: #FFFFFF;
    position: relative;
    & a {
            max-width: calc( 100% - 50px );;
            overflow-x: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
    @media(max-width: 637px) {
        font-size: 17px;
        line-height: 20px;
    }
`;

const IconButton = styled.button`
    font-size: 18px;
    color: #FFFFFF;
    position: absolute;
    right: ${ ({right}) => right };
    top: 0;
    cursor: pointer;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    :nth-child(2):hover {
        color: #1877F2;
    }
    :nth-child(3):hover {
        color: red;
    }

    @media(max-width: 637px) {
        font-size: 15px;
    }
`;

