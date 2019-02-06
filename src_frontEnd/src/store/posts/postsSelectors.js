import getSortedByDateNewestFirst from '_Utils_/getters/getSortedByDate_NewestFirst';
import getItemsWithoutSomeKeys from '_Utils_/getters/getItemsWithoutSomeKeys';


// SELECTORS FOR APP STORE DATA
export const getLatestPosts = state => state.posts.latestPosts;
export const getCurrentPost = state => state.posts.currentPost;
export const getCurrentPostComments = state => state.posts.currentPostComments;

export const getLatestPostsLoadingStatus = state => state.posts.loading.latestPosts;
export const getPostLoadingStatus = state => state.posts.loading.post;
export const getCommentsLoadingStatus = state => state.posts.loading.comments;



// SELECTORS FOR REDUCER
export const getTenLatestPosts = (items) => {
  const tenLatestPosts = getSortedByDateNewestFirst(items).slice(0, 10);
  return getItemsWithoutSomeKeys(tenLatestPosts, ['body']);
};
