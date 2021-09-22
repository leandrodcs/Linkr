import PostContext from "../../../contexts/PostContext";
import UserContext from "../../../contexts/UserContext";
import DataEvaluationContext from "../../../contexts/DataEvaluationContext";
import Modal from "../../Modals/DeleteModal";
import LocationModal from "../../Modals/LocationModal";

import { isUsersOriginalPost, isUsersRepost } from "../../../utils/PostsUtils";

import styled from "styled-components";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { RiPencilFill } from "react-icons/ri";
import { IoMdPin } from "react-icons/io";
import { useContext, useState } from "react";



export default function PostHeader({setIsEditing, isEditing, cancelEditing, setEditedMsg}) {
    const {isDataBeingEvaluated} = useContext(DataEvaluationContext)
    const { user, text, repostedBy, geolocation } = useContext(PostContext);
    const {login} = useContext(UserContext);
    const [openModal, setOpenModal] = useState(false);
    const [showLocation, setShowLocation] = useState(false);
    const imageRoute = user.id === Number(login.user.id) ? "my-posts" : `/user/${user.id}`;

    return (
        <Wrapper>
            <Link to={imageRoute}>
                {user.username}
            </Link>
            {geolocation &&
            <GeoButton onClick={() => setShowLocation(true)}>
                <IoMdPin />
            </GeoButton>
            }
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
            <Modal openModal={openModal} setOpenModal={setOpenModal} />
            <LocationModal openModal={showLocation} setOpenModal={setShowLocation} geolocation={geolocation} />
        </Wrapper>
    );
}

const GeoButton = styled.button`
    color: #FFF;
    margin-left: 8px;
    cursor: pointer;
`;

const Wrapper = styled.div`
    font-size: 19px;
    line-height: 25px;
    font-weight: 400;
    color: #FFFFFF;
    position: relative;
    & a {
            display: inline-block;
            max-width: 85%;
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

