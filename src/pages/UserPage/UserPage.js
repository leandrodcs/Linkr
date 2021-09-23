import Loading from "../../components/Loading/Loading";
import Container from "../../components/Container/Container";
import PageTitle from "../../components/PageTitle/PageTitle";
import Trending from "../../components/Trending/Trending";
import Button from "./elements/Button";

import UserContext from "../../contexts/UserContext";
import DataEvaluationContext from "../../contexts/DataEvaluationContext";
import {getUserPosts, getUserData} from "../../service/service";
import { PrintedPosts } from "../../utils/PostsUtils";

import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router";
import styled from "styled-components";

export default function UserPage() {
    const {login} = useContext(UserContext);
    const { isDataBeingEvaluated } = useContext(DataEvaluationContext);
    const [username, setUsername] = useState("")
    const [userPosts, setUserPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const params = useParams()

    useEffect(() => {
        setLoading(true);
        getUserData( login.token, params.id, setUsername );
        getUserPosts(login.token, params.id, setUserPosts, setLoading)
    }, [login.token, params, isDataBeingEvaluated]);

    if(loading && !userPosts.length) {
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
                <StyledTop>
                    <PageTitle type = "UserPosts" text = {<><span>{username}</span> <span>'s Posts</span></>} />
                    <Button />
                </StyledTop>
                { PrintedPosts(userPosts, "Este usuário ainda não criou nenhum post!", login.user.id) }
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