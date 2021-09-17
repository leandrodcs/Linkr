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

function getUserPosts(userToken, userId, setUserPosts, setLoading) {
    axios.get(`${URL}/users/${userId}/posts`, createConfig(userToken))
    .then(res => {
        setUserPosts(res.data.posts);
        setLoading(false);
    })
    .catch(err => {
        setLoading(false);
        alert(err);
    });
}

function deletePostFromServer(userToken, postId, setDeleting, setOpenModal) {
    axios.delete(`${URL}/posts/${postId}`, createConfig(userToken))
    .then(res => {
        console.log(res);
        window.location.reload();
    })
    .catch(err => {
        alert("Houve um erro e seu post não pôde ser excluído!");
        setOpenModal(false);
        setDeleting(false);
    });

}

function publishNewPost(body, userToken, setIsDataBeingEvaluated,setNewPost){
    axios.post(`${URL}/posts`, body, createConfig(userToken))
    .then( resp => {
        setIsDataBeingEvaluated(false);
        setNewPost({ text:"",link:"" })
    })
    .catch( error => {
        alert("Parece que houve um erro! Tente novamente mais tarde")
        setIsDataBeingEvaluated(false);
    })
}

function getTrendingTopics( userToken, setTrendingTopics ) {
    axios.get(`${URL}/hashtags/trending`,createConfig(userToken))
    .then( resp => {
        setTrendingTopics(resp.data.hashtags);
    })
    .catch( error => {
        alert("Parece que houve um erro com os Trending Topics! Tente novamente mais tarde")

    })
}

export {
    createNewUser,
    login,
    getTimelinePosts,
    getUserPosts,
    publishNewPost,
    getTrendingTopics,
    deletePostFromServer,
};
