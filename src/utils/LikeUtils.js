import { likePost } from "../service/service";

export function Like(isLiked, setIsLiked, userToken, postID, setLikes) {
    setIsLiked(!isLiked);
    likePost(postID, userToken, setLikes, isLiked, setIsLiked)
}

export function isLikedByUser(likes, loginID) {
    return !!likes.filter(like => like.userId === Number(loginID)).length;
}