import Form from "./elements/Form";
import Input from "./elements/Input";
import Button from "./elements/Button";

import { createNewUser, login } from "../../service/service";
import UserContext from "../../contexts/UserContext";

import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";

export default function SignForm({isSignUp}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [pictureUrl, setPictureUrl] = useState("");
    const [isButtonEnabled, setIsButtonEnabled] = useState(true);
    const history = useHistory();
    const {setUser} = useContext(UserContext);

    function signHelper(event) {
        event.preventDefault();
        setIsButtonEnabled(false);
        let body;

        if(isSignUp) {
            body = {
                email,
                password,
                username,
                pictureUrl
            }
            createNewUser(body, history, setIsButtonEnabled);
        }
        else {
            body = {
                email,
                password
            }
            login(body, setUser, setIsButtonEnabled, history);
        }

    }

    return (
        <Form onSubmit={isButtonEnabled ? signHelper : e => e.preventDefault()}>
            <Input
                type="email"
                placeholder="e-mail"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
            />
            <Input
                type="password"
                placeholder="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
            />
            {isSignUp ?
                <>
                    <Input
                        type="text"
                        placeholder="username"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        required
                    />
                    <Input
                        type="url"
                        placeholder="picture url"
                        value={pictureUrl}
                        onChange={e => setPictureUrl(e.target.value)}
                        required
                    />
                </>
                : ""
            }
            <Button type="submit" isButtonEnabled={isButtonEnabled}>{isSignUp ? "Sign Up" : "Log In"}</Button>
            {isSignUp ? 
                <Link to="/">Switch back to log in</Link>
                :
                <Link to="/sign-up">First time? Create an account!</Link>
            }
        </Form>
    );
}