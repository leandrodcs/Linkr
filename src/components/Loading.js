import styled from "styled-components";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

export default function Loading() {
    return (
        <Wrapper>
            <SpinLoader
                type="TailSpin"
                color="#FFFFFF"
                height={300}
                width={300}
            />
            Carregando...
        </Wrapper>
    );
}

const Wrapper = styled.div`
    width: 601px;
    font-family: 'Oswald', sans-serif;
    font-size: 40px;
    color: #FFF;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const SpinLoader = styled(Loader)`
    margin-bottom: 50px;
`