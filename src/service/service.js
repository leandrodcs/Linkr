import { saveToLocalStorage } from "../utils/localStorageUtils";

import axios from "axios";

const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr";

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

function login(body, setUser, setIsButtonEnabled, history) {
    axios.post(`${URL}/sign-in`, body)
        .then(resp => {
            saveToLocalStorage(resp.data);
            history.push("/timeline");
            setUser(resp.data);

        })
        .catch(err => {
            if(err.response.status === 403) alert("E-mail e/ou senha incorretos!");
            else alert("Erro no servidor\nTente novamente...");
            setIsButtonEnabled(true);
        });
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
    getUserPosts,
};