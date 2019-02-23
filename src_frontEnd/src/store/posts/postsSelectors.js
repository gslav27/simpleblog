import { getSortedByDateNewestFirst } from '_Utils_/getters/getSortedByDate_NewestFirst';


// SELECTORS FOR APP STORE DATA
export const getLatestPosts = state => state.posts.latestPosts;
export const getCurrentPost = state => state.posts.currentPost;

export const getLatestPostsLoadingStatus = state => state.posts.loading.latestPosts;
export const getPostLoadingStatus = state => state.posts.loading.post;


// SELECTORS FOR REDUCER
export const getTenLatestPosts = (items) => {
  const tenLatestPosts = getSortedByDateNewestFirst(items).slice(0, 10);
  return tenLatestPosts.map(post => (
    Object.keys(post).reduce((modifiedPost, key) => {
      if (key === 'body') return modifiedPost;
      modifiedPost[key] = post[key];
      return modifiedPost;
    }, {})
  ));
};
