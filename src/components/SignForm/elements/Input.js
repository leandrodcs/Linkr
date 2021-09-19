import styled from "styled-components";

const Input = styled.input`
    width: 100%;
    height: 65px;
    border-radius: 6px;
    border: none;
    padding: 12px 16px;
    margin: 6px 0px;
    font-family: Oswald;
    font-size: 27px;
    color: #151515;

    &::placeholder {
        font-family: Oswald;
        font-size: 27px;
        color: #9F9F9F;
    }

    @media (max-width: 937px) {
        height: 55px;
        font-size: 22px;
        
        &::placeholder {
            font-size: 22px;
        }
    }
`;

export default Input;