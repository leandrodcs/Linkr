import SignForm from "../../components/SignForm/SignForm";

import LoginCover from "../../components/LoginCover/LoginCover";

import styled from "styled-components";

export default function SignUp() {
    return (
        <Wrapper>
            <LoginCover />
            <SignForm isSignUp={true} />
        </Wrapper>
    );
}

const Wrapper = styled.main`
    background-color: #333333;
    display: flex;

    @media (max-width: 937px) {
        background-color: #333333;
        display: inherit;
    }
`;