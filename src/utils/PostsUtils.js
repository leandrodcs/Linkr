import Post from "../components/Post/Post";

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

function CheckPublishingBoxAndSendPost(objectToPublish, userToken, setIsDataBeingEvaluated, setNewPost){
    if (!isInputValid("link",objectToPublish.link)) {return}
    setIsDataBeingEvaluated(true);
    publishNewPost(objectToPublish, userToken, setIsDataBeingEvaluated, setNewPost);
}

function PrintedPosts(posts) {
    return (
        posts.length ? posts.map( (post) => 
            <Post 
                key = { post.id }
                post = { post }
            />)
            : <p> Nenhum post encontrado </p>
    );
}

export {
    hasUserLikedThisPost,
    OpenLinkInNewPage,
    formattedNumberOfLikes,
    CheckPublishingBoxAndSendPost,
    PrintedPosts
}