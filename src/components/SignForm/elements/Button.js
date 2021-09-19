import styled from "styled-components";

const Button = styled.button`
    width: 100%;
    height: 65px;
    border-radius: 6px;
    border: none;
    margin: 6px 0px;
    background-color: #1877F2;
    font-family: Oswald;
    font-size: 27px;
    color: #FFF;
    opacity: ${props => props.isButtonEnabled ? 1 : 0.5};

    @media (max-width: 937px) {
        height: 55px;
        font-size: 22px;
    }
`;

export default Button;