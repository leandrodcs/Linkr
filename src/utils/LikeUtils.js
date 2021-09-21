import { likePost } from "../service/service";

function likePostHelper(setWasThisPostClicked, hasUserLiked, setIsLiked, userToken, postID, setIsDataBeingEvaluated) {
    setIsLiked(!hasUserLiked);
    setWasThisPostClicked(true);
    setIsDataBeingEvaluated(true);
    likePost(postID, userToken, hasUserLiked, setIsLiked, setIsDataBeingEvaluated)
}

function getTooltipText(postLikes, isLiked, loginID) {
    postLikes = postLikes.filter(like => like.userId !== Number(loginID));
    const likes = postLikes.map(like => (like["user.username"] ? like["user.username"] : like.username));
    if(isLiked) likes.unshift("Você");

    const otherPeopleLikes = (likes.length === 3 ? "outra 1 pessoa" :  `outras ${likes.length - 2} pessoas`);
    const arrayOfMessage = likes.slice(0, 2);
    
    if(likes.length > 2) return `${arrayOfMessage.join(", ")} e ${otherPeopleLikes}`;
    return arrayOfMessage.join(" e ");
}

export {
    likePostHelper,
    getTooltipText
};