import styled from "styled-components";
import Header from "../../components/Header";

export default function MyPosts() {

    function deletePost() {
    }

    return (
        <>
        <Header />
        <TestBox>
            <button></button>
            <button></button>
        </TestBox>
        </>
    );
}

const TestBox = styled.div`

    width: 500px;
    height: 300px;
    background: red;
    margin-top: 200px;
    margin-left: 100px;
    display: flex;
    gap: 30px;
    padding: 20px;
    button {
        width: 30px;
        height: 30px;
    }
`;
