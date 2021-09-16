import styled from "styled-components";

const DropDownWindow = styled.nav`
    width: 150px;
    height: 109px;
    background: #171717;
    border-radius: ${({showNavBar}) => showNavBar ? `0px 0px 20px 20px` : `5px`};
    position: fixed;
    z-index: 2;
    top: ${({showNavBar}) => showNavBar ? `72px` : `-37px`};
    right: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 10px 0px 17px;
    transition: 0.3s;
    color: #FFFFFF;

    a {
        font-size: 17px;
        line-height: 20px;
        letter-spacing: 0.05em;
        text-decoration: none;
        font-family: 'Lato', sans-serif;
        font-weight: 700;
        -webkit-tap-highlight-color: rgba(0,0,0,0);
    }

    @media(max-width: 937px) {
        width: 150px;
        height: 97px;
        padding-top: 8px;
        padding-bottom: 15px;
        
        a {
            font-size: 15px;
            line-height: 18px;
        }
    }
`;

export default DropDownWindow;