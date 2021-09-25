import SignForm from "../../components/SignForm/SignForm";
import LoginCover from "../../components/LoginCover/LoginCover";

import UserContext from "../../contexts/UserContext";
import TransitionContext from "../../contexts/TransitionContext";

import styled from "styled-components";
import { useHistory } from "react-router";
import { useContext } from "react";

export default function SignIn() {
    const history = useHistory();
    const { login } =useContext(UserContext);
    const { isTransitioning } = useContext(TransitionContext);

    if(!!login.token && !isTransitioning) {
        history.push("/timeline");
    } 

    return (
        <Wrapper>
            <LoginCover />
            <SignForm />
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