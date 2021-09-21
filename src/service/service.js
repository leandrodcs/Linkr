import { saveToLocalStorage } from "../utils/localStorageUtils";
import { textWithLowercaseHashtags } from "../utils/TextAdjustmentsUtils";
import { sendAlert } from "../utils/helpers/Alerts";

import axios from "axios";

const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v3/linkr";

function createConfig(userToken) {
    const config = {
        headers: {
            Authorization: `Bearer ${userToken}`
        }
    }
    return config;
}

function createNewUser(body, history, setIsButtonEnabled) {
    axios.post(`${URL}/sign-up`, body)
        .then(resp => {
            sendAlert("success", "Beleza!", "Cadastro realizado com sucesso!");
            history.push("/");
        })
        .catch(err => {
            if(err.response.status === 403) sendAlert("error", "E-mail já cadastrado!","Por favor, tente novamente com outro email...");
            if(err.response.status === 400) sendAlert("error", "Oops!","Por favor, Preencha os campos corretamente...");
            else sendAlert("error", "Erro no servidor!","Por favor, tente novamente...");
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
            if(err.response.status === 403) sendAlert("error", "E-mail e/ou senha incorretos!","Por favor, Preencha os campos corretamente...");
            else sendAlert("error", "Erro no servidor!","Por favor, tente novamente...");
            setIsButtonEnabled(true);
        });
}

function getTimelinePosts(userToken , setPosts) {
    axios.get(`${URL}/posts`,createConfig(userToken))
    .then(resp => {
        setPosts(resp.data.posts);
    })
    .catch(error => {
        sendAlert("error", "Houve uma falha ao obter os posts!","Nos desculpe! A página será atualizada");
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
        sendAlert("error", "Houve uma falha ao obter os posts!","Nos desculpe! A página será atualizada");
        localStorage.clear();
        window.open("/","_self");
    });
}

function getUserLikes(userToken, setUserLikes, setLoading) {
    axios.get(`${URL}/posts/liked`, createConfig(userToken))
    .then(res => {
        setUserLikes(res.data.posts);
        setLoading(false);
    })
    .catch(err => {
        setLoading(false);
        sendAlert("error", "Houve uma falha ao obter os posts!","Nos desculpe! A página será atualizada");
        localStorage.clear();
        window.open("/","_self");
    });
}

function deletePostFromServer(userToken, postId, setOpenModal, setIsDataBeingEvaluated) {
    axios.delete(`${URL}/posts/${postId}`, createConfig(userToken))
    .then(res => {
        setIsDataBeingEvaluated(false);
        setOpenModal(false);
    })
    .catch(err => {
        sendAlert("error", "Oops!","Seu post não pôde ser excluído! Tente novamente...");
        setIsDataBeingEvaluated(false);
        setOpenModal(false);
    });
}

function publishEditedPost(editedMsg, postId, userToken, setIsDataBeingEvaluated, setIsEditing) {
    const body = {
        text: textWithLowercaseHashtags(editedMsg)
    }
    axios.put(`${URL}/posts/${postId}`, body, createConfig(userToken))
    .then(res => {
        setIsDataBeingEvaluated(false);
        setIsEditing(false);
    })
    .catch(err => {
        sendAlert("error", "Oops!","Seu post não pôde ser editado! Tente novamente...");
        setIsDataBeingEvaluated(false);
    });
}

function publishNewPost(body, userToken, setIsDataBeingEvaluated,setNewPost){
    const adjustedBody = {...body, text: textWithLowercaseHashtags(body.text)}
    axios.post(`${URL}/posts`, adjustedBody, createConfig(userToken))
    .then( resp => {
        setIsDataBeingEvaluated(false);
        setNewPost({ text:"",link:"" })
    })
    .catch( error => {
        sendAlert("error", "Oops!","Seu post não pôde ser publicado! Tente novamente...");
        setIsDataBeingEvaluated(false);
    })
}

function getTrendingTopics( userToken, setTrendingTopics ) {
    axios.get(`${URL}/hashtags/trending`,createConfig(userToken))
    .then( resp => {
        setTrendingTopics(resp.data.hashtags);
    })
    .catch( error => {
        sendAlert("error", "Oops!","Não conseguimos carregar os Trendings! Por favor, tente atualizar a página...");
    })
}

function getUserData( userToken, userId, setUsername ) {
    axios.get(`${URL}/users/${userId}`,createConfig(userToken))
    .then( resp => {
        setUsername(resp.data.user.username);
    })
    .catch( error => {
        sendAlert("error", "Houve uma falha ao obter os dados do usuário!","Nos desculpe! A página será atualizada");
        localStorage.clear();
        window.open("/","_self");
    })
}

function getHashtagPosts(userToken, hashtag, setHashtagPosts, setLoading) {
    axios.get(`${URL}/hashtags/${hashtag}/posts`, createConfig(userToken))
    .then(res => {
        setHashtagPosts(res.data.posts);
        setLoading(false);
    })
    .catch(err => {
        setLoading(false);
        sendAlert("error", "Houve uma falha ao obter os posts!","Nos desculpe! A página será atualizada");
        localStorage.clear();
        window.open("/","_self");
    });
}

function likePost( postID, userToken, setLikes, isLiked, setIsLiked ) {
    axios.post(`${URL}/posts/${postID}/${isLiked ? "dislike" : "like" }`, "", createConfig(userToken))
        .then(resp => {
            setLikes(resp.data.post.likes);
        })
        .catch(err => {
            sendAlert("error", "Erro no servidor!","Por favor, tente novamente...");
            setIsLiked(isLiked);
        });
}

function getFollowingList( userToken, setFollowingList ) {
    axios.get(`${URL}/users/follows`, createConfig(userToken))
        .then(resp => {
            setFollowingList(resp.data.users);
        })
        .catch(err => {
            sendAlert("error", "Erro no servidor!","Por favor, tente novamente...");
        });
}

function followUser( userToken, followingID, isFollowing, setIsDataBeingEvaluated ) {
    setIsDataBeingEvaluated(true);
    axios.post(`${URL}/users/${followingID}/${isFollowing ? "unfollow" : "follow"}`, "", createConfig(userToken))
        .then(resp => {
            setIsDataBeingEvaluated(false);
        })
        .catch(err => {
            sendAlert("error", "Não foi possível executar a ação!","Por favor, tente novamente...");
            setIsDataBeingEvaluated(false);
        });
}

export {
    createNewUser,
    login,
    getTimelinePosts,
    getUserPosts,
    getUserLikes,
    publishNewPost,
    getTrendingTopics,
    likePost,
    getUserData,
    deletePostFromServer,
    getHashtagPosts,
    publishEditedPost,
    getFollowingList,
    followUser
};
