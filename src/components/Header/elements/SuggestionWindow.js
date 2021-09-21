import styled from "styled-components";

const SuggestionWindow = styled.ul `

    border-radius: 8px;
    position: absolute;
    top: 0;
    left: 0;
    background: #E7E7E7;
    padding: 60px 17px 23px 17px;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 16px;

    li {
        display: flex;
        align-items: center;
        font-size: 19px;
        line-height: 23px;
        color: #515151;
        text-overflow: hidden;
    }

    p {
        cursor: pointer;
    }

    img {
        width: 39px;
        height: 39px;
        border-radius: 304px;
        margin-right: 12px;
        cursor: pointer;
        object-fit: cover;
    }

    span {
        color: #C5C5C5;
        cursor: default;
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
