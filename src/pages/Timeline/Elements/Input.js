import styled from "styled-components";

const Input = styled.input`
    width: 100%;
    height: 30px;
    margin: 10px 0px;
    padding-left: 15px;
    display: inline-block;
    background-color: #EFEFEF;
    font-family: 'Lato', sans-serif;
    border: none;
    border-radius: 5px;
    &::placeholder {
        color: #949494;
        font-weight: 300;
    }
`

export default Input;