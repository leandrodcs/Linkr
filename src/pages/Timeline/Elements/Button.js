import styled from "styled-components"

const Button = styled.button`
    width: 112px;
    height: 31px;
    background-color: #1877F2;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #FFF;
    font-size: 14px;
    font-weight: 700;
    position: absolute;
    bottom: 0px;
    right: 0px;
    cursor: pointer;
    &:hover{
        opacity: 0.8;
    }
`

export default Button;