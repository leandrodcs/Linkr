import styled from "styled-components";
import { TrendingMarginLeft } from "../utils/utils";

export default function Trending() {
    return (
        <Wrapper>
            Trending
        </Wrapper>
    );

}

const Wrapper = styled.section`
    width: 301px;
    height: 406px;
    border-radius: 16px;
    margin-left: ${TrendingMarginLeft(601,25,301)};
    margin-top: 232px;
    background-color: #171717;
    color: #ffffff;
    font-family: 'Oswald', sans-serif;
    font-weight: 700;
    font-size: 19px;
    line-height: 23px;
    position: sticky;
    top: 80px;

`