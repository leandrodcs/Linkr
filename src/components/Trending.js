import styled from "styled-components";

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
    margin-top: 160px;
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