import { formattedNumberOfLikes } from "../../../utils/PostsUtils";
import { isLikedByUser, Like } from "../../../utils/LikeUtils";
import PostContext from "../../../contexts/PostContext";
import UserContext from "../../../contexts/UserContext";

import styled from "styled-components";
import { AiOutlineHeart, AiTwotoneHeart } from "react-icons/ai";
import { useContext, useState } from "react/cjs/react.development";

export default function Likes() {
    const { login } = useContext(UserContext);
    const { likes, id } = useContext(PostContext);
    const [postLikes, setPostLikes] = useState(likes);
    const [isLiked, setIsLiked] = useState(() => isLikedByUser(likes, login.user.id));

    return (
        <>
            {isLiked ?
                <LikedHeart 
                    onClick={() => Like(isLiked, setIsLiked, login.token, id, setPostLikes)}
                />
                :
                <NotLikedHeart
                    onClick={() => Like(isLiked, setIsLiked, login.token, id, setPostLikes)}
                />
            }
            <p>{ formattedNumberOfLikes(postLikes.length) }</p>
        </>
    );
}

const LikedHeart = styled(AiTwotoneHeart)`
    font-size: 20px;
    color: #AC0000;
    margin-bottom: 6px;

    @media(max-width: 937px) {
        font-size: 17px;
        margin-bottom: 12px;
    }
`;

const NotLikedHeart = styled(AiOutlineHeart)`
    font-size: 20px;
    color: #FFFFFF;
    margin-bottom: 6px;

    @media(max-width: 937px) {
        font-size: 17px;
        margin-bottom: 12px;
    }
`;