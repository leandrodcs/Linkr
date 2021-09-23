import { formattedNumberOfInteractions } from "../../../utils/PostsUtils";

import styled from "styled-components";
import { AiOutlineComment } from "react-icons/ai";


export default function CommentsButton() {

    return (
        <Wrapper>
            <RepostButton />
            <p>
                { formattedNumberOfInteractions(12, "comment") }
            </p>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
    & p {
        font-size: 11px;
        font-weight: 400;
        color: #FFFFFF;
        text-align: center;
    }
    & span {
        font-weight: 700;
        font-size: 11px;
    }

    @media(max-width: 637px) {
        margin-bottom: 17px;
        & p {
            font-size: 11px;
        }
    }
`

const RepostButton = styled(AiOutlineComment)`
    font-size: 20px;
    font-weight: 700;
    color: #FFF;
    cursor: pointer;
    margin-bottom: 4px;

    @media(max-width: 637px) {
        font-size: 17px;
    }
`;