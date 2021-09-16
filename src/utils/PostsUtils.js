import { publishNewPost } from "../service/service";
import { isInputValid } from "./ValidationUtils";

function hasUserLikedThisPost(postLikes, userWhoIsLikingId) {
    return postLikes.find( ({userId}) => userId === userWhoIsLikingId )
}

function OpenLinkInNewPage(link){
    window.open(link, '_blank');
}

function formattedNumberOfLikes(numberOfLikes) {
    return `${numberOfLikes} ${numberOfLikes > 1 ? "likes" : "like"}`
}

function CheckPublishingBoxAndSendPost(objectToPublish, userToken, setIsDataBeingEvaluated){
    if (!isInputValid("link",objectToPublish.link)) {return}
    setIsDataBeingEvaluated(true);
    publishNewPost(objectToPublish, userToken, setIsDataBeingEvaluated);
}

export {
    hasUserLikedThisPost,
    OpenLinkInNewPage,
    formattedNumberOfLikes,
    CheckPublishingBoxAndSendPost
}