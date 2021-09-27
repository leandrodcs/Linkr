import Loading from "../../components/Loading/Loading";
import Container from "../../components/Container/Container";
import PageTitle from "../../components/PageTitle/PageTitle";
import Trending from "../../components/Trending/Trending";

import DataEvaluationContext from "../../contexts/DataEvaluationContext";
import UserContext from "../../contexts/UserContext";
import {getUserPosts} from "../../service/service";
import { reloadCurrentTimeline } from "../../utils/helpers/infiniteScroll";
import { sendAlert } from "../../utils/helpers/Alerts";
import { PrintedPosts } from "../../utils/PostsUtils";
import { SetInterval } from "../../utils/helpers/Intervals";

import { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import InfiniteScroll from 'react-infinite-scroll-component';


export default function MyPosts() {
    const {login} = useContext(UserContext);
    const [userPosts, setUserPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [hasMore, setHasMore] =useState(true);
    const {isDataBeingEvaluated} = useContext(DataEvaluationContext);
    const [interactedPostId, setInteractedPostId] = useState(0);

    useEffect(() => window.scrollTo(0,0), [])

    SetInterval( () => {
        if (userPosts.length) {
            reloadCurrentTimeline(userPosts[userPosts.length -1].repostId || userPosts[userPosts.length -1].id, getUserPosts, login.token, setUserPosts, login.user.id);
        }
    },15000);

    useEffect(() => {
        getUserPosts(login.token, login.user.id)
        .then(res => {
            setUserPosts(res.data.posts);
            setLoading(false);
            if(res.data.posts.length === 0) {
                setHasMore(false);
            }
        })
        .catch(err => {
            setLoading(false);
            sendAlert("error", "Houve uma falha ao obter os posts!","Nos desculpe! A página será atualizada")
        })
    },[login]);

    useEffect(() => {
        if (interactedPostId) {
            if (!isDataBeingEvaluated) {
                reloadCurrentTimeline(interactedPostId, getUserPosts, login.token, setUserPosts, login.user.id);
                setInteractedPostId(0);
            }
        }
    }, [login, isDataBeingEvaluated, interactedPostId]);

    function loadMorePosts() {
        getUserPosts(login.token, login.user.id, userPosts[userPosts.length -1].repostId||userPosts[userPosts.length -1].id)
        .then(res => {
            setUserPosts([...userPosts, ...res.data.posts]);
            if(res.data.posts.length === 0) {
                setHasMore(false);
            }
        })
        .catch(err => {
            setLoading(false);
            sendAlert("error", "Houve uma falha ao obter os posts!","Nos desculpe! A página será atualizada");
        })
    }

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
                {!userPosts.length ? 
                "Você ainda não publicou nada!" :
                    <InfiniteScroll
                        dataLength={userPosts.length}
                        pageStart={0}
                        scrollThreshold={1}
                        next={loadMorePosts}
                        hasMore={hasMore}
                        loader={<ScrollLoader><Loading scrollColor="#6D6D6D"/></ScrollLoader>}
                        endMessage={<p style={{ textAlign: 'center' }}>Você já viu tudo!</p>}
                    >
                        { PrintedPosts(userPosts, "", login.user.id, setInteractedPostId) }
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