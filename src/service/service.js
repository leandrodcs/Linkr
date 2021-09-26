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

function getTimelinePosts(userToken, additionalPageInformation, lastId) {
    return axios.get(`${URL}/following/posts${lastId?`?olderThan=${lastId}`:``}`,createConfig(userToken));
}

function getNewerTimelinePosts(userToken, firstId, posts, setPosts, setFirstId) {
    axios.get(`${URL}/following/posts?earlierThan=${firstId}`,createConfig(userToken))
    .then(resp => {
        const newPosts = resp.data.posts;
        if (newPosts.length) {
            setPosts([...newPosts, ...posts]);
            setFirstId(newPosts[0].id);
        }
    })
    .catch(error => {
        sendAlert("error", "Houve uma falha ao obter os posts!","Nos desculpe! A página será atualizada");
    })
}

function getUserPosts(userToken, userId, lastId) {
    return axios.get(`${URL}/users/${userId}/posts${lastId?`?olderThan=${lastId}`:``}`, createConfig(userToken));
}

function getNewerPosts(userToken, firstId, posts, setPosts, URLSufix) {
    axios.get(`${URL}${URLSufix}?earlierThan=${firstId}`,createConfig(userToken))
    .then(resp => {
        const newPosts = resp.data.posts;
        if (newPosts.length) {
            setPosts([...newPosts, ...posts]);
        }
    })
    .catch(error => {
        sendAlert("error", "Houve uma falha ao obter os posts!","Nos desculpe! A página será atualizada");
    })
}


function getHashtagPosts(userToken, hashtag, setHashtagPosts, setLoading, setHasMore, lastId, hashtagPosts) {
    return axios.get(`${URL}/hashtags/${hashtag}/posts${lastId?`?olderThan=${lastId}`:``}`, createConfig(userToken))
}

function getNewerHashtagPosts(userToken, firstId, posts, setPosts, hashtag) {
    axios.get(`${URL}/hashtags/${hashtag}/posts?earlierThan${firstId}`,createConfig(userToken))
    .then(resp => {
        const newPosts = resp.data.posts;
        if (newPosts.length) {
            setPosts([...newPosts, ...posts]);
        }
    })
    .catch(error => {
        sendAlert("error", "Houve uma falha ao obter os posts!","Nos desculpe! A página será atualizada");
        localStorage.clear();
        window.open("/","_self");
    })
}

function getUserLikes(setLoading, userToken , setUserLikes, setHasMore, lastId, userLikes) {
    axios.get(`${URL}/posts/liked${lastId?`?olderThan=${lastId}`:``}`, createConfig(userToken))
    .then(res => {
        if(!lastId) {
            setUserLikes(res.data.posts);
            setLoading(false);
        }
        if (lastId) {
            setUserLikes([...userLikes, ...res.data.posts]);
        }
        if(res.data.posts.length === 0) {
            setHasMore(false);
        }
    })
    .catch(err => {
        setLoading(false);
        // sendAlert("error", "Houve uma falha ao obter os posts!","Nos desculpe! A página será atualizada");
        // localStorage.clear();
        // window.open("/","_self");
    });
}

function getNewerUserLikes(userToken, firstId, userLikes, setUserLikes) {
    axios.get(`${URL}/posts/liked?earlierThan=${firstId}`,createConfig(userToken))
    .then(resp => {
        const newPosts = resp.data.posts;
        if (newPosts.length) {
            setUserLikes([...newPosts, ...userLikes]);
        }
    })
    .catch(error => {
        sendAlert("error", "Houve uma falha ao obter os posts!","Nos desculpe! A página será atualizada");
        localStorage.clear();
        window.open("/","_self");
    })
}

function deletePostFromServer(setIsHidden, userToken, postId, setOpenModal, setIsDataBeingEvaluated) {
    axios.delete(`${URL}/posts/${postId}`, createConfig(userToken))
    .then(res => {
        setIsHidden(true);
        setIsDataBeingEvaluated(false);
        setOpenModal(false);
    })
    .catch(err => {
        sendAlert("error", "Oops!","Seu post não pôde ser excluído! Tente novamente...");
        console.log("Erro no delete");
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

function publishNewPost(body, userToken, setIsDataBeingEvaluated, setIsPublishing, setNewPost, location){
    const adjustedBody = {...body, text: textWithLowercaseHashtags(body.text), "geolocation":{"latitude":location.latitude,"longitude":location.longitude}}
    axios.post(`${URL}/posts`, adjustedBody, createConfig(userToken))
    .then( resp => {
        setIsDataBeingEvaluated(false);
        setIsPublishing(false);
        setNewPost({ text:"",link:"" })
    })
    .catch( error => {
        sendAlert("error", "Oops!","Seu post não pôde ser publicado! Tente novamente...");
        setIsPublishing(false);
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

function likePost( postID, userToken, hasUserLiked, setIsLiked, setIsDataBeingEvaluated ) {
    axios.post(`${URL}/posts/${postID}/${hasUserLiked ? "dislike" : "like" }`, "", createConfig(userToken))
        .then(resp => {
            setIsLiked(!hasUserLiked);
            setIsDataBeingEvaluated(false);
        })
        .catch(err => {
            sendAlert("error", "Erro no servidor!","Por favor, tente novamente...");
            setIsLiked(hasUserLiked);
            setIsDataBeingEvaluated(false);
        });
}

function getUserList(search, userToken, setUserList, setShowUsers) {
    axios.get(`${URL}/users/search/?username=${search}`, createConfig(userToken))
    .then(res => {
        const following = res.data.users.filter(u => u.isFollowingLoggedUser);
        const notFollowing = res.data.users.filter(u => !u.isFollowingLoggedUser);
        setUserList([...following, ...notFollowing]);
        setShowUsers(true);
    })
    .catch(err => {
        sendAlert("error", "Erro no servidor!","Por favor, tente novamente...");
    });
}

function sendRepostToServer(userToken, postID, setIsDataBeingEvaluated, setOpenModal) {
    axios.post(`${URL}/posts/${postID}/share`, "", createConfig(userToken))
    .then(resp => {
        setOpenModal(false);
        sendAlert("success", "Você repostou essa publicação!","Vá até sua timeline para conferir!");
        setIsDataBeingEvaluated(false);
    })
    .catch(error => {
        setOpenModal(false);
        sendAlert("error", "Erro no servidor!","Por favor, tente novamente...");
        setIsDataBeingEvaluated(false);
    })
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

function getPostComments( userToken, postID, setComments ) {
    axios.get(`${URL}/posts/${postID}/comments`, createConfig(userToken))
        .then(resp => {
            setComments(resp.data.comments);
        })
        .catch(err => {
            sendAlert("error", "Erro no servidor!","Por favor, tente novamente...");
        });
}

function postComment( userToken, postID, comment, setComments, setIsDataBeingEvaluated, setText) {
    axios.post(`${URL}/posts/${postID}/comment`, comment, createConfig(userToken))
        .then(resp => {
            sendAlert("success", "Sucesso!","Você comentou no post!");
            getPostComments( userToken, postID, setComments );
            setText("");
            setIsDataBeingEvaluated(false);
        })
        .catch(err => {
            sendAlert("error", "Erro no servidor!","Por favor, tente novamente...");
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
    getUserList,
    sendRepostToServer,
    getFollowingList,
    followUser,
    getPostComments,
    postComment,
    getNewerPosts,
};
