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
import { SetInterval } from "../../utils/helpers/Intervals";

import { useEffect, useState, useContext, useRef } from "react";
import styled from "styled-components";

export default function MyLikes() {
    const {login} = useContext(UserContext);
    const { isTransitioning } = useContext(TransitionContext);
    const [userLikes, setUserLikes] = useState([]);
    const [loading, setLoading] = useState(true);
    const { isDataBeingEvaluated } = useContext(DataEvaluationContext);
    const [updateTimelineCounter, setUpdateTimelineCounter] = useState(0);
    const isMountedRef = useRef(null);

    SetInterval( () => {
        setUpdateTimelineCounter(updateTimelineCounter + 1);
    },15000);

    useEffect(() => {
        isMountedRef.current = true;
        if(login.token) {
            getUserLikes(login.token, setUserLikes, setLoading, isMountedRef);
        }
        return () => isMountedRef.current = false;
    }, [login, isDataBeingEvaluated, updateTimelineCounter]);

    if(loading || !userLikes.length || !login.user || isTransitioning) {
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
                <PageTitle text = "my likes" />
                { PrintedPosts(userLikes, "Você ainda não curtiu nenhum post!", login.user.id) }
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