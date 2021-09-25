import Loading from "../../components/Loading/Loading";
import Container from "../../components/Container/Container";
import PageTitle from "../../components/PageTitle/PageTitle";
import Trending from "../../components/Trending/Trending";
import Button from "./elements/Button";

import UserContext from "../../contexts/UserContext";
import DataEvaluationContext from "../../contexts/DataEvaluationContext";
import {getUserPosts, getUserData, getNewerUserPosts} from "../../service/service";
import { PrintedPosts } from "../../utils/PostsUtils";
import { SetInterval } from "../../utils/helpers/Intervals";

import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router";
import styled from "styled-components";
import InfiniteScroll from 'react-infinite-scroll-component';


export default function UserPage() {
    const {login} = useContext(UserContext);
    const { isDataBeingEvaluated } = useContext(DataEvaluationContext);
    const [username, setUsername] = useState("")
    const [userPosts, setUserPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const params = useParams();
    const [hasMore, setHasMore] =useState(true);


    useEffect(() => window.scrollTo(0,0), [])

    SetInterval( () => {
        if (userPosts.length) {
            getNewerUserPosts(login.token, userPosts[0].repostId||userPosts[0].id, userPosts, setUserPosts, params.id);
        }
    },15000);

    useEffect(() => {
        getUserData( login.token, params.id, setUsername );
        getUserPosts(login.token, params.id, setUserPosts, setLoading, setHasMore)
    }, [login.token, params, isDataBeingEvaluated]);

    function loadMorePosts() {
        getUserPosts(login.token, params.id, setUserPosts, setLoading, setHasMore, userPosts[userPosts.length -1].repostId||userPosts[userPosts.length -1].id, userPosts);
    }

    if(loading && !userPosts.length) {
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
                <StyledTop>
                    <PageTitle type = "UserPosts" text = {<><span>{username}</span> <span>'s Posts</span></>} />
                    <Button />
                </StyledTop>
                {!userPosts.length ? 
                "Este usuário ainda não criou nenhum post!" :
                    <InfiniteScroll
                        dataLength={userPosts.length}
                        pageStart={0}
                        scrollThreshold={1}
                        next={loadMorePosts}
                        hasMore={hasMore}
                        loader={<h4>{userPosts.length < 10 || <b>Loading...</b>}</h4>}
                        endMessage={
                        <p style={{ textAlign: 'center' }}>
                            {userPosts.length < 10 || <b>Você já viu tudo!</b>}
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

const StyledTop = styled.div`
    width: 100%;
    position: relative;

    @media(max-width: 937px) {
        margin-bottom: 30px;
    }

    @media(max-width: 637px) {
        position: initial;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: left;
    }
`;