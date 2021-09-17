import { useState } from "react";
import styled from "styled-components";
import {deletePostFromServer} from "../service/service";

export default function Modal({token, setOpenModal, id}) {

    const [deleting, setDeleting] = useState(false);

    function deletePost() {
        setDeleting(true);
        deletePostFromServer(token, id, setDeleting, setOpenModal);
    }

    return(
        <Background>
            <DialogBox deleting={deleting}>
                {deleting ? <h1>Excluindo...</h1> : 
                <>
                    <h1>Tem certeza que deseja<br/>excluir essa publicação?</h1>
                    <Buttons>
                        <button onClick={() => setOpenModal(false)}>Não, voltar</button>
                        <button onClick={deletePost}>Sim, excluir</button>
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
    z-index: 1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.8);
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
    justify-content: ${({deleting}) => deleting ? `center` : `initial`};
    padding-top: 38px;
    font-weight: 700;
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
    }
    button:nth-child(1) {
        background: #FFFFFF;
        color: #1877F2;
    }
    button:nth-child(2) {
        background: #1877F2;
        color: #FFFFFF;
    }
`;
