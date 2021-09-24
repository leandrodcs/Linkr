import Modal from "../../Modals/RepostModal";

import { formattedNumberOfInteractions } from "../../../utils/PostsUtils";
import PostContext from "../../../contexts/PostContext";

import styled from "styled-components";
import { FaRetweet } from "react-icons/fa";
import { useContext, useState } from "react";


export default function Reposts() {
    const { repostCount } = useContext(PostContext);
    const [openModal, setOpenModal] = useState(false);

    return (
        <Wrapper>
            <RepostButton onClick = { () => setOpenModal(true) } />
            <p>
                { formattedNumberOfInteractions(repostCount, "re-post") }
            </p>
            {openModal ? <Modal setOpenModal={setOpenModal} /> : ""}
        </Wrapper>
    );
}

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
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
        & p {
            font-size: 11px;
        }
    }
`

const RepostButton = styled(FaRetweet)`
    font-size: 20px;
    font-weight: 700;
    color: #FFF;
    cursor: pointer;
    margin-bottom: 4px;

    @media(max-width: 637px) {
        font-size: 17px;
    }
`;