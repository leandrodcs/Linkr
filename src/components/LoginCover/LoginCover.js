import CoverLogo from "./elements/CoverLogo";
import CoverText from "./elements/CoverText";

import styled from "styled-components";

export default function LoginCover() {
    return (
        <Wrapper>
            <CoverLogo>linkr</CoverLogo>
            <CoverText>save, share and discover</CoverText>
            <CoverText>the best links on the web</CoverText>
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

    @media (max-width: 637px) {
        width: 100%;
        height: 175px;
        padding: 10px 0px 28px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        box-shadow: 0px 4px 4px 0px #00000040;
    }
`;