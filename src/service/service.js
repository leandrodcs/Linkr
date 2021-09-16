
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

function createNewUser(body, history, setIsButtonEnabled) {
    axios.post(`${URL}/sign-up`, body)
        .then(resp => {
            alert("Cadastro realizado com sucesso!");
            history.push("/");
        })
        .catch(err => {
            if(err.response.status === 403) alert("E-mail já cadastrado!");
            if(err.response.status === 400) alert("Preencha os campos corretamente!");
            else alert("Erro no servidor\nTente novamente...");
            setIsButtonEnabled(true);
        });
}

function login(body, setLogin, setIsButtonEnabled, history) {
    axios.post(`${URL}/sign-in`, body)
        .then(resp => {
            saveToLocalStorage(resp.data);
            history.push("/timeline");
            setLogin(resp.data);
        })
        .catch(err => {
            if(err.response.status === 403) alert("E-mail e/ou senha incorretos!");
            else alert("Erro no servidor\nTente novamente...");
            setIsButtonEnabled(true);
        });
}

function getTimelinePosts(userToken , setPosts) {
    axios.get(`${URL}/posts`,createConfig(userToken))
    .then(resp => {
        setPosts(resp.data.posts);
    })
    .catch(error => {
        alert("Houve uma falha ao obter os posts! A página será atualizada");
        localStorage.clear();
        window.open("/","_self");
    })
}

function getUserPosts(token, userId, setUserPosts, setLoading) {
    const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/users/${userId}/posts`, config)
        .then(res => {
            setUserPosts(res.data.posts);
            setLoading(false);
        })
        .catch(err => {
            setLoading(false);
            alert(err)});
}

export {
    createNewUser,
    login,
    getTimelinePosts,
    getUserPosts,
};