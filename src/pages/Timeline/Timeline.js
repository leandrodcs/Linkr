import Container from "../../components/Container/Container";
import PageTitle from "../../components/PageTitle/PageTitle";
import Trending from "../../components/Trending/Trending";
import Loading from "../../components/Loading/Loading";
import PublishingBox from "./elements/PublishingBox";

import { getTimelinePosts } from "../../service/service";
import { PrintedPosts } from "../../utils/PostsUtils";
import { SetInterval } from "../../utils/helpers/Intervals";
import { reloadCurrentTimeline } from "../../utils/helpers/infiniteScroll";
import { sendAlert } from "../../utils/helpers/Alerts";
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
    const [interactedPostId, setInteractedPostId] = useState(0);
    // useEffect(() => window.scrollTo(0,0), [])

    SetInterval( () => {
        if (posts.length) {
            reloadCurrentTimeline(interactedPostId, getTimelinePosts, login.token, setPosts);
        }
    },15000);

    useEffect(() => {
        if(login.token) {
            if (interactedPostId) {
                if (!isDataBeingEvaluated) {
                    reloadCurrentTimeline(interactedPostId, getTimelinePosts, login.token, setPosts);
                    setInteractedPostId(0);
                }
            } else {
                getTimelinePosts(login.token)
                .then(resp => {
                    setPosts(resp.data.posts);
                    setLoading(false);
                    if(resp.data.posts.length === 0) {
                        setHasMore(false);
                    }
                })
                .catch(error => {
                    sendAlert("error", "Houve uma falha ao obter os posts!","Nos desculpe! A página será atualizada");
                    console.log("Erro na Timeline");
                })
            }
        }
    },[login, isDataBeingEvaluated]);
    
    if(loading) {
        return (
            <Container>
                <Loading />
                <Trending />
            </Container>
        );
    }

    function loadMorePosts() {
        getTimelinePosts(login.token, "", posts[posts.length -1].repostId || posts[posts.length -1].id)
        .then(resp => {
            setPosts([...posts, ...resp.data.posts]);
            if(resp.data.posts.length === 0) {
                setHasMore(false);
            }
        })
        .catch(error => {
            sendAlert("error", "Houve uma falha ao obter os posts!","Nos desculpe! A página será atualizada");
        })
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
                        loader={<ScrollLoader><Loading scrollColor="#6D6D6D"/></ScrollLoader>}
                        endMessage={<p style={{ textAlign: 'center' }}>Você já viu tudo!</p>}
                    >
                        { PrintedPosts(posts, "", login.user.id, setInteractedPostId, followingList) }
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

    svg {
        width: 100px;
    }

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

