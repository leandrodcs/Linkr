import Loading from "../../components/Loading";
import Container from "../../components/Container";
import PageTitle from "../../components/PageTitle";
import Trending from "../../components/Trending";
import Post from "../../components/Post/Post";

import DataEvaluationContext from "../../contexts/DataEvaluationContext";
import UserContext from "../../contexts/UserContext";
import {getUserPosts} from "../../service/service";

import { useEffect, useState, useContext } from "react";
import styled from "styled-components";

export default function MyPosts() {
    const {login} = useContext(UserContext);
    const [userPosts, setUserPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const {isDataBeingEvaluated} = useContext(DataEvaluationContext)

    useEffect(() => {
        getUserPosts(login.token, login.user.id, setUserPosts, setLoading)
    }, [login.token, login.user.id, isDataBeingEvaluated]);

    if(true) {
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
                <PageTitle text = "my posts" />
                {userPosts.length ?
                userPosts.map(post => <Post key ={post.id} post={post}/>) :
                <p>Você ainda não criou nenhum post!</p>}
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