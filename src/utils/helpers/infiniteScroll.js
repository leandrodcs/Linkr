async function reloadCurrentTimeline(interactedPostId, getPosts, userToken, setPosts, additionalPageInformation) {
    let updatedPosts = [];
    let lastId;
    while (!updatedPosts.some( ({id, repostId}) => repostId <= interactedPostId || (!repostId && id <= interactedPostId) )) {
        await getPosts(userToken, additionalPageInformation, lastId)
        .then((resp) => {
            updatedPosts = [...updatedPosts, ...resp.data.posts];
            lastId = updatedPosts[updatedPosts.length -1].repostId || updatedPosts[updatedPosts.length -1].id;
        })
    }
    await getPosts(userToken, additionalPageInformation, lastId)
    .then((resp) => {
        updatedPosts = [...updatedPosts, ...resp.data.posts];
        lastId = updatedPosts[updatedPosts.length -1].repostId || updatedPosts[updatedPosts.length -1].id;
    })
    setPosts([...updatedPosts]);
}

export {
    reloadCurrentTimeline,
}
