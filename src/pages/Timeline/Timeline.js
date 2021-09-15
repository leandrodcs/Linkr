import { useEffect, useState } from "react";
import styled from "styled-components";
import Container from "../../components/Container";
import Trending from "../../components/Trending";
import Post from "../../components/Post";
import PageTitle from "../../components/PageTitle";
import Loading from "../../components/Loading";
import { getTimelinePosts } from "../../service/service";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import mockUser from "../../temp_mocks/mock_User";
import mockPosts from "../../temp_mocks/mock_posts"

export default function Timeline() {
    const [posts] = useState(mockPosts.posts);
    const [userData] = useState(mockUser);
    const token = "37262632-0377-4e35-88df-debb5bcf32da";
    const browsingHistory = useHistory();

    useEffect(() => {
        getTimelinePosts(token)
        .catch(error => {
            alert("Houve uma falha ao obter os posts! A página será atualizada");
            browsingHistory.push("/");
        })
    },[]);

    if(!posts) {
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
                <PageTitle text = "timeline" />
                <PublishingBox>
                    <Link to={`/user/${userData.user.id}`}>
                        <img src = { userData.user.avatar } alt = {userData.user.username} />
                    </Link>
                    <PublishingBoxContent>
                        <p>O que você tem pra favoritar hoje?</p>
                        <Input 
                            placeholder = "http://..."
                        />
                        <TextArea
                            placeholder = "Muito irado esse link falando de #javascript"
                        />
                        <Button>Publicar</Button>
                    </PublishingBoxContent>
                </PublishingBox>
                { posts.length ? posts.map( ({id, text, user, likes}) => 
                    <Post 
                        key = { id }
                        id = { id }
                        text = { text }
                        user = { user }
                        likes = { likes }
                    />)
                    : <p>Nenhum post encontrado</p>
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
    @media(max-width: 937px) {
        width: 100%;
    }
`

const PublishingBox = styled.div`
    width: 100%;
    border-radius: 16px;
    background-color: #FFF;
    padding: 18px;
    margin-bottom: 20px;
    display: flex;
    filter: drop-shadow(0px 4px 4px 0px rgba(0,0,0,0.25));
    & img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        margin-right: 18px;
        object-fit: cover;
    }
`

const PublishingBoxContent = styled.div`
    width: 100%;
    position: relative;
    & p {
        color: #707070;
        font-weight: 300;
        font-size: 20px;
        line-height: 30px;
    }
`

const Input = styled.input`
    width: 100%;
    height: 30px;
    margin: 10px 0px;
    padding-left: 15px;
    display: inline-block;
    background-color: #EFEFEF;
    font-family: 'Lato', sans-serif;
    border: none;
    border-radius: 5px;
    &::placeholder {
        color: #949494;
        font-weight: 300;
    }
`

const TextArea = styled.textarea`
    width: 100%;
    height: 66px;
    margin-bottom: 36px;
    padding: 8px 15px;
    display: inline-block;
    background-color: #EFEFEF;
    font-family: 'Lato', sans-serif;
    border: none;
    resize: none;
    border-radius: 5px;
    &::placeholder {
        color: #949494;
        font-weight: 300;
    }
`

const Button = styled.button`
    width: 112px;
    height: 31px;
    background-color: #1877F2;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #FFF;
    font-size: 14px;
    font-weight: 700;
    position: absolute;
    bottom: 0px;
    right: 0px;

`