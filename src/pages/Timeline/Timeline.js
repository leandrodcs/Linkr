import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Container from "../../components/Container";
import Trending from "../../components/Trending";
import Post from "../../components/Post/Post";
import PageTitle from "../../components/PageTitle";
import Loading from "../../components/Loading";
import { getTimelinePosts } from "../../service/service";
import PublishingBox from "./Elements/PublishingBox";
import { useHistory } from "react-router";
import UserContext from "../../contexts/UserContext";

export default function Timeline() {
    const [posts, setPosts] = useState("");
    const { login } = useContext(UserContext);
    const browsingHistory = useHistory();

    useEffect(() => {
        getTimelinePosts(login.token, setPosts, browsingHistory)
    },[]);

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