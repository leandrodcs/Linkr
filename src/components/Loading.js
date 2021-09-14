import styled from "styled-components";
import LoadingGif from "../assets/Loading.gif";
import { PostMarginLeft } from "../utils/utils";

export default function Loading() {
    return (
        <Wrapper>
            <img src = { LoadingGif } alt = "Carregando"/>
            Carregando...
        </Wrapper>
    );
}

const Wrapper = styled.div`
    width: 601px;
    font-family: 'Oswald', sans-serif;
    margin-left: ${PostMarginLeft(601,25,301)};
    font-size: 40px;
    color: #FFF;
    display: flex;
    flex-direction: column;
    align-items: center;
    & img {
        width: 50%;
        margin-bottom: 5px;
    }
    
`