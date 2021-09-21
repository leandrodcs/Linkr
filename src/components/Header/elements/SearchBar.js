import styled from "styled-components";

const SearchBar = styled.div`
    width: 563px;
    min-height: 45px;
    background: #FFFFFF;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #C6C6C6;
    position: relative;
    font-family: 'Lato', sans-serif;
    z-index: 10;

    input {
        position: absolute;
        font-size: 19px;
        width: 100%;
        margin-right: 10px;
        outline: none;
        border: none;
        height: 45px;
        border-radius: 8px;
        padding: 0 50px 0 17px;
        z-index: 1;
}

    input::placeholder {
        color: #C6C6C6;
    }

    svg {
        transform: rotate(270deg);
        font-size: 21px;
        cursor: pointer;
        position: absolute;
        top: 50%;
        right: 15px;
        transform: translateY(-50%);
        z-index: 1;
    }

    @media(max-width: 637px) {
        position: fixed;
        left: 50%;
        transform: translateX(-50%);
        top: 82px;
        width: 350px;
        height: 45px;

        input {
            font-size: 17px;
        }
    }

`;

export default SearchBar;