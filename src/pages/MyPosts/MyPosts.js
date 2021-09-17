import Loading from "../../components/Loading";
import Container from "../../components/Container";
import PageTitle from "../../components/PageTitle";
import Trending from "../../components/Trending";
import Post from "../../components/Post/Post";

import UserContext from "../../contexts/UserContext";
import {getUserPosts} from "../../service/service";

import { useEffect, useState, useContext } from "react";
import styled from "styled-components";

export default function MyPosts() {
    const {login} = useContext(UserContext);
    const [userPosts, setUserPosts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        getUserPosts(login.token, login.user.id, setUserPosts, setLoading)
    }, [login.token, login.user.id]);

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
            <Wrapper>
                <PageTitle text = "my posts" />
                {userPosts.length ?
                userPosts.map(post => <Post key ={post.id} post={post}/>) :
                <EmptyMsg>Você ainda não criou nenhum post!</EmptyMsg>}
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