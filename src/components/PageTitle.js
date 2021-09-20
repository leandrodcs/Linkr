import styled from "styled-components";

export default function PageTitle({text}) {
    return (
        <Wrapper>
            {text}
        </Wrapper>
    );
}

const Wrapper = styled.div`
    font-family: 'Oswald', sans-serif;
    font-weight: 700;
    font-size: 43px;
    line-height: 64px;
    margin: 53px 0px 43px;
    color: #FFFFFF;
    word-break: break-all;
    @media(max-width: 637px) {
        font-size: 33px;
        line-height: 48px;
        margin: 19px 0px 19px 18px;
        padding-right: 8px 
    }
`