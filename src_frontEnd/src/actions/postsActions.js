import * as types from './types';


export const loadFetchedPosts = posts => ({
  type: types.FETCH_LATEST_POSTS,
  payload: posts,
});


export const loadCurrentPostData = postData => ({
  type: types.FETCH_CURRENT_POST_DATA,
  payload: postData,
});


export const loadCurrentPostComments = comments => ({
  type: types.FETCH_CURRENT_POST_COMMENTS,
  payload: comments,
});


// type "1" = fetchLatestPosts, type "2" = fetchCurrentPostData, type "3" = fetchCurrentPostCommets
const actionType = {
  1: types.WAIT_LATEST_POSTS_FETCHING,
  2: types.WAIT_CURRENT_POST_DATA_FETCHING,
  3: types.WAIT_CURRENT_POST_COMMENTS_FETCHING,
};
export const waitResponse = (type = 1, loading = true) => ({
  type: actionType[type],
  payload: loading,
});


export const cleanUpCurrentPost = () => ({ type: types.CLEAN_UP_CURRENT_POST });
