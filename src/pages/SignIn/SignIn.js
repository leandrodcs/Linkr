import SignForm from "../../components/SignForm/SignForm";
import LoginCover from "../../components/LoginCover/LoginCover";

import styled from "styled-components";
import { useHistory } from "react-router";

export default function SignIn({skipThisPage}) {
    const history = useHistory();

    if(skipThisPage) history.push("/timeline");

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

    @media (max-width: 637px) {
        background-color: #333333;
        display: inherit;
    }
`;