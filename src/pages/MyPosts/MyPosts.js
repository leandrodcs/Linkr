import { useState } from "react";
import styled from "styled-components";
import Container from "../../components/Container";
import Trending from "../../components/Trending";
import Post from "../../components/Post";
import PageTitle from "../../components/PageTitle";
import Loading from "../../components/Loading";
import MockPosts from "../../temp_mocks/mock_posts";
import Header from "../../components/Header";

export default function MyPosts() {
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
                <PageTitle text = "my posts" />
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
`;