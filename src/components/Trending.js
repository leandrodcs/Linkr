import DataEvaluationContext from "../contexts/DataEvaluationContext";
import UserContext from "../contexts/UserContext";
import { TextWithHighlightedHashtags } from "../utils/TextAdjustmentsUtils";
import { getTrendingTopics } from "../service/service";

import { useContext, useEffect, useState } from "react";
import styled from "styled-components";

export default function Trending() {
    const [trendingTopics, setTrendingTopics ] = useState([]);
    const { login } = useContext(UserContext);
    const { isDataBeingEvaluated } = useContext(DataEvaluationContext);
    
    useEffect(() => {
        if(login.token) {
            getTrendingTopics(login.token, setTrendingTopics)
        }
    },[login,isDataBeingEvaluated]);
    
    return (
        <Wrapper>
            <Title> trending </Title>
            {PostHashtags(trendingTopics)}
        </Wrapper>
    );

}

const Wrapper = styled.section`
    width: 301px;
    height: clamp(0%,406px,100%);
    border-radius: 16px;
    margin-top: 160px;
    padding: 0px 16px 10px;
    background-color: #171717;
    color: #ffffff;
    font-family: 'Oswald', sans-serif;
    font-weight: 700;
    font-size: 19px;
    line-height: 23px;
    position: sticky;
    top: 80px;
    @media(max-width: 937px) {
        display: none;
    }
`

const Title = styled.div`
    width: 100%;
    height: 61px;
    display: flex;
    align-items: center;
    margin-bottom: 24px;
    border-bottom: 1px solid #484848;
    font-size: 27px;
    font-weight: 700;
    color: #FFF;
`

const Hashtags = styled.p`
    font-size: 19px;
    font-weight: 700;
    color: #FFF;
    margin-bottom: 7px;
    word-wrap: break-word;
`

function PostHashtags(hashtags){
    return hashtags.map( ({name},index) => 
        <TextWithHighlightedHashtags
            key = { index }
            text = {`#${name}`}
            HashtagStyledComponent = {Hashtags}
        />
    );
}