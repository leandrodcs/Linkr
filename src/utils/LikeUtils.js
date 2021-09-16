import { likePost } from "../service/service";

export function Like(isLiked, setIsLiked, userToken, postID, likes) {
    setIsLiked(!isLiked);
    likePost(postID, userToken, likes)
}