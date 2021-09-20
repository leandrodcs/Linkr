import DataEvaluationContext from "../../contexts/DataEvaluationContext";
import UserContext from "../../contexts/UserContext";
import { TextWithHighlightedHashtags } from "../../utils/TextAdjustmentsUtils";
import { getTrendingTopics } from "../../service/service";
import { sendAlert } from "../../utils/helpers/Alerts";

import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router";

export default function Trending() {
    const [trendingTopics, setTrendingTopics ] = useState([]);
    const { login } = useContext(UserContext);
    const { isDataBeingEvaluated } = useContext(DataEvaluationContext);
    const [searchedHashtag, setSearchedHashtag] = useState("");
    const history = useHistory();
    
    useEffect(() => {
        if(login.token) {
            getTrendingTopics(login.token, setTrendingTopics)
        }
    },[login,isDataBeingEvaluated]);

    function searchHashtag(e) {
        if(e.keyCode !== 13) return;

        if(searchedHashtag.includes(" ")) {
            return sendAlert("error", "Uma hashtag não pode ter espaços em branco!");
        }
        history.push(`/hashtag/${searchedHashtag}`);
    }
    
    return (
        <Wrapper>
            <Title> trending </Title>
            {PostHashtags(trendingTopics)}
            <SearchHashtag>
            <input 
            placeholder="type a hashtag" 
            value={searchedHashtag} 
            onKeyUp={e => searchHashtag(e)}
            onChange={e => setSearchedHashtag(e.target.value)}
            ></input>
            <p>#</p>
            </SearchHashtag>
        </Wrapper>
    );

}

const SearchHashtag = styled.div`
    margin-top: 8px;
    position: relative;
    font-family: 'Lato', sans-serif;

    input {
    width: 269px;
    height: 35px;
    background: #252525;
    border-radius: 8px;
    border: none;
    padding: 0 10px 0 36px;
    font-size: 16px;
    letter-spacing: 0.05em;
    font-family: 'Lato', sans-serif;
    font-style: italic;
    color: #575757;
    outline: none;
    }

    p {
        position: absolute;
        top: 50%;
        left: 13px;
        transform: translateY(-50%);
        font-weight: 700;
    }
`;

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
`;

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
`;

const Hashtags = styled.p`
    font-size: 19px;
    font-weight: 700;
    color: #FFF;
    margin-bottom: 7px;
    letter-spacing: 0.05em;
    word-wrap: break-word;
`;

function PostHashtags(hashtags){
    return hashtags.map( ({name},index) => 
        <TextWithHighlightedHashtags
            key = { index }
            text = {`#${name}`}
            HashtagStyledComponent = {Hashtags}
        />
    );
}