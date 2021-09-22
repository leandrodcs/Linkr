import styled from "styled-components";

const DropDownMenu = styled.div `
    display: flex;
    align-items: center;
    gap: 16px;
    padding-right: 17px;
    color: #FFFFFF;
    font-size: 25px;
    cursor: pointer;
    -webkit-tap-highlight-color: rgba(0,0,0,0);

    :hover {
        color: #1877F2;
    }

    svg {
        transform: rotate(${({showNavBar}) => showNavBar ? `180deg` : `0deg`});
        transition: 0.1s;
    }

    img {
        width: 53px;
        height: 53px;
        border-radius: 26.5px;
        object-fit: cover;
        transition: 0.1s;
    }

    @media(max-width: 637px) {
        
        div {
            gap: 12px;
            padding-right: 14px;
            font-size: 20px;
        }
        img {
        width: 44px;
        height: 44px;
        }
`;

export default DropDownMenu;