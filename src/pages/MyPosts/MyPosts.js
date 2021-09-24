import Loading from "../../components/Loading/Loading";
import Container from "../../components/Container/Container";
import PageTitle from "../../components/PageTitle/PageTitle";
import Trending from "../../components/Trending/Trending";

import DataEvaluationContext from "../../contexts/DataEvaluationContext";
import UserContext from "../../contexts/UserContext";
import {getUserPosts} from "../../service/service";
import { PrintedPosts } from "../../utils/PostsUtils";
import { SetInterval } from "../../utils/helpers/Intervals";

import { useEffect, useState, useContext } from "react";
import styled from "styled-components";

export default function MyPosts() {
    const {login} = useContext(UserContext);
    const [userPosts, setUserPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const {isDataBeingEvaluated} = useContext(DataEvaluationContext);
    const [updateTimelineCounter, setUpdateTimelineCounter] = useState(0);

    SetInterval( () => {
        setUpdateTimelineCounter(updateTimelineCounter + 1);
    },15000);

    useEffect(() => {
        getUserPosts(login.token, login.user.id, setUserPosts, setLoading);
    }, [login.token, login.user.id, isDataBeingEvaluated, updateTimelineCounter]);

    if(!userPosts.length && loading) {
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