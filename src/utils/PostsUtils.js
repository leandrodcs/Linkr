import Post from "../components/Post/Post";

import { publishNewPost } from "../service/service";
import { isInputValid } from "./ValidationUtils";
import { publishEditedPost } from "../service/service";


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

function cancelEditing(isEditing, text, setIsEditing, setEditedMsg) {
    setIsEditing(!isEditing);
    setEditedMsg(text);
}

function editPost(editedMsg, id, token, setIsDataBeingEvaluated, setIsEditing, cancelEditing) {
    setIsDataBeingEvaluated(true);
    publishEditedPost(editedMsg, id, token, setIsDataBeingEvaluated, setIsEditing, cancelEditing);
}

function analyzeRequest(e, editedMsg, id, token, setIsDataBeingEvaluated, setIsEditing, cancelEditing, isEditing, text, setEditedMsg) {
    if(e.keyCode === 27) {
        cancelEditing(isEditing, text, setIsEditing, setEditedMsg)
    }
    if(e.keyCode === 13) {
        editPost(editedMsg, id, token, setIsDataBeingEvaluated, setIsEditing, cancelEditing)
    }
}


export {
    hasUserLikedThisPost,
    OpenLinkInNewPage,
    formattedNumberOfLikes,
    CheckPublishingBoxAndSendPost,
    PrintedPosts,
    cancelEditing,
    editPost,
    analyzeRequest,
}