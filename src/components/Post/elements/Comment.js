import UserContext from "../../../contexts/UserContext";
import PostContext from "../../../contexts/PostContext";

import { useContext } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

export default function Comment({comment}) {
    console.log(comment)
    const { login, followingList } = useContext(UserContext);
    const { id, user } = useContext(PostContext);
    const userRoute = comment.user.id === Number(login.user.id) ? "my-posts" : `/user/${comment.user.id}`;
    const isFollowing = (followingList.filter(following => following.id === comment.user.id).length > 0);
    const isAuthor = (user.id === comment.user.id);

    return (
        <Wrapper>
            <StyledComment>
                <Link to={userRoute} ><img src={comment.user.avatar} /></Link>
                <div>
                    <Link to={userRoute} >
                        <h1>{comment.user.username}</h1>
                        {isAuthor ?
                            <h2> • post's author</h2>
                            : (isFollowing ?
                                <h2> • following</h2>
                                :
                                ""
                            )
                        }
                    </Link>
                    <p>{comment.text}</p>
                </div>
            </StyledComment>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    padding: 16px 6px;
    border-bottom: 1px solid #353535;
    & img {
        width: 38px;
        height: 38px;
        border-radius: 38px;
    }
`;

const StyledComment = styled.div`
    display: flex;
    & h1 {
        font-family: Lato;
        font-size: 14px;
        font-weight: 700;
        color: #F3F3F3;
        margin-left: 18px;
    }
    & h2 {
        font-family: Lato;
        font-size: 14px;
        font-weight: 400;
        color: #565656;
        margin-left: 4px;
    }
    & p{
        font-family: Lato;
        font-size: 14px;
        font-weight: 400;
        color: #ACACAC;
        margin: 4px 18px;
    }
    & a {
        display: flex;
    }
`;