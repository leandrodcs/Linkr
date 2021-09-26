async function reloadCurrentTimeline(interactedPostId, getTimelinePosts, userToken, setPosts) {
    let updatedPosts = [];
    let lastId;
    while (!updatedPosts.some( ({id, repostId}) => repostId <= interactedPostId || (!repostId && id <= interactedPostId) )) {
        console.log("OPA")
        await getTimelinePosts(userToken, lastId)
        .then((resp) => {
            updatedPosts = [...updatedPosts, ...resp.data.posts];
            lastId = updatedPosts[updatedPosts.length -1].repostId || updatedPosts[updatedPosts.length -1].id;
        })
    }
    console.log(updatedPosts);
    setPosts([...updatedPosts]);
}

export {
    reloadCurrentTimeline,
}
