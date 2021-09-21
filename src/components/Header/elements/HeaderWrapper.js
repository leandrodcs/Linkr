import styled from "styled-components";

const HeaderWrapper= styled.header`
    height: 72px;
    width: 100%;
    background: #151515;
    display: flex;
    justify-content: space-between;
    gap: 30px;
    align-items: center;
    position: fixed;
    color: #FFFFFF;
    top: 0;
    left: 0;
    z-index: 3;
    a {
        margin-left: 28px;
        font-weight: bold;
        font-size: 49px;
        text-decoration: none;
        letter-spacing: 0.05em;
        font-family: 'Passion One', cursive;
        transition: 0.1s;
        -webkit-tap-highlight-color: rgba(0,0,0,0);
    }

    @media(max-width: 637px) {
        a {
            margin-left: 17px;
            font-size: 45px;
        }
    }
`;

export default HeaderWrapper;