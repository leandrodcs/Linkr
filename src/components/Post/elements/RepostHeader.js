import PostContext from "../../../contexts/PostContext";
import UserContext from "../../../contexts/UserContext";

import styled from "styled-components";
import { FaRetweet } from "react-icons/fa";
import { useContext } from "react";
import { Link } from "react-router-dom";


export default function RepostHeader() {
    const { repostedBy } = useContext(PostContext);
    const { login } = useContext(UserContext);

    if (!repostedBy) { return (""); };

    const repostRoute = (repostedBy.id === Number(login.user.id) ? "/my-posts" : `/user/${repostedBy.id}`);

    return (
        <Wrapper>
            <Reposted />
            <span>Re-posted by <Link to={ repostRoute }> {repostedBy.username} </Link> </span>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    width: 100%;
    height: 33px;
    padding-left: 13px;
    display: flex;
    align-items: center;
    background-color: #1E1E1E;
    border-radius: 16px 16px 0px 0px;
    
    & span {
        max-width: 85%;
        overflow:hidden;
        font-size: 13px;
        font-weight: 400;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    & a:hover {
        text-decoration: underline;
    }

    @media(max-width: 637px) {
        border-radius: 0px;
    }
`

const Reposted = styled(FaRetweet)`
    font-size: 18px;
    font-weight: 700;
    color: #FFF;
    margin-right: 4px;

    @media(max-width: 637px) {
        font-size: 17px;
    }
`;