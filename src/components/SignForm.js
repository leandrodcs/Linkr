import { Link } from "react-router-dom";
import styled from "styled-components";

export default function SignForm({isSignUp}) {
    return (
        <Form>
            <input type="email" placeholder="e-mail" required />
            <input type="password" placeholder="password" required />
            {isSignUp ?
                <>
                    <input type="text" placeholder="username" required />
                    <input type="url" placeholder="picture url" required />
                </>
                : ""
            }
            <button type="submit">{isSignUp ? "Sign Up" : "Log In"}</button>
            {isSignUp ? 
                <Link to="/sign-in">Switch back to log in</Link>
                :
                <Link to="/sign-up">First time? Create an account!</Link>
            }
        </Form>
    );
}

const Form = styled.form`
    width: 535px;
    height: 100vh;
    padding: 0px 54px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    input {
        width: 100%;
        height: 65px;
        border-radius: 6px;
        border: none;
        padding: 12px 16px;
        margin: 6px 0px;
        font-family: Oswald;
        font-size: 27px;
        color: #151515;
    }

    input::placeholder {
        font-family: Oswald;
        font-size: 27px;
        color: #9F9F9F;
    }

    button {
        width: 100%;
        height: 65px;
        border-radius: 6px;
        border: none;
        margin: 6px 0px;
        background-color: #1877F2;
        font-family: Oswald;
        font-size: 27px;
        color: #FFF;
    }

    a {
        text-decoration: none;
        font-family: Lato;
        font-size: 20px;
        color: #FFF;
        margin: 6px 0px;
        padding-bottom: 2px;
        border-bottom: 1px solid #FFF;
    }

    @media (max-width: 937px) {
        width: 100vw;
        padding: 0px 22px;
        justify-content: initial;
        margin-top: 40px;

        input {
            height: 55px;
            font-size: 22px;
        }

        input::placeholder {
            font-size: 22px;
        }

        button {
            height: 55px;
            font-size: 22px;
        }

        a {
            font-size: 17px;
            margin-top: 10px
        }
    }
`;