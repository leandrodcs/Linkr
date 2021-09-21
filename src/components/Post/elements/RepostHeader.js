import PostContext from "../../../contexts/PostContext";

import styled from "styled-components";
import { FaRetweet } from "react-icons/fa";
import { useContext } from "react";
import { Link } from "react-router-dom";

export default function RepostHeader() {
    const { repostedBy } = useContext(PostContext);
    if (!repostedBy) { return (""); };

    return (
        <Wrapper>
            <Reposted />
            <Link to={`/user/${ repostedBy.id }`}>
                <span>{`Re-posted by ${repostedBy.username}`}</span>
            </Link>
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
        font-size: 13px;
        font-weight: 400;
    }
`

const Reposted = styled(FaRetweet)`
    font-size: 18px;
    font-weight: 700;
    color: #FFF;
    margin-right: 4px;

    @media(max-width: 637px) {
        font-size: 17px;
        margin: 20px 0px 12px;
    }
`;