import styled from "styled-components";

const HeaderWrapper= styled.header`
    height: 72px;
    width: 100%;
    background: #151515;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 3;

    a {
        color: #FFFFFF;
        margin-left: 28px;
        font-weight: bold;
        font-size: 49px;
        text-decoration: none;
        letter-spacing: 0.05em;
        font-family: 'Passion One', cursive;
        transition: 0.3s;
        -webkit-tap-highlight-color: rgba(0,0,0,0);
    }

    div {
        display: flex;
        align-items: center;
        gap: 16px;
        margin-right: 17px;
        color: #FFFFFF;
        font-size: 25px;
    }

    svg {
        transform: rotate(${({showNavBar}) => showNavBar ? `180deg` : `0deg`});
        transition: 0.3s;
    }

    img {
        width: 53px;
        height: 53px;
        border-radius: 26.5px;
        object-fit: cover;
        transition: 0.3s;
    }

    @media(max-width: 937px) {
        a {
        margin-left: 17px;
        font-size: 45px;
        }

        div {
            gap: 12px;
            margin-right: 14px;
            font-size: 20px;
        }
        
        img {
        width: 44px;
        height: 44px;
        }
    }
`;

export default HeaderWrapper;