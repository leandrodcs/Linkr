import { likePost } from "../service/service";

export function Like(isLiked, setIsLiked, userToken, postID, likes, setLikes) {
    setIsLiked(!isLiked);
    likePost(postID, userToken, likes, setLikes, isLiked)
}

export function isLikedByUser(likes, loginID) {
    return !!likes.filter(like => like.userId === Number(loginID)).length;
}