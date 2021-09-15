import axios from "axios";

const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr";

function createNewUser(body, history, setUser) {
    axios.post(`${URL}/sign-up`, body)
        .then(resp => {
            setUser(resp.data);
            history.push("/");
        })
        .catch(err => {
            if(err.response.status === 400) alert("E-mail já cadastrado!");
            else alert("Erro no servidor\nTente novamente...");
        });
}

function login(body, history, setUser) {
    axios.post(`${URL}/sign-in`, body)
        .then(resp => {
            setUser(resp.data);
            history.push("/timeline");
        })
        .catch(err => {
            if(err.response.status === 403) alert("E-mail e/ou senha incorretos!");
            else alert("Erro no servidor\nTente novamente...");
        });
}

export {
    createNewUser,
    login
};