import SignForm from "../../components/SignForm";

import LoginCover from "../../components/LoginCover";

import styled from "styled-components";
import { Link } from "react-router-dom";

export default function SignUp() {
    return (
        <Wrapper>
            <LoginCover />
            <SignForm isSignUp={true} />
        </Wrapper>
    );
}

const Wrapper = styled.div`
    background-color: #333333;
    display: flex;
`;