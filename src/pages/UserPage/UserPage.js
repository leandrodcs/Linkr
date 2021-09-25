import Loading from "../../components/Loading/Loading";
import Container from "../../components/Container/Container";
import PageTitle from "../../components/PageTitle/PageTitle";
import Trending from "../../components/Trending/Trending";
import Button from "./elements/Button";
import Header from "../../components/Header/Header";

import UserContext from "../../contexts/UserContext";
import DataEvaluationContext from "../../contexts/DataEvaluationContext";
import TransitionContext from "../../contexts/TransitionContext";
import {getUserPosts, getUserData} from "../../service/service";
import { PrintedPosts } from "../../utils/PostsUtils";
import { SetInterval } from "../../utils/helpers/Intervals";

import { useEffect, useState, useContext, useRef} from "react";
import { useParams } from "react-router";
import styled from "styled-components";

export default function UserPage() {
    const {login} = useContext(UserContext);
    const { isDataBeingEvaluated } = useContext(DataEvaluationContext);
    const { isTransitioning } = useContext(TransitionContext);
    const [username, setUsername] = useState("")
    const [userPosts, setUserPosts] = useState([]);
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
            getUserData( login.token, params.id, setUsername, isMountedRef );
            getUserPosts(login.token, params.id, setUserPosts, setLoading, isMountedRef);
        }
        return () => isMountedRef.current = false;
    }, [login, params, isDataBeingEvaluated, updateTimelineCounter]);

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
                <StyledTop>
                    <PageTitle type = "UserPosts" text = {<><span>{username}</span> <span>'s Posts</span></>} />
                    <Button />
                </StyledTop>
                { PrintedPosts(userPosts, "Este usuário ainda não criou nenhum post!", login.user.id) }
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

const StyledTop = styled.div`
    width: 100%;
    position: relative;

    @media(max-width: 937px) {
        margin-bottom: 30px;
    }

    @media(max-width: 637px) {
        position: initial;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: left;
    }
`;