import SignForm from "../../components/SignForm";

import LoginCover from "../../components/LoginCover";

import styled from "styled-components";

export default function SignIn() {
    return (
        <Wrapper>
            <LoginCover />
            <SignForm />
        </Wrapper>
    );
}

const Wrapper = styled.div`
    background-color: #333333;
    display: flex;

    @media (max-width: 937px) {
        background-color: #333333;
        display: inherit;
    }
`;