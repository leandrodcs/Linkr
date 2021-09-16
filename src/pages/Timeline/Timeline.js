import Container from "../../components/Container";
import Trending from "../../components/Trending";
import Post from "../../components/Post/Post";
import PageTitle from "../../components/PageTitle";
import Loading from "../../components/Loading";
import PublishingBox from "./elements/PublishingBox";

import { getTimelinePosts } from "../../service/service";
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
    @media(max-width: 937px) {
        width: 100%;
    }
`

function PrintedPosts(posts) {
    return (
        posts.length ? posts.map( (post) => 
            <Post 
                key = { post.id }
                post = { post }
            />)
            : <p> Nenhum post encontrado </p>
    );
}