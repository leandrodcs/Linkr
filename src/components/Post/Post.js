import styled from "styled-components";
import ProfileImgAndLikeButton from "./Elements/ProfileImgAndLikeButton";
import PostBox from "./Elements/PostBox";
import PostContext from "../../contexts/PostContext";

export default function Post({post:{ id, text, link, linkTitle, linkDescription, linkImage, user, likes}}) {

    return (
        <PostContext.Provider value = {{ id, text, link, linkTitle, linkDescription, linkImage, user, likes }}>
            <Wrapper>
                <ProfileImgAndLikeButton />
                <PostBox />
            </Wrapper>
        </PostContext.Provider>
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
    @media(max-width: 937px) {
        border-radius: 0px;
        padding: 15px;
    }
`