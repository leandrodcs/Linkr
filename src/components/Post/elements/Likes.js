import { formattedNumberOfInteractions } from "../../../utils/PostsUtils";
import { likePostHelper, getTooltipText } from "../../../utils/LikeUtils";
import PostContext from "../../../contexts/PostContext";
import UserContext from "../../../contexts/UserContext";
import DataEvaluationContext from "../../../contexts/DataEvaluationContext";

import ReactTooltip from 'react-tooltip';
import styled from "styled-components";
import { AiOutlineHeart, AiTwotoneHeart } from "react-icons/ai";
import { useContext, useEffect, useState } from "react";

export default function Likes() {
    const { login } = useContext(UserContext);
    const { likes, id, hasUserLiked } = useContext(PostContext);
    const { setIsDataBeingEvaluated } = useContext(DataEvaluationContext);
    const [ wasThisPostClicked, setWasThisPostClicked ] = useState(false);
    const [ isLiked, setIsLiked ] = useState(hasUserLiked);

    useEffect( () => {
        setWasThisPostClicked(false)
    },[likes] )
    
    return (
        <Wrapper>
            { (wasThisPostClicked ? isLiked : hasUserLiked) ?
                <LikedHeart 
                    onClick={() => likePostHelper(setWasThisPostClicked, hasUserLiked, setIsLiked, login.token, id, setIsDataBeingEvaluated)}
                /> :
                <NotLikedHeart
                    onClick={() => likePostHelper(setWasThisPostClicked, hasUserLiked, setIsLiked, login.token, id, setIsDataBeingEvaluated)}
                />
            }
            <p data-tip={getTooltipText(likes, hasUserLiked, login.user.id)}>
                { formattedNumberOfInteractions(likes.length, "like") }
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