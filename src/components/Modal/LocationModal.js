import styled from "styled-components";
import {AiOutlineClose} from "react-icons/ai";

export default function LocationModal({token, setOpenModal, id, openModal}) {

    return(
        <Background openModal={openModal}>
            <DialogBox >
                <>
                    <Header>
                        <h1>Juvenal's location</h1>
                        <Button onClick={() => setOpenModal(false)}>
                            <AiOutlineClose />
                        </Button>
                    </Header>
                    <Map></Map>
                </>
            </DialogBox>
        </Background>
    );
}

const Map = styled.div`
    width: 713px;
    height: 240px;
    background: red;
    border-radius: 5px;
`;

const Button = styled.button`
    cursor: pointer;
    color: #FFF;
    font-size: 30px;
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    h1 {
        font-weight: bold;
        font-size: 38px;
        line-height: 56px;
    }
`;

const Background = styled.div`
    position: fixed;
    z-index: 10;
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
    padding: 10px 40px 33px 40px;
    width: 790px;
    height: 354px;
    background: #333333;
    border-radius: 20px;
    transition: 0.1s;
    margin-bottom: ${({openModal}) => openModal ? `0px` : `100px`};
`;
