import Loading from "../../components/Loading";
import Container from "../../components/Container";
import PageTitle from "../../components/PageTitle";
import Trending from "../../components/Trending";
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

    return (
        <Container>
            <Wrapper>
                <PageTitle text = "my likes" />
                {userLikes.length ?
                userLikes.map(post => <Post key ={post.id} post={post}/>) :
                <EmptyMsg>Você ainda não curtiu post!</EmptyMsg>}
            </Wrapper>
            <Trending />
        </Container>
    );
}

const Wrapper = styled.section`
    width: 611px;

    @media(max-width: 937px) {
        width: 100%;
    }
`;

const EmptyMsg = styled.p`
    font-family: 'Lato', sans-serif;
    font-size: 20px;
    color: #151515;
`;