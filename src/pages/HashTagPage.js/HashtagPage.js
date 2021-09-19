import Loading from "../../components/Loading";
import Container from "../../components/Container";
import PageTitle from "../../components/PageTitle";
import Trending from "../../components/Trending";
import Post from "../../components/Post/Post";

import UserContext from "../../contexts/UserContext";
import DataEvaluationContext from "../../contexts/DataEvaluationContext";
import {getHashtagPosts} from "../../service/service";

import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router";
import styled from "styled-components";

export default function HashtagPage() {
    const {login} = useContext(UserContext);
    const { isDataBeingEvaluated } = useContext(DataEvaluationContext);
    const [hashtagPosts, setHashtagPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const params = useParams()

    useEffect(() => {
        setLoading(true);
        getHashtagPosts(login.token, params.hashtag, setHashtagPosts, setLoading)
    }, [login.token, params, isDataBeingEvaluated]);

    if(loading) {
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
                <PageTitle text = {`# ${params.hashtag}`} />
                {hashtagPosts.length ?
                hashtagPosts.map(post => <Post key ={post.id} post={post}/>) :
                <p>Esta hashtag ainda não foi citada em nenhum post!</p>
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

    @media(max-width: 637px) {
        width: 100%;
    }
`;