import Container from "../../components/Container/Container";
import PageTitle from "../../components/PageTitle/PageTitle";
import Trending from "../../components/Trending/Trending";
import Loading from "../../components/Loading/Loading";
import PublishingBox from "./elements/PublishingBox";

import { getTimelinePosts, getNewerTimelinePosts } from "../../service/service";
import { PrintedPosts } from "../../utils/PostsUtils";
import { SetInterval } from "../../utils/helpers/Intervals";
import UserContext from "../../contexts/UserContext";
import DataEvaluationContext from "../../contexts/DataEvaluationContext";

import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import InfiniteScroll from 'react-infinite-scroll-component';


export default function Timeline() {
    const [posts, setPosts] = useState([]);
    const { login, followingList } = useContext(UserContext);
    const { isDataBeingEvaluated } = useContext(DataEvaluationContext);
    const [hasMore, setHasMore] =useState(true);
    const [loading, setLoading] = useState(true);

    SetInterval( () => {
        if (posts.length) {
            getNewerTimelinePosts(login.token, posts[0].repostId||posts[0].id, posts, setPosts);
        }
    },15000);

    useEffect(() => window.scrollTo(0,0), [])

    useEffect(() => {
        if(login.token) {
            getTimelinePosts(setLoading, login.token, setPosts, setHasMore);
        }
    },[login,isDataBeingEvaluated]);

    if(!posts.length && loading) {
        return (
            <Container>
                <Loading />
                <Trending />
            </Container>
        );
    }

    function loadMorePosts() {
        getTimelinePosts(setLoading, login.token, setPosts, setHasMore, posts[posts.length -1].repostId||posts[posts.length -1].id, posts);
    }

    return (
        <Container>
            <Wrapper>
                <PageTitle text = "timeline" />
                <PublishingBox />
                {!posts.length ? 
                "Você ainda não publicou nada!" :
                    <InfiniteScroll
                        dataLength={posts.length}
                        pageStart={0}
                        scrollThreshold={1}
                        next={loadMorePosts}
                        hasMore={hasMore}
                        loader={<h4>Loading...</h4>}
                        endMessage={
                            <p style={{ textAlign: 'center' }}>
                              <b>Você já viu tudo!</b>
                            </p>
                        }
                    >
                        { PrintedPosts(posts, "", login.user.id, followingList) }
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

