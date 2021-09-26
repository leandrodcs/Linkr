import Loading from "../../components/Loading/Loading";
import Container from "../../components/Container/Container";
import PageTitle from "../../components/PageTitle/PageTitle";
import Trending from "../../components/Trending/Trending";

import UserContext from "../../contexts/UserContext";
import DataEvaluationContext from "../../contexts/DataEvaluationContext";
import {getUserLikes, getNewerUserLikes} from "../../service/service";
import { PrintedPosts } from "../../utils/PostsUtils";
import { SetInterval } from "../../utils/helpers/Intervals";

import { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import InfiniteScroll from 'react-infinite-scroll-component';


export default function MyLikes() {
    const {login} = useContext(UserContext);
    const [userLikes, setUserLikes] = useState([]);
    const [loading, setLoading] = useState(true);
    const { isDataBeingEvaluated } = useContext(DataEvaluationContext);
    const [hasMore, setHasMore] =useState(true);
    const [interactedPostId, setInteractedPostId] = useState(0);

    useEffect(() => window.scrollTo(0,0), []);

    useEffect(() => {
        getUserLikes(setLoading, login.token, setUserLikes, setHasMore)
    }, [login.token, isDataBeingEvaluated]);

    function loadMorePosts() {
        getUserLikes(setLoading, login.token, setUserLikes, setHasMore, userLikes[userLikes.length -1].repostId||userLikes[userLikes.length -1].id, userLikes);
    }

    if(!userLikes.length && loading) {
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