import styled from "styled-components";
import { ContainerMarginLeft, ContainerMarginRight } from "../utils/utils";

const Container = styled.section`
    box-sizing: border-box;
    width: 100vw;
    height: 100vh;
    margin-top: 5px;
    padding: 72px ${ContainerMarginRight(661,25,301)} 0px ${ContainerMarginLeft(661,25,301)};
    background-color: #333333;
    overflow: scroll;
`

export default Container