import styled from "styled-components";
import { useContext } from "react";
import UserContext from "../../../contexts/UserContext";
import { Link } from "react-router-dom";
import Input from "./Input";
import TextArea from "./TextArea";
import Button from "./Button";

export default function PublishingBox() {
    const { login } = useContext(UserContext);
    return (
        <Wrapper>
            <Link to={`/user/${login.user.id}`}>
                <img src = { login.user.avatar } alt = {login.user.username} />
            </Link>
            <PublishingBoxContent>
                <p>O que você tem pra favoritar hoje?</p>
                <Input placeholder = "http://..." />
                <TextArea placeholder = "Muito irado esse link falando de #javascript" />
                <Button> Publicar </Button>
            </PublishingBoxContent>
        </Wrapper>
    );
}

const Wrapper = styled.div`
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
    @media(max-width: 937px) {
        border-radius: 0px;
        & img {
            display: none;
        }
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
    @media(max-width: 937px) {
        text-align: center;
        & p {
        font-size: 17px;
        line-height: 25px;
    }
    }
`