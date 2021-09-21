import { containerPadding } from "../../utils/MarginAndPaddingUtils"

import styled from "styled-components";

const Container = styled.main`
    width: 100%;
    min-height: 101vh;
    padding: 72px ${containerPadding(611,25,301)} 40px;
    background-color: #333333;
    display: flex;
    justify-content: space-between;

    @media(max-width: 937px) {
        flex-direction: column;
        align-items: center;
    }

    @media(max-width: 637px) {
        padding: 136px 0px 40px;
    }

`
export default Container