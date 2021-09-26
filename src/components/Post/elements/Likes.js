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
    const { likes, id, repostId, hasUserLiked, setInteractedPostId } = useContext(PostContext);
    const { setIsDataBeingEvaluated } = useContext(DataEvaluationContext);
    const [ wasThisPostClicked, setWasThisPostClicked ] = useState(false);
    const [ isLiked, setIsLiked ] = useState(hasUserLiked);
    const whichButtonIsShown = (wasThisPostClicked ? isLiked : hasUserLiked)

    useEffect( () => {
        setWasThisPostClicked(false);
    },[hasUserLiked] )

    return (
        <Wrapper>
                <button
                    disabled = {wasThisPostClicked}
                    onClick={() => likePostHelper( setInteractedPostId, hasUserLiked, setIsLiked, login.token, id, repostId, setIsDataBeingEvaluated, setWasThisPostClicked)}
                >
                    {whichButtonIsShown ? <LikedHeart /> : <NotLikedHeart />} 
                </button>
            <TextAndTooltip data-tip={getTooltipText(likes, hasUserLiked, login.user.id, wasThisPostClicked)}>
                { formattedNumberOfInteractions(likes.length, "like", wasThisPostClicked, isLiked) }
                <ReactTooltip 
                    place="bottom"
                    effect="solid"
                    textColor="#505050"
                    backgroundColor="#FFFFFFE5"
                    wrapper="span"
                />
            </TextAndTooltip>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
    @media(max-width: 637px) {
        margin-bottom: 17px;
    }
`

const TextAndTooltip = styled.p`
    font-size: 11px;
    font-weight: 400;
    color: #FFFFFF;
    text-align: center;
    & span {
        font-weight: 700;
    }
`

const LikedHeart = styled(AiTwotoneHeart)`
    font-size: 20px;
    color: #AC0000;
    margin-bottom: 4px;
    cursor: pointer;

    @media(max-width: 637px) {
        font-size: 17px;
    }
`;

const NotLikedHeart = styled(AiOutlineHeart)`
    font-size: 20px;
    color: #FFFFFF;
    margin-bottom: 4px;
    cursor: pointer;

    @media(max-width: 637px) {
        font-size: 17px;
    }
`;