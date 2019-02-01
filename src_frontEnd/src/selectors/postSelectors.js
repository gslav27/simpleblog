export const getCurrentPost = state => state.posts.currentPost;
export const getCurrentPostComments = state => state.posts.currentPostComments;

export const getPostLoadingStatus = state => state.posts.loading.post;
export const getCommentsLoadingStatus = state => state.posts.loading.comments;
