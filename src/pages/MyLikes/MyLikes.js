import Loading from "../../components/Loading/Loading";
import Container from "../../components/Container/Container";
import PageTitle from "../../components/PageTitle/PageTitle";
import Trending from "../../components/Trending/Trending";
import Post from "../../components/Post/Post";

import DataEvaluationContext from "../../contexts/DataEvaluationContext";
import UserContext from "../../contexts/UserContext";
import {getUserLikes} from "../../service/service";

import { useEffect, useState, useContext } from "react";
import styled from "styled-components";

export default function MyLikes() {
    const {login} = useContext(UserContext);
    const [userLikes, setUserLikes] = useState([]);
    const [loading, setLoading] = useState(true);
    const {isDataBeingEvaluated} = useContext(DataEvaluationContext)

    useEffect(() => {
        getUserLikes(login.token, setUserLikes, setLoading)
    }, [login.token, isDataBeingEvaluated]);

    if(!userLikes.length && loading) {
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
                <PageTitle text = "my likes" />
                {userLikes.length ?
                userLikes.map(post => <Post key ={post.id} post={post}/>) :
                <p>Você ainda não curtiu post!</p>}
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