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

function getTimelinePosts(userToken) {
    return axios.get(`${URL}/posts`,createConfig(userToken))
}

export {
    getTimelinePosts,
}