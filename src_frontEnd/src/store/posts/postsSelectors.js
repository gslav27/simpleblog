import getSortedByDateNewestFirst from '../../utilities/getters/getSortedByDate_NewestFirst';


// SELECTORS FOR APP STORE DATA
export const getLatestPosts = state => state.posts.latestPosts;
export const getCurrentPost = state => state.posts.currentPost;
export const getCurrentPostComments = state => state.posts.currentPostComments;

export const getLatestPostsLoadingStatus = state => state.posts.loading.latestPosts;
export const getPostLoadingStatus = state => state.posts.loading.post;
export const getCommentsLoadingStatus = state => state.posts.loading.comments;



// SELECTORS FOR REDUCER
export const getTenLatestItems = posts => getSortedByDateNewestFirst(posts).slice(0, 10);
