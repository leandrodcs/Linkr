import Loading from "../../components/Loading/Loading";
import Container from "../../components/Container/Container";
import PageTitle from "../../components/PageTitle/PageTitle";
import Trending from "../../components/Trending/Trending";

import DataEvaluationContext from "../../contexts/DataEvaluationContext";
import UserContext from "../../contexts/UserContext";
import {getUserPosts, getNewerUserPosts} from "../../service/service";
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
    const {isDataBeingEvaluated} = useContext(DataEvaluationContext)

    useEffect(() => window.scrollTo(0,0), [])

    SetInterval( () => {
        if (userPosts.length) {
            getNewerUserPosts(login.token, userPosts[0].repostId||userPosts[0].id, userPosts, setUserPosts, login.user.id);
        }
    },15000);
    
    useEffect(() => {
        getUserPosts(login.token, login.user.id, setUserPosts, setLoading, setHasMore);
    }, [login.token, login.user.id, isDataBeingEvaluated]);

    function loadMorePosts() {
        getUserPosts(login.token, login.user.id, setUserPosts, setLoading, setHasMore, userPosts[userPosts.length -1].repostId||userPosts[userPosts.length -1].id, userPosts);
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
                        loader={<h4>Loading...</h4>}
                        endMessage={
                            <p style={{ textAlign: 'center' }}>
                              <b>Você já viu tudo!</b>
                            </p>
                        }
                    >
                        { PrintedPosts(userPosts, "", login.user.id) }
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