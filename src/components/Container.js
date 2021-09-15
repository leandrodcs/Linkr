import styled from "styled-components";
import { containerPadding} from "../utils/MarginAndPaddingUtils"

const Container = styled.main`
    width: 100%;
    min-height: 101vh;
    padding: 72px ${containerPadding(611,25,301)} 40px;
    background-color: #333333;
    display: flex;
    justify-content: space-between;

    @media(max-width: 937px) {
        padding: 72px 0px 40px;
    }

`
export default Container