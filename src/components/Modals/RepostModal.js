import DataEvaluationContext from "../../contexts/DataEvaluationContext";
import UserContext from "../../contexts/UserContext";
import PostContext from "../../contexts/PostContext";
import { repostPost } from "../../utils/PostsUtils";

import styled from "styled-components";
import { useContext } from "react";

export default function Modal({openModal, setOpenModal}) {

    const {isDataBeingEvaluated, setIsDataBeingEvaluated} = useContext(DataEvaluationContext);
    const { login } = useContext(UserContext);
    const { id } = useContext(PostContext)

    return(
        <Background openModal={openModal}>
            <DialogBox reposting={isDataBeingEvaluated} openModal={openModal} >
                {isDataBeingEvaluated ? <h1>Repostando...</h1> : 
                <>
                    <h1>Tem certeza que deseja<br/>repostar essa publicação?</h1>
                    <Buttons>
                        <button onClick={() => setOpenModal(false)}>Não, voltar</button>
                        <button onClick = { () => repostPost(login.token, id, setIsDataBeingEvaluated, setOpenModal) }>Sim, repostar</button>
                    </Buttons>
                </>}
            </DialogBox>
        </Background>
    );
}

const Buttons = styled.div`
    display: flex;
    gap: 27px;
`;

const Background = styled.div`
    position: fixed;
    z-index: 5;
    top: 0;
    left: 0;
    width: 100%;
    height: ${({openModal}) => openModal ? `100%` : `0px`};
    overflow: hidden;
    background: rgba(255, 255, 255, 0.75);
    display: flex;
    align-items: center;
    justify-content: center;
`;

const DialogBox = styled.div`
    background: red;
    width: 597px;
    height: 262px;
    background: #333333;
    border-radius: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: ${({reposting}) => reposting ? `center` : `initial`};
    padding-top: 38px;
    font-weight: 700;
    transition: 0.1s;
    overflow: hidden;
    margin-bottom: ${({openModal}) => openModal ? `0px` : `100px`};
    h1 {
        margin-bottom: 40px;
        font-size: 34px;
        line-height: 41px;
    }
    button {
        width: 134px;
        height: 37px;
        border-radius: 5px;
        cursor: pointer;
        font-size: 18px;
    }
    button:nth-child(1) {
        background: #FFFFFF;
        color: #1877F2;
    }
    button:nth-child(2) {
        background: #1877F2;
        color: #FFFFFF;
    }

    @media(max-width: 637px) {
        width: 418px;
        height: 183.4px;
        font-size: 20px;
        h1 {
        margin-bottom: 30px;
        font-size: 24px;
        line-height: 30px;
        }
        button {
        width: 94px;
        height: 26px;
        font-size: 14px;
        }
    }
`;
