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

    useEffect(() => window.scrollTo(0,0), [])

    SetInterval( () => {
        if (userLikes.length) {
            getNewerUserLikes(login.token, userLikes[0].repostId||userLikes[0].id, userLikes, setUserLikes);
        }
    },15000);

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
                { PrintedPosts(userLikes, "Você ainda não curtiu nenhum post!", login.user.id) }
                {!userLikes.length ? 
                "Você ainda não curtiu nenhum post!" :
                    <InfiniteScroll
                        dataLength={userLikes.length}
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
                        { PrintedPosts(userLikes, "", login.user.id) }
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