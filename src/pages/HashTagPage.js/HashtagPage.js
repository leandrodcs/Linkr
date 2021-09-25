import Loading from "../../components/Loading/Loading";
import Container from "../../components/Container/Container";
import PageTitle from "../../components/PageTitle/PageTitle";
import Trending from "../../components/Trending/Trending";
import Header from "../../components/Header/Header";

import UserContext from "../../contexts/UserContext";
import DataEvaluationContext from "../../contexts/DataEvaluationContext";
import TransitionContext from "../../contexts/TransitionContext";
import {getHashtagPosts} from "../../service/service";
import { PrintedPosts } from "../../utils/PostsUtils";
import { SetInterval } from "../../utils/helpers/Intervals";

import { useEffect, useState, useContext, useRef} from "react";
import { useParams } from "react-router";
import styled from "styled-components";

export default function HashtagPage() {
    const {login} = useContext(UserContext);
    const { isDataBeingEvaluated } = useContext(DataEvaluationContext);
    const { isTransitioning } = useContext(TransitionContext);
    const [hashtagPosts, setHashtagPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [updateTimelineCounter, setUpdateTimelineCounter] = useState(0);
    const params = useParams();
    const isMountedRef = useRef(null);
    
    SetInterval( () => {
        setUpdateTimelineCounter(updateTimelineCounter + 1);
    },15000);

    useEffect(() => {
        isMountedRef.current = true;
        if(login.token) {
            setLoading(true);
            getHashtagPosts(login.token, params.hashtag, setHashtagPosts, setLoading, isMountedRef);
        }
        return () => isMountedRef.current = false;
    }, [login, params, isDataBeingEvaluated, updateTimelineCounter]);

    if(loading || !hashtagPosts.length || !login.user || isTransitioning) {
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
                <PageTitle text = {<span># {params.hashtag}</span>} />
                { PrintedPosts(hashtagPosts, "Esta hashtag ainda não foi citada em nenhum post!", login.user.id) }
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