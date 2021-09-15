import styled from "styled-components";
import { TiPencil, TiTrash } from "react-icons/ti";
import { AiOutlineHeart, AiTwotoneHeart } from "react-icons/ai";

export default function Post({text, user, likes}) {
    const isLiked = true;
    return (
        <Wrapper>
            <ProfileImgAndLikeButton>
                <img src = { user.avatar } alt = {user.username} />
                {isLiked ? <LikedHeart /> : <NotLikedHeart />}
                <p>{ likesText(likes.length) }</p>
            </ProfileImgAndLikeButton>
            <PostContent>
                <Header>
                    {user.username}
                    <IconButton right = {"25px"}>
                        <TiPencil />
                    </IconButton>
                    <IconButton right = {"0px"}>
                        <TiTrash />
                    </IconButton>
                </Header>
                <Description>
                    {text}
                </Description>
                <LinkBox />
            </PostContent>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    width: 100%;
    border-radius: 16px;
    background-color: #171717;
    padding: 18px;
    margin-bottom: 20px;
    display: flex;
    font-family: 'Lato', sans-serif;
    &:last-child {
        margin-bottom: 0px;
    }
`

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
`
const LikedHeart = styled(AiTwotoneHeart)`
font-size: 20px;
color: #AC0000;
margin-bottom: 6px;
`

const NotLikedHeart = styled(AiOutlineHeart)`
font-size: 20px;
color: #FFFFFF;
margin-bottom: 6px;
`

const PostContent = styled.div`
    width: 100%;
`

const Header = styled.div`
    font-size: 19px;
    line-height: 25px;
    font-weight: 400;
    color: #FFFFFF;
    position: relative;
`

const IconButton = styled.button`
    font-size: 14px;
    color: #FFFFFF;
    position: absolute;
    right: ${ ({right}) => right };
    top: 0;
`

const Description = styled.p`
    font-size: 18px;
    color: #B7B7B7;
    display: inline-block;
    margin: 8px 0px;
`

const LinkBox = styled.div`
    width: 100%;
    height: 155px;
    border: 1px solid #C4C4C4;
    border-radius: 11px;

`

function likesText(numberOfLikes) {
    return `${numberOfLikes} ${numberOfLikes > 1 ? "likes" : "like"}`
}