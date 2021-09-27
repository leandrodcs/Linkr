import Loading from "../../components/Loading/Loading";
import Container from "../../components/Container/Container";
import PageTitle from "../../components/PageTitle/PageTitle";
import Trending from "../../components/Trending/Trending";
import Header from "../../components/Header/Header";

import UserContext from "../../contexts/UserContext";
import DataEvaluationContext from "../../contexts/DataEvaluationContext";
import TransitionContext from "../../contexts/TransitionContext";
import { sendAlert } from "../../utils/helpers/Alerts";
import { reloadCurrentTimeline } from "../../utils/helpers/infiniteScroll";
import {getHashtagPosts} from "../../service/service";
import { PrintedPosts } from "../../utils/PostsUtils";
import { SetInterval } from "../../utils/helpers/Intervals";

import { useEffect, useState, useContext} from "react";
import { useParams } from "react-router";
import styled from "styled-components";
import InfiniteScroll from 'react-infinite-scroll-component';

export default function HashtagPage() {
    const {login} = useContext(UserContext);
    const { isDataBeingEvaluated } = useContext(DataEvaluationContext);
    const { isTransitioning } = useContext(TransitionContext);
    const [hashtagPosts, setHashtagPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [hasMore, setHasMore] =useState(true);
    const params = useParams();
    const [interactedPostId, setInteractedPostId] = useState(0);
    
    useEffect(() => window.scrollTo(0,0), [params.hashtag])
    useEffect(() => setLoading(true), [params.hashtag])

    SetInterval( () => {
        if (hashtagPosts.length) {
            reloadCurrentTimeline(hashtagPosts[hashtagPosts.length -1].repostId||hashtagPosts[hashtagPosts.length -1].id, getHashtagPosts, login.token, setHashtagPosts, params.hashtag);
        }
    },15000);

    useEffect(() => {
        getHashtagPosts(login.token, params.hashtag)
        .then(res => {
            setHashtagPosts(res.data.posts);
            setLoading(false);
            if(res.data.posts.length === 0) {
                setHasMore(false);
            }
        })
        .catch(err => {
            setLoading(false);
            sendAlert("error", "Houve uma falha ao obter os posts!","Por favor, atualize a página!")
        })
    },[login, params.hashtag]);

    useEffect(() => {
        if (interactedPostId) {
            if (!isDataBeingEvaluated) {
                reloadCurrentTimeline(interactedPostId, getHashtagPosts, login.token, setHashtagPosts, params.hashtag);
                setInteractedPostId(0);
            }
        }
    }, [login, params.hashtag, isDataBeingEvaluated, interactedPostId]);

    function loadMorePosts() {
        getHashtagPosts(login.token, params.hashtag, setHashtagPosts, setLoading, setHasMore, hashtagPosts[hashtagPosts.length -1].repostId||hashtagPosts[hashtagPosts.length -1].id, hashtagPosts)
        .then(res => {
            setHashtagPosts([...hashtagPosts, ...res.data.posts]);
            if(res.data.posts.length === 0) {
                setHasMore(false);
            }
        })
        .catch(err => {
            setLoading(false);
            sendAlert("error", "Houve uma falha ao obter os posts!","Por favor, atualize a página!");
        })
    }

    if(loading) {
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
                <PageTitle text = {<span># {params.hashtag}</span>} />
                {!hashtagPosts.length ? 
                "Esta hashtag ainda não foi citada em nenhum post!" :
                    <InfiniteScroll
                        dataLength={hashtagPosts.length}
                        pageStart={0}
                        scrollThreshold={1}
                        next={loadMorePosts}
                        hasMore={hasMore}
                        loader={<ScrollLoader><Loading scrollColor="#6D6D6D"/></ScrollLoader>}
                        endMessage={<p style={{ textAlign: 'center' }}>Você já viu tudo!</p>}
                    >
                        { PrintedPosts(hashtagPosts, "", login.user.id, setInteractedPostId) }
                    </InfiniteScroll>
                }
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

const ScrollLoader = styled.div`
    div {
        margin: 0 0 0 0;
        font-size: 22px;
        line-height: 26px;
        letter-spacing: 0.05em;
        color: #6D6D6D;
    }

    svg {
        width: 36px;
        margin: 0 0 0 0;
        height: 36px;
        color: #6D6D6D;
    }
`;