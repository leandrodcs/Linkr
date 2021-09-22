import styled from "styled-components";

const Input = styled.input`
    width: 100%;
    height: 30px;
    margin: 10px 0px;
    padding-left: 15px;
    display: inline-block;
    background-color: ${ ({isPublishing}) => isPublishing ? "#E2E2E2" : "#EFEFEF" };
    color: ${ ({isPublishing}) => isPublishing ? "#777" : "#000" };
    font-family: 'Lato', sans-serif;
    font-size: 15px;
    border: none;
    border-radius: 5px;
    z-index: 0;
    &::placeholder {
        color: #949494;
        font-weight: 300;
    }
    @media(max-width: 637px) {
        font-size: 13px;
    }
`

export default Input;