import styled from "styled-components";
import { AiOutlineHeart, AiTwotoneHeart } from "react-icons/ai";

const LikedHeart = styled(AiTwotoneHeart)`
    font-size: 20px;
    color: #AC0000;
    margin-bottom: 6px;
`;

const NotLikedHeart = styled(AiOutlineHeart)`
    font-size: 20px;
    color: #FFFFFF;
    margin-bottom: 6px;
`;

export {
    LikedHeart,
    NotLikedHeart
};