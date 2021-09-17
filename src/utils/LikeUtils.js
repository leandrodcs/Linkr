import { likePost } from "../service/service";

function likePostHelper(isLiked, setIsLiked, userToken, postID, setLikes) {
    setIsLiked(!isLiked);
    likePost(postID, userToken, setLikes, isLiked, setIsLiked)
}

function isLikedByUser(likes, loginID) {
    return !!likes.filter(like => like.userId === Number(loginID)).length;
}

function getTooltipText(likes, isLiked, loginID) {
    likes = likes.filter(like => like.userId !== Number(loginID));

    if(isLiked) {
        switch (likes.length) {
            case 0: return `Você`;
            case 1: return `Você e ${likes[0]["user.username"]}`;
            case 2: return `Você, ${likes[0]["user.username"]} e outra 1 pessoa`;
            default: return `Você, ${likes[0]["user.username"]} e outras ${likes.length - 1} pessoas`;
        }
    }
    switch (likes.length) {
        case 0: return ``;
        case 1: return `${likes[0]["user.username"]}`;
        case 2: return `${likes[0]["user.username"]} e ${likes[1]["user.username"]}`;
        case 3: return `${likes[0]["user.username"]}, ${likes[1]["user.username"]} e outra 1 pessoa`;
        default: return `${likes[0]["user.username"]}, ${likes[1]["user.username"]} e outras ${likes.length - 2} pessoas`;
    }
}

export {
    likePostHelper,
    isLikedByUser,
    getTooltipText
};