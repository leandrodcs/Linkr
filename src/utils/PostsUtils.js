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

function formattedNumberOfInteractions(numberOfLikes, typeOfInteraction, wasThisPostClicked, isLiked) {
    let likesToBeAdded = () => {
        if (wasThisPostClicked) {
            return (isLiked ? 1 : -1);
        }
        return 0
    }
    return `${numberOfLikes + likesToBeAdded()} ${numberOfLikes + likesToBeAdded() > 1 ? typeOfInteraction + "s" : typeOfInteraction }`
}

function CheckPublishingBoxAndSendPost(event, objectToPublish, userToken, setIsDataBeingEvaluated, setIsPublishing, setNewPost, location){
    event.preventDefault();
    if (!isInputValid("link",objectToPublish.link)) {return};
    setIsDataBeingEvaluated(true);
    setIsPublishing(true);
    publishNewPost(objectToPublish, userToken, setIsDataBeingEvaluated, setIsPublishing, setNewPost, location);
}

function PrintedPosts(posts, zeroPostsMessage, loginId, setInteractedPostId, followingList) {
    if (posts.length) {
        return (
            posts.map( (post) => 
                <Post 
                    key = { post.repostId || post.id }
                    post = { {...post, hasUserLiked:!!post.likes.find(({userId}) => userId === Number(loginId))} }
                    setInteractedPostId = {setInteractedPostId}
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

async function analyzeRequest(e, setInteractedPostId, editedMsg, id, token, setIsDataBeingEvaluated, setIsEditing, cancelEditing, isEditing, text, setEditedMsg) {
    if(e.keyCode === 27) {
        cancelEditing(isEditing, text, setIsEditing, setEditedMsg)
    }
    if(e.keyCode === 13) {
        if (editedMsg !== 0) {
            console.log("enter", id)
            await setInteractedPostId(id);
            editPost(editedMsg, id, token, setIsDataBeingEvaluated, setIsEditing, cancelEditing);
        } else {
            cancelEditing(isEditing, text, setIsEditing, setEditedMsg)
        }
    }
}

async function deletePost(setIsHidden, setInteractedPostId, setIsDataBeingEvaluated, token, id, setOpenModal ) {
    await setInteractedPostId(id);
    setIsDataBeingEvaluated(true);
    deletePostFromServer(setIsHidden, token, id, setOpenModal, setIsDataBeingEvaluated);
}

async function repostPost(setInteractedPostId, userToken, postID, repostId, setIsDataBeingEvaluated, setOpenModal) {
    await setInteractedPostId(repostId || postID);
    setIsDataBeingEvaluated(true);
    sendRepostToServer(userToken, postID, setIsDataBeingEvaluated, setOpenModal);
}

function isUsersOriginalPost(repostedBy, userId, postUserId){
    return !repostedBy && Number(userId) === Number(postUserId);
}

function isUsersRepost(repostedBy, userId) {
    return repostedBy && Number(userId) === Number(repostedBy.id);
}

async function sendCommentAndUpdatePosts (e, postComment, userToken, id, repostId, text, setComments, setText, setIsDataBeingEvaluated, setInteractedPostId) {
    e.preventDefault();
    await setInteractedPostId(repostId || id);
    setIsDataBeingEvaluated(true);
    postComment(userToken, id, {text}, setComments, setIsDataBeingEvaluated, setText);
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
    isUsersRepost,
    sendCommentAndUpdatePosts,
}