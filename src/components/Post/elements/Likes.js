import { formattedNumberOfLikes } from "../../../utils/PostsUtils";
import { Like } from "../../../utils/LikeUtils";
import PostContext from "../../../contexts/PostContext";
import UserContext from "../../../contexts/UserContext";

import styled from "styled-components";
import { AiOutlineHeart, AiTwotoneHeart } from "react-icons/ai";
import { useContext, useState } from "react/cjs/react.development";

export default function Likes() {
    const { likes, id } = useContext(PostContext);
    const { login } = useContext(UserContext);
    const [isLiked, setIsLiked] = useState(false);

    return (
        <>
            {isLiked ?
                <LikedHeart onClick={() => Like(isLiked, setIsLiked, login.token, id, likes)} />
                :
                <NotLikedHeart onClick={() => Like(isLiked, setIsLiked, login.token, id, likes)} />
            }
            <p>{ formattedNumberOfLikes(likes.length) }</p>
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