import Loading from "../../components/Loading";
import Container from "../../components/Container";
import Header from "../../components/Header/Header";
import PageTitle from "../../components/PageTitle";
import Trending from "../../components/Trending";
import Post from "../../components/Post/Post";

import MockPosts from "../../temp_mocks/mock_posts";

import { useState } from "react";
import styled from "styled-components";

export default function Timeline() {
    const [posts] = useState(MockPosts.posts);

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
            <Header />
            <Wrapper>
                <PageTitle text = "timeline" />
                { posts.map( ({id, text, user, likes}) => 
                    <Post 
                        key = {id}
                        text = {text}
                        user = {user}
                        likes = {likes}
                    />)
                }
            </Wrapper>
            <Trending />
        </Container>
    );
}

const Wrapper = styled.section`
    width: 611px;
    
    @media(max-width: 937px) {
        width: 100%;
    }
`