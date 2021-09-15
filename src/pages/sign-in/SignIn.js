import SignForm from "../../components/SignForm";
import LoginCover from "../../components/LoginCover";

import { getFromLocalStorage } from "../../utils/localStorageUtils";
import UserContext from "../../contexts/UserContext";

import styled from "styled-components";
import { useHistory } from "react-router";
import { useContext, useEffect } from "react";

export default function SignIn() {
    const { user, setUser } = useContext(UserContext);
    const history = useHistory();

    useEffect((() => {
        setUser(getFromLocalStorage());
    }), []);

    if(user.token) history.push("/timeline");

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