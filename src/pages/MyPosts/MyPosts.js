import Loading from "../../components/Loading/Loading";
import Container from "../../components/Container/Container";
import PageTitle from "../../components/PageTitle/PageTitle";
import Trending from "../../components/Trending/Trending";

import DataEvaluationContext from "../../contexts/DataEvaluationContext";
import UserContext from "../../contexts/UserContext";
import {getUserPosts} from "../../service/service";
import { PrintedPosts } from "../../utils/PostsUtils";

import { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import InfiniteScroll from 'react-infinite-scroll-component';


export default function MyPosts() {
    const {login} = useContext(UserContext);
    const [userPosts, setUserPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [hasMore, setHasMore] =useState(true);
    const {isDataBeingEvaluated} = useContext(DataEvaluationContext)
    
    useEffect(() => {
        getUserPosts(login.token, login.user.id, setUserPosts, setLoading, setHasMore);
    }, [login.token, login.user.id, isDataBeingEvaluated]);

    useEffect(() => window.scrollTo(0,0), [])

    function loadMorePosts() {
        getUserPosts(login.token, login.user.id, setUserPosts, setLoading, setHasMore, userPosts[userPosts.length -1].id, userPosts);
    }
    console.log(userPosts)
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
                        dataLength={10}
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