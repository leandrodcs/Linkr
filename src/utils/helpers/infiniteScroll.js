function updatePostsAndId (posts, resp) {
const updatedPosts = [...posts, ...resp.data.posts];
const lastId = updatedPosts[updatedPosts.length -1].repostId || updatedPosts[updatedPosts.length -1].id;
return [updatedPosts, lastId]
}

async function reloadCurrentTimeline(interactedPostId, getPosts, userToken, setPosts, additionalPageInformation) {
    let updatedPosts = [];
    let lastId;
    const resps = []
    while (!updatedPosts.some( ({id, repostId}) => repostId <= interactedPostId || (!repostId && id <= interactedPostId) )) {
        await getPosts(userToken, additionalPageInformation, lastId)
        .then((resp) => {
            resps.unshift(resp)
        });
        [updatedPosts, lastId] = updatePostsAndId (updatedPosts, resps[0]);
    }
    setPosts([...updatedPosts]);
}

export {
    reloadCurrentTimeline,
}
