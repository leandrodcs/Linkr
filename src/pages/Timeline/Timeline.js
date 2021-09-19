import Container from "../../components/Container";
import PageTitle from "../../components/PageTitle";
import Trending from "../../components/Trending";
import Loading from "../../components/Loading";
import PublishingBox from "./elements/PublishingBox";

import { getTimelinePosts } from "../../service/service";
import { PrintedPosts } from "../../utils/PostsUtils";
import UserContext from "../../contexts/UserContext";
import DataEvaluationContext from "../../contexts/DataEvaluationContext";

import { useContext, useEffect, useState } from "react";
import styled from "styled-components";

export default function Timeline() {
    const [posts, setPosts] = useState("");
    const { login } = useContext(UserContext);
    const { isDataBeingEvaluated } = useContext(DataEvaluationContext);

    useEffect(() => {
        if(login.token) {
            getTimelinePosts(login.token, setPosts)
        }
    },[login,isDataBeingEvaluated]);

    if(!posts) {
        return (
            <Container>
                <Loading />
                <Trending />
            </Container>
        );
    }
    window.scrollTo(0,0);

    return (
        <Container>
            <Wrapper>
                <PageTitle text = "timeline" />
                <PublishingBox />
                { PrintedPosts(posts) }
            </Wrapper>
            <Trending />
        </Container>
    );
}

const Wrapper = styled.section`
    width: 611px;
    color: #FFF;
    font-family: 'Lato', sans-serif;
    font-weight: 700;
    @media(max-width: 637px) {
        width: 100%;
    }
`;

