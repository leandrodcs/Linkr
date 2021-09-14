import LoginCover from "../../components/LoginCover";

import styled from "styled-components";

export default function SignUp() {
    return (
        <Wrapper>
            <LoginCover />
        </Wrapper>
    );
}

const Wrapper = styled.div`
    background-color: #333333;
    display: flex;
`;