function saveToLocalStorage(resp) {
    localStorage.setItem("token", resp.token);
    localStorage.setItem("avatar", resp.user.avatar);
    localStorage.setItem("email", resp.user.email);
    localStorage.setItem("id", resp.user.id);
    localStorage.setItem("username", resp.user.username);
}

function getFromLocalStorage() {
    const token = localStorage.getItem("token");
    const avatar = localStorage.getItem("avatar");
    const email = localStorage.getItem("email");
    const id = localStorage.getItem("id");
    const username = localStorage.getItem("username");
    
    return {
        token,
        user: {
            avatar,
            email,
            id,
            username
        }
    };
}

export {
    saveToLocalStorage,
    getFromLocalStorage
};