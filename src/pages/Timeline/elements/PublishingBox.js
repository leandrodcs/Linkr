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
import { IoMdPin } from "react-icons/io";

export default function PublishingBox() {
    const { login } = useContext(UserContext);
    const { isDataBeingEvaluated, setIsDataBeingEvaluated } = useContext(DataEvaluationContext);
    const [ newPost, setNewPost ] = useState({ text:"",link:"" });
    const [location, setLocation] = useState(false);

    function pinOrUnpinLocation() {
        if (!("geolocation" in navigator)) {
            alert("Seu navegador não possui suporte para localização ;(");
            return;
        }
        if (location) {
            setLocation(false);
            return
        }
        navigator.geolocation.getCurrentPosition(p => {
            setLocation({latitude: p.coords.latitude, longitude: p.coords.longitude});
        })
    }

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
                <form onSubmit = { (event) => CheckPublishingBoxAndSendPost(event, newPost, login.token, setIsDataBeingEvaluated, setNewPost, location) } >
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
                    <Location 
                        isLocationActive={location} 
                        onClick={() => pinOrUnpinLocation()}>
                        <IoMdPin />
                        {location ? `Localização ativada` : `Localização desativada`}
                    </Location>
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
`;

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
`;

const Location = styled.div`
    cursor: pointer;
    position: absolute;
    color: ${({isLocationActive}) => isLocationActive ? `#238700` : `#949494`};
    display: flex;
    gap: 5px;
    font-weight: 300;
    font-size: 13px;
    line-height: 16px;
    left: 0;
    bottom: 0px;
    transform: translate(0,-50%);
    svg {
        font-size: 15px;
    }
`;
