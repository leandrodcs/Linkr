import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import styled from "styled-components";

export default function Loading({scrollColor}) {
    const color = scrollColor||"#FFFFFF";
    return (
        <Wrapper>
            <SpinLoader
                type="TailSpin"
                color= {color}
                height={300}
                width={300}
            />
            Carregando...
        </Wrapper>
    );
}

const Wrapper = styled.div`
    width: 100%;
    font-family: 'Oswald', sans-serif;
    font-size: 40px;
    margin-top: 40px;
    color: #FFF;
    display: flex;
    flex-direction: column;
    align-items: center;
    
    @media(max-width: 637px) {
        width: 100%;

        svg {
            width: 170px;
            height: 170px;
        }
    }
`;

const SpinLoader = styled(Loader)`
    margin-bottom: 50px;
`;