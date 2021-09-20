import Input from "./Input";
import TextArea from "./TextArea";
import Button from "./Button";

import UserContext from "../../../contexts/UserContext";
import DataEvaluationContext from "../../../contexts/DataEvaluationContext";
import { adjustStateObjectData } from "../../../utils/ObjectsUtils";

import styled from "styled-components";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CheckPublishingBoxAndSendPost } from "../../../utils/PostsUtils";

export default function PublishingBox() {
    const { login } = useContext(UserContext);
    const { isDataBeingEvaluated, setIsDataBeingEvaluated } = useContext(DataEvaluationContext);
    const [ newPost, setNewPost ] = useState({ text:"",link:"" });

    return (
        <Wrapper>
            <div>
                <Link to={`/my-posts`}>
                    <img src = { login.user.avatar } alt = {login.user.username} />
                </Link>
            </div>
            <PublishingBoxContent>
                <p>
                    O que você tem pra favoritar hoje?
                </p>
                <form onSubmit = { (event) => CheckPublishingBoxAndSendPost(event, newPost, login.token, setIsDataBeingEvaluated, setNewPost) } >
                    <Input 
                        placeholder = "http://..."
                        disabled = { isDataBeingEvaluated }
                        isDataBeingEvaluated = { isDataBeingEvaluated }
                        value = {newPost.link}
                        onChange = { e => adjustStateObjectData(newPost, setNewPost, "link", e.target.value)}
                    />
                    <TextArea
                        placeholder = "Muito irado esse link falando de #javascript"
                        disabled = { isDataBeingEvaluated }
                        isDataBeingEvaluated = { isDataBeingEvaluated }
                        value = {newPost.text}
                        onChange = { e => adjustStateObjectData(newPost, setNewPost, "text", e.target.value)}
                    />
                    <Button 
                        disabled = { isDataBeingEvaluated }
                        isDataBeingEvaluated = { isDataBeingEvaluated }
                        type = "submit"
                    >
                        { isDataBeingEvaluated ? "Publicando..." : "Publicar"}
                    </Button>
                </form>
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
    @media(max-width: 637px) {
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
    @media(max-width: 637px) {
        text-align: center;
        & p {
        font-size: 17px;
        line-height: 25px;
    }
    }
`