import Loading from "../../components/Loading/Loading";
import Container from "../../components/Container/Container";
import PageTitle from "../../components/PageTitle/PageTitle";
import Trending from "../../components/Trending/Trending";

import UserContext from "../../contexts/UserContext";
import DataEvaluationContext from "../../contexts/DataEvaluationContext";
import {getHashtagPosts} from "../../service/service";
import { PrintedPosts } from "../../utils/PostsUtils";

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

    if(loading && !hashtagPosts.length) {
        return (
            <Container>
                <Loading />
                <Trending />
            </Container>
        );
    }

    window.scrollTo(0,0);

    return (
        <Container>
            <Wrapper>
                <PageTitle text = {`# ${params.hashtag}`} />
                { PrintedPosts(hashtagPosts, "Esta hashtag ainda não foi citada em nenhum post!", login.user.id) }
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