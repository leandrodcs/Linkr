import styled from "styled-components";

export default function LoginCover() {
    return (
        <Wrapper>
            <h1>linkr</h1>
            <h2>save, share and discover</h2>
            <h2>the best links on the web</h2>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    width: calc(100vw - 535px);
    height: 100vh;
    padding: 304px 104px 0px;
    background-color: #151515;
    box-shadow: 4px 0px 4px 0px #00000040;
    color: #FFF;

    h1 {
        font-family: Passion One;
        font-size: 106px;
    }

    h2 {
        font-family: Oswald;
        font-size: 43px;
        margin: 8px 0px;
    }
`;