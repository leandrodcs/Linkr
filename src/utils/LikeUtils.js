import { likePost } from "../service/service";

function likePostHelper(setInteractedPostId, hasUserLiked, setIsLiked, userToken, postID, repostId,  setIsDataBeingEvaluated, setWasThisPostClicked) {
    setIsLiked(!hasUserLiked);
    setInteractedPostId(repostId || postID);
    setIsDataBeingEvaluated(true);
    setWasThisPostClicked(true);
    likePost(postID, userToken, hasUserLiked, setIsLiked, setIsDataBeingEvaluated)
}

function FormattedTooltip (likes) {
    const otherPeopleLikes = (likes.length === 3 ? "outra 1 pessoa" :  `outras ${likes.length - 2} pessoas`);
    const arrayOfMessage = likes.slice(0, 2);
    
    if(likes.length > 2) return `${arrayOfMessage.join(", ")} e ${otherPeopleLikes}`;
    return arrayOfMessage.join(" e ");
}

function getTooltipText(postLikes, isLiked, loginID, wasThisPostClicked) {
    postLikes = postLikes.filter(like => like.userId !== Number(loginID));
    const likes = postLikes.map(like => (like["user.username"] ? like["user.username"] : like.username));
    if( (isLiked && !wasThisPostClicked) || (!isLiked && wasThisPostClicked) ) likes.unshift("Você");
    
    return FormattedTooltip (likes)
}

export {
    likePostHelper,
    getTooltipText
};