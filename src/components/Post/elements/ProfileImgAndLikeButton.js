import styled from "styled-components";

const ProfileImgAndLikeButton = styled.div`
    margin-right: 18px;
    display: flex;
    flex-direction: column;
    align-items: center;

    & img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        margin-bottom: 20px;
        object-fit: cover;
    }

    & p {
        font-size: 14px;
        font-weight: 400;
        color: #FFFFFF;
    }
`;

export default ProfileImgAndLikeButton;