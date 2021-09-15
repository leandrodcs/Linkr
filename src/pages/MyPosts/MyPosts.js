import { useEffect, useState } from "react";
import styled from "styled-components";
import Container from "../../components/Container";
import Trending from "../../components/Trending";
import Post from "../../components/Post";
import PageTitle from "../../components/PageTitle";
import Loading from "../../components/Loading";
import MockPosts from "../../temp_mocks/mock_posts";
import Header from "../../components/Header";
import user from "../../temp_mocks/mock_otherUser";
import axios from "axios";


export default function MyPosts() {
    const [userPosts, setUserPosts] = useState(MockPosts.posts);
    const token = "37262632-0377-4e35-88df-debb5bcf32da";

    useEffect(() => {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
        axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/users/${user.id}`, config)
        .then(res => {
          console.log(res);
          setUserPosts(res.data);
        })
        .catch(err => console.log);
      }, []);

    if(!userPosts) {
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
                {userPosts.map( ({id, text, user, likes}) => 
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