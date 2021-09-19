import { formattedNumberOfLikes } from "../../../utils/PostsUtils";
import { isLikedByUser, likePostHelper, getTooltipText } from "../../../utils/LikeUtils";
import PostContext from "../../../contexts/PostContext";
import UserContext from "../../../contexts/UserContext";

import ReactTooltip from 'react-tooltip';
import styled from "styled-components";
import { AiOutlineHeart, AiTwotoneHeart } from "react-icons/ai";
import { useContext, useState } from "react";

export default function Likes() {
    const { login } = useContext(UserContext);
    const { likes, id } = useContext(PostContext);
    const [postLikes, setPostLikes] = useState(likes);
    const [isLiked, setIsLiked] = useState(() => isLikedByUser(likes, login.user.id));

    return (
        <>
            {isLiked ?
                <LikedHeart 
                    onClick={() => likePostHelper(isLiked, setIsLiked, login.token, id, setPostLikes)}
                /> :
                <NotLikedHeart
                    onClick={() => likePostHelper(isLiked, setIsLiked, login.token, id, setPostLikes)}
                />
            }
            <p data-tip={getTooltipText(postLikes, isLiked, login.user.id)}>
                { formattedNumberOfLikes(postLikes.length) }
            </p>
            <ReactTooltip 
                place="bottom"
                effect="solid"
                textColor="#505050"
                backgroundColor="#FFFFFFE5"
                wrapper="span"
            />
        </>
    );
}

const LikedHeart = styled(AiTwotoneHeart)`
    font-size: 20px;
    color: #AC0000;
    margin-bottom: 6px;

    @media(max-width: 637px) {
        font-size: 17px;
        margin-bottom: 12px;
    }
`;

const NotLikedHeart = styled(AiOutlineHeart)`
    font-size: 20px;
    color: #FFFFFF;
    margin-bottom: 6px;

    @media(max-width: 637px) {
        font-size: 17px;
        margin-bottom: 12px;
    }
`;