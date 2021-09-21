import { formattedNumberOfInteractions } from "../../../utils/PostsUtils";
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
        <Wrapper>
            {isLiked ?
                <LikedHeart 
                    onClick={() => likePostHelper(isLiked, setIsLiked, login.token, id, setPostLikes)}
                /> :
                <NotLikedHeart
                    onClick={() => likePostHelper(isLiked, setIsLiked, login.token, id, setPostLikes)}
                />
            }
            <p data-tip={getTooltipText(postLikes, isLiked, login.user.id)}>
                { formattedNumberOfInteractions(postLikes.length, "like") }
            </p>
            <ReactTooltip 
                place="bottom"
                effect="solid"
                textColor="#505050"
                backgroundColor="#FFFFFFE5"
                wrapper="span"
            />
        </Wrapper>
    );
}

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
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
        & p {
            font-size: 11px;
        }
    }
`

const LikedHeart = styled(AiTwotoneHeart)`
    font-size: 16px;
    color: #AC0000;
    margin: 20px 0px 6px;
    cursor: pointer;

    @media(max-width: 637px) {
        font-size: 14px;
        margin: 20px 0px 12px;
    }
`;

const NotLikedHeart = styled(AiOutlineHeart)`
    font-size: 16px;
    color: #FFFFFF;
    margin: 20px 0px 6px;
    cursor: pointer;

    @media(max-width: 637px) {
        font-size: 14px;
        margin: 20px 0px 12px;
    }
`;