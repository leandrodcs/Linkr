import styled from "styled-components";

const Form = styled.form`
    width: 535px;
    height: 100vh;
    padding: 0px 54px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #FFF;

    a {
        text-decoration: none;
        font-family: Lato;
        font-size: 20px;
        margin: 6px 0px;
        padding-bottom: 2px;
        border-bottom: 1px solid #FFF;
    }

    @media (max-width: 637px) {
        width: 100vw;
        padding: 0px 22px;
        justify-content: initial;
        margin-top: 40px;

        a {
            font-size: 17px;
            margin-top: 10px;

        }
    }
`;

export default Form;