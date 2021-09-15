import styled from "styled-components";
import { TiPencil, TiTrash } from "react-icons/ti";
import { AiOutlineHeart, AiTwotoneHeart } from "react-icons/ai";
import { Link } from "react-router-dom";
import {TextWithHighlightedHashtags, CheckTextSizeAndReduceItIfNeeded} from "../utils/TextAdjustmentsUtils";
import { formattedNumberOfLikes, OpenLinkInNewPage } from "../utils/PostsUtils";


export default function Post({post:{ id, text, link, linkTitle, linkDescription, linkImage, user, likes}}) {
    const hasUserLikedThisPost = false;
    return (
        <Wrapper>
            <ProfileImgAndLikeButton>
                <Link to={`/user/${id}`}>
                    <img src = { user.avatar } alt = {user.username} />
                </Link>
                {hasUserLikedThisPost ? <LikedHeart /> : <NotLikedHeart />}
                <p>{ formattedNumberOfLikes(likes.length) }</p>
            </ProfileImgAndLikeButton>
            <PostContent>
                <Header>
                    <Link to={`/user/${id}`}>
                        {user.username}
                    </Link>
                    <IconButton right = {"25px"}>
                        <TiPencil />
                    </IconButton>
                    <IconButton right = {"0px"}>
                        <TiTrash />
                    </IconButton>
                </Header>
                <TextWithHighlightedHashtags 
                    text = {text}
                    MainStyledComponent = {Description}
                    HashtagStyledComponent = {Hashtag}
                />
                <LinkBox onClick = {() => OpenLinkInNewPage(link)}>
                    <LinkBoxContent>
                        <LinkTitle>{CheckTextSizeAndReduceItIfNeeded(linkTitle,60)}</LinkTitle>
                        <LinkDescription>{CheckTextSizeAndReduceItIfNeeded(linkDescription,160)}</LinkDescription>
                        <LinkUrl>{link}</LinkUrl>
                    </LinkBoxContent>
                    <img src = {linkImage} alt = "link" />
                </LinkBox>
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

const Description = styled.span`
    font-size: 18px;
    color: #B7B7B7;
    display: inline-block;
    margin: 8px 0px;
`

const Hashtag = styled.p`
    font-size: 18px;
    font-weight: 700;
    color: #FAFAFA;
    display: inline-block;
    margin: 8px 0px;
`

const LinkBox = styled.div`
    width: 100%;
    border: 1px solid #C4C4C4;
    border-radius: 11px;
    display: flex;
    justify-content: space-between;
    cursor: pointer;
    & img {
        width: 150px;
        height: 150px;
        object-fit: cover;
        border-radius: 0px 11px 11px 0px;
    }
`

const LinkBoxContent = styled.div`
    width: 100%;
    padding: 16px;
    font-weight: 400;
    color: #CECECE;
`

const LinkTitle = styled.p`
    font-size: 16px;
    line-height: 20px;
`

const LinkDescription = styled.p`
    font-size: 11px;
    line-height: 14px;
    color: #9B9595;
    display: inline-block;
    margin: 5px 0px 13px;
`

const LinkUrl = styled.p`
    font-size: 11px;
    line-height: 14px;
`