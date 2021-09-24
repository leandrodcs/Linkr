import styled from "styled-components";

const SuggestionWindow = styled.ul `

    border-radius: 8px;
    position: absolute;
    top: 44px;
    left: 0;
    background: #E7E7E7;
    width: 100%;
    max-height: 385px;
    display: flex;
    flex-direction: column;
    overflow-y: ${({userList}) => userList.length > 6 ? `scroll` : `auto`};

    li {
        display: flex;
        padding: 8px 15px;
        align-items: center;
        font-size: 19px;
        line-height: 23px;
        color: #515151;
        text-overflow: hidden;
        cursor: pointer;
        :hover {
            background: ${({userList}) => userList.length ? `lightgray` : `auto`};
        }
    }

    img {
        width: 39px;
        height: 39px;
        border-radius: 304px;
        margin-right: 12px;
        object-fit: cover;
    }

    p {
        display: flex;
        width: 100%;
        line-height: 30px;
        overflow-x: hidden;
        white-space: nowrap;
    }

    @media(max-width: 637px) {
        li {
            font-size: 17px;
        }
        img {
        width: 35px;
        height: 35px;
        }
    }
`;

export default SuggestionWindow;
