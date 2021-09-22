import Post from "../components/Post/Post";

import { publishNewPost } from "../service/service";
import { isInputValid } from "./ValidationUtils";
import { publishEditedPost, deletePostFromServer, sendRepostToServer } from "../service/service";


function hasUserLikedThisPost(postLikes, userWhoIsLikingId) {
    return postLikes.find( ({userId}) => userId === userWhoIsLikingId )
}

function OpenLinkInNewPage(link){
    window.open(link, '_blank');
}

function formattedNumberOfInteractions(numberOfLikes, typeOfInteraction) {
    return `${numberOfLikes} ${numberOfLikes > 1 ? typeOfInteraction + "s" : typeOfInteraction }`
}

function CheckPublishingBoxAndSendPost(event, objectToPublish, userToken, setIsDataBeingEvaluated, setIsPublishing, setNewPost){
    event.preventDefault();
    if (!isInputValid("link",objectToPublish.link)) {return};
    setIsDataBeingEvaluated(true);
    setIsPublishing(true);
    publishNewPost(objectToPublish, userToken, setIsDataBeingEvaluated, setIsPublishing, setNewPost);
}

function PrintedPosts(posts, zeroPostsMessage, loginId, followingList) {
    if (posts.length) {
        return (
            posts.map( (post) => 
                <Post 
                    key = { post.repostId || post.id }
                    post = { {...post, hasUserLiked:!!post.likes.find(({userId}) => userId === Number(loginId))} }
                />)
        );
    }
    if(followingList && !followingList.length) {
        return <p> Você não segue ninguém ainda, procure por perfis na busca </p>
    }

    return <p> {zeroPostsMessage} </p>
}

function cancelEditing(isEditing, text, setIsEditing, setEditedMsg) {
    setIsEditing(!isEditing);
    setEditedMsg(text);
}

function editPost(editedMsg, id, token, setIsDataBeingEvaluated, setIsEditing, cancelEditing) {
    setIsDataBeingEvaluated(true);
    setIsEditing(true);
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

function deletePost( setIsDataBeingEvaluated, token, id, setOpenModal ) {
    setIsDataBeingEvaluated(true);
    deletePostFromServer(token, id, setOpenModal, setIsDataBeingEvaluated);
}

function repostPost(userToken, postID, setIsDataBeingEvaluated, setOpenModal) {
    setIsDataBeingEvaluated(true);
    sendRepostToServer(userToken, postID, setIsDataBeingEvaluated, setOpenModal)
}

function isUsersOriginalPost(repostedBy, userId, postUserId){
    return !repostedBy && Number(userId) === Number(postUserId);
}

function isUsersRepost(repostedBy, userId) {
    return repostedBy && Number(userId) === Number(repostedBy.id);
}

export {
    hasUserLikedThisPost,
    OpenLinkInNewPage,
    formattedNumberOfInteractions,
    CheckPublishingBoxAndSendPost,
    PrintedPosts,
    cancelEditing,
    editPost,
    analyzeRequest,
    deletePost,
    repostPost,
    isUsersOriginalPost,
    isUsersRepost
}