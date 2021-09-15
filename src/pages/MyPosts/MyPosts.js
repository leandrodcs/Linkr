import Loading from "../../components/Loading";
import Header from "../../components/Header/Header";
import Container from "../../components/Container";
import PageTitle from "../../components/PageTitle";
import Trending from "../../components/Trending";
import Post from "../../components/Post/Post";

import UserContext from "../../contexts/UserContext";
import {getUserPosts} from "../../service/service";

import { useEffect, useState, useContext } from "react";
import styled from "styled-components";

export default function MyPosts() {
    const {user} = useContext(UserContext);
    const [userPosts, setUserPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    console.log(user);

    useEffect(() => {
        setLoading(true);
        getUserPosts(user.token, user.user.id, setUserPosts, setLoading)
      }, [user.token, user.user.id]);
      console.log(userPosts);

    if(loading) {
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
                {userPosts.length ?
                userPosts.map( ({id, text, user, likes}) => <Post key={id} text={text} user={user} likes={likes}/>) :
                <EmptyMsg>Você ainda não criou nenhum post!</EmptyMsg>
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

const EmptyMsg = styled.p`
    font-family: 'Lato', sans-serif;
    font-size: 20px;
    color: #151515;
`;