import Loading from "../../components/Loading/Loading";
import Container from "../../components/Container/Container";
import PageTitle from "../../components/PageTitle/PageTitle";
import Trending from "../../components/Trending/Trending";

import UserContext from "../../contexts/UserContext";
import DataEvaluationContext from "../../contexts/DataEvaluationContext";
import {getHashtagPosts, getNewerHashtagPosts} from "../../service/service";
import { PrintedPosts } from "../../utils/PostsUtils";
import { SetInterval } from "../../utils/helpers/Intervals";

import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router";
import styled from "styled-components";
import InfiniteScroll from 'react-infinite-scroll-component';

export default function HashtagPage() {
    const {login} = useContext(UserContext);
    const { isDataBeingEvaluated } = useContext(DataEvaluationContext);
    const [hashtagPosts, setHashtagPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] =useState(true);
    const params = useParams();
    
    useEffect(() => window.scrollTo(0,0), [])

    SetInterval( () => {
        if (hashtagPosts.length) {
            getNewerHashtagPosts(login.token, hashtagPosts[0].repostId||hashtagPosts[0].id, hashtagPosts, setHashtagPosts, params.hashtag);
        }
    },15000);

    useEffect(() => {
        setLoading(true);
        getHashtagPosts(login.token, params.hashtag, setHashtagPosts, setLoading, setHasMore)
    }, [login.token, params, isDataBeingEvaluated]);

    function loadMorePosts() {
        getHashtagPosts(login.token, params.hashtag, setHashtagPosts, setLoading, setHasMore, hashtagPosts[hashtagPosts.length -1].repostId||hashtagPosts[hashtagPosts.length -1].id, hashtagPosts);
    }

    if(loading && !hashtagPosts.length) {
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
                <PageTitle text = {<span># {params.hashtag}</span>} />
                {!hashtagPosts.length ? 
                "Esta hashtag ainda não foi citada em nenhum post!" :
                    <InfiniteScroll
                        dataLength={hashtagPosts.length}
                        pageStart={0}
                        scrollThreshold={1}
                        next={loadMorePosts}
                        hasMore={hasMore}
                        loader={<h4>{hashtagPosts.length < 10 || <b>Loading...</b>}</h4>}
                        endMessage={
                        <p style={{ textAlign: 'center' }}>
                            <b>Você já viu tudo!</b>
                        </p>
                        }
                    >
                        { PrintedPosts(hashtagPosts, "", login.user.id) }
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