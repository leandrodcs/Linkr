import { useEffect, useState, useContext } from "react";
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
import UserContext from "../../contexts/UserContext";

export default function MyPosts() {
    const {user} = useContext(UserContext);
    const [userPosts, setUserPosts] = useState(MockPosts.posts);

    useEffect(() => {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        }
        axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/users/${user.user.id}/posts`, config)
        .then(res => {
          console.log(res);
          //setUserPosts(res.data);
        })
        .catch(err => alert(err));
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