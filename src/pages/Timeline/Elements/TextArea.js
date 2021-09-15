import styled from "styled-components";

const TextArea = styled.textarea`
    width: 100%;
    height: 66px;
    margin-bottom: 36px;
    padding: 8px 15px;
    display: inline-block;
    background-color: #EFEFEF;
    font-family: 'Lato', sans-serif;
    border: none;
    resize: none;
    border-radius: 5px;
    &::placeholder {
        color: #949494;
        font-weight: 300;
    }
`

export default TextArea;