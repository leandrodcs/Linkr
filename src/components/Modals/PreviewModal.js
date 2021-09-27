import Loading from "../Loading/Loading";

import PostContext from "../../contexts/PostContext";
import { OpenLinkInNewPage } from "../../utils/PostsUtils";

import styled from "styled-components";
import { AiOutlineClose } from "react-icons/ai"
import { useContext, useState } from "react";

export default function Modal({setOpenModal}) {

    const { link } = useContext(PostContext);
    const [loading, setLoading] = useState(true);

    return(
        <Background>
            <DialogBox >
                <Header>
                    <NewTabButton onClick = { () => OpenLinkInNewPage(link) }  >
                        Open in new tab
                    </NewTabButton>
                    <ExitButton onClick = { () => setOpenModal(false) } >
                        <AiOutlineClose />
                    </ExitButton>
                </Header>
                {loading ? <Loading  /> : ""}
                <Preview
                    src = { link }
                    onLoad = { () => setLoading(false) }
                    display = { !loading }
                />
            </DialogBox>
        </Background>
    ) 
}

const Background = styled.div`
    position: fixed;
    z-index: 12;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: rgba(255, 255, 255, 0.75);
    display: flex;
    align-items: center;
    justify-content: center;
`;

const DialogBox = styled.div`
    background: red;
    width: 80vw;
    height: 95vh;
    background: #333333;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: initial;
    padding: 16px 24px;
    transition: 0.1s;
    overflow: hidden;
    margin-bottom: 0px;

    @media(max-width: 637px) {
        width: 95vw;
    }
`;

const Header = styled.div`
    width: 100%;
    height: 48px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
`

const NewTabButton = styled.button`
    width: 138px;
    height: 31px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    background-color: #1877F2;
    font-family: 'Lato', sans-serif;
    font-weight: 700;
    font-size: 14px;
    color: #FFFFFF;
    cursor: pointer;
`

const ExitButton = styled.button`
    font-size: 30px;
    color: #FFFFFF;
    cursor: pointer;
`

const Preview = styled.iframe`
    width: 100%;
    height: calc( 100% - 48px );
    display: ${ ({display}) =>  display ? "block" : "none"};
`