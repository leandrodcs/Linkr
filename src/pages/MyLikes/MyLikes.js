import Loading from "../../components/Loading/Loading";
import Container from "../../components/Container/Container";
import PageTitle from "../../components/PageTitle/PageTitle";
import Trending from "../../components/Trending/Trending";
import Header from "../../components/Header/Header";

import UserContext from "../../contexts/UserContext";
import DataEvaluationContext from "../../contexts/DataEvaluationContext";
import TransitionContext from "../../contexts/TransitionContext";
import {getUserLikes} from "../../service/service";
import { PrintedPosts } from "../../utils/PostsUtils";

import { useEffect, useState, useContext } from "react";
import styled from "styled-components";


export default function MyLikes() {
    const {login} = useContext(UserContext);
    const { isTransitioning } = useContext(TransitionContext);
    const [userLikes, setUserLikes] = useState([]);
    const [loading, setLoading] = useState(true);
    const { isDataBeingEvaluated } = useContext(DataEvaluationContext);
    const [interactedPostId, setInteractedPostId] = useState(0);

    useEffect(() => {window.scrollTo(0,0)}, []);

    useEffect(() => {
        getUserLikes(setLoading, login.token, setUserLikes);
    }, [login.token, isDataBeingEvaluated]);

    if(!interactedPostId && loading) {
        return (
            <Container>
                <Header />
                <Loading />
            </Container>
        );
    }

    if(isTransitioning || !login.token) {
        return (
            <Container>
                <Header />
            </Container>
        );
    }
    
    return (
        <Container>
            <Header />
            <Wrapper>
                <PageTitle text = "my likes" />
                {PrintedPosts(userLikes, "Você ainda não curtiu nenhum post!", login.user.id, setInteractedPostId)}
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

    .infinite-scroll-component::-webkit-scrollbar {
        display: none;
    }

    @media(max-width: 637px) {
        width: 100%;
    }
`;