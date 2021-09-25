import Loading from "../../components/Loading/Loading";
import Container from "../../components/Container/Container";
import PageTitle from "../../components/PageTitle/PageTitle";
import Trending from "../../components/Trending/Trending";
import Header from "../../components/Header/Header";

import DataEvaluationContext from "../../contexts/DataEvaluationContext";
import UserContext from "../../contexts/UserContext";
import TransitionContext from "../../contexts/TransitionContext";
import {getUserPosts} from "../../service/service";
import { PrintedPosts } from "../../utils/PostsUtils";

import { useEffect, useState, useContext, useRef } from "react";
import styled from "styled-components";

export default function MyPosts() {
    const {login} = useContext(UserContext);
    const { isTransitioning } = useContext(TransitionContext);
    const [userPosts, setUserPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const {isDataBeingEvaluated} = useContext(DataEvaluationContext);
    const isMountedRef = useRef(null);

    useEffect(() => {
        isMountedRef.current = true;
        if(login.token) {
            getUserPosts(login.token, login.user.id, setUserPosts, setLoading, isMountedRef);
        }
        return () => isMountedRef.current = false;
    }, [login, isDataBeingEvaluated]);

    if(loading || !userPosts.length || !login.user || isTransitioning) {
        return (
            <Container>
                <Header />
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
                { PrintedPosts(userPosts, "Você ainda não criou nenhum post!", login.user.id) }
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