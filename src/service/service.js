import { saveToLocalStorage } from "../utils/localStorageUtils";
import axios from "axios";

const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr";

function createConfig(userToken) {
    const config = {
        headers: {
            Authorization: `Bearer ${userToken}`
        }
    }
    return config
}

function createNewUser(body, history, setUser, setIsButtonEnabled) {
    axios.post(`${URL}/sign-up`, body)
        .then(resp => {
            setUser(resp.data);
            history.push("/");
        })
        .catch(err => {
            if(err.response.status === 400) alert("E-mail já cadastrado!");
            else alert("Erro no servidor\nTente novamente...");
            setIsButtonEnabled(true);
        });
}

function login(body, history, setUser, setIsButtonEnabled) {
    axios.post(`${URL}/sign-in`, body)
        .then(resp => {
            setUser(resp.data);
            saveToLocalStorage(resp.data);
            history.push("/timeline");
        })
        .catch(err => {
            if(err.response.status === 403) alert("E-mail e/ou senha incorretos!");
            else alert("Erro no servidor\nTente novamente...");
            setIsButtonEnabled(true);
        });
}

function getTimelinePosts(userToken , setPosts, browsingHistory) {
    axios.get(`${URL}/posts`,createConfig(userToken))
    .then(resp => {
        setPosts(resp.data.posts);
    })
    .catch(error => {
        alert("Houve uma falha ao obter os posts! A página será atualizada");
        browsingHistory.push("/");
    })
}

export {
    createNewUser,
    login,
    getTimelinePosts
};
