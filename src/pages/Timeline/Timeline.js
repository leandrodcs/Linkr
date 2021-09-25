import Container from "../../components/Container/Container";
import Header from "../../components/Header/Header";
import PageTitle from "../../components/PageTitle/PageTitle";
import Trending from "../../components/Trending/Trending";
import Loading from "../../components/Loading/Loading";
import PublishingBox from "./elements/PublishingBox";

import { getTimelinePosts } from "../../service/service";
import { PrintedPosts } from "../../utils/PostsUtils";
import { SetInterval } from "../../utils/helpers/Intervals";
import UserContext from "../../contexts/UserContext";
import DataEvaluationContext from "../../contexts/DataEvaluationContext";
import TransitionContext from "../../contexts/TransitionContext";

import { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";

export default function Timeline() {
    const [posts, setPosts] = useState("");
    const { login, followingList } = useContext(UserContext);
    const { isDataBeingEvaluated } = useContext(DataEvaluationContext);
    const { isTransitioning} = useContext(TransitionContext);
    const [updateTimelineCounter, setUpdateTimelineCounter] = useState(0);
    const isMountedRef = useRef(null);

    SetInterval( () => {
        setUpdateTimelineCounter(updateTimelineCounter + 1);
    },15000);

    useEffect(() => {
        isMountedRef.current = true;
        if(login.token) {
            getTimelinePosts(login.token, setPosts, isMountedRef);
        }
        return () => isMountedRef.current = false;
    },[login,isDataBeingEvaluated,updateTimelineCounter]);

    if(!posts || !login.user || isTransitioning ) {
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
                <PageTitle text = "timeline" />
                <PublishingBox />
                { PrintedPosts(posts, "Nenhuma publicação encontrada", login.user.id, followingList) }
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

