import * as types from './types';
import { DB } from '../constants';
import { getObj } from '../selectors/postsFetchDataSelectors';


export const getLatestPosts = () => ({
  type: types.GET_LATEST_POSTS,
  callAPI: `${DB.URL}/${DB.COLLECTIONS.posts}`,
  options: getObj('GET'),
});


export const getPostData = postId => ({
  type: types.GET_POST_DATA,
  callAPI: `${DB.URL}/${DB.COLLECTIONS.posts}?q={"id": ${Number(postId) || `"${postId}"`}}`,
  options: getObj('GET'),
});


export const getPostComments = postId => ({
  type: types.GET_POST_COMMENTS,
  callAPI: `${DB.URL}/${DB.COLLECTIONS.comments}?q={"postId": ${Number(postId) || `"${postId}"`}}`,
  options: getObj('GET'),
});


export const postNewPost = newPostData => ({
  type: types.POST_NEW_POST,
  callAPI: `${DB.URL}/${DB.COLLECTIONS.posts}`,
  options: getObj('POST', newPostData),
});


export const postNewComment = newCommentData => ({
  type: types.POST_NEW_COMMENT,
  callAPI: `${DB.URL}/${DB.COLLECTIONS.comments}`,
  options: getObj('POST', newCommentData),
});


export const deletePost = postId => ({
  type: types.DELETE_POST,
  callAPI: `${DB.URL}/${DB.COLLECTIONS.posts}/${postId}`,
  options: getObj('DELETE'),
});


export const deleteComment = commentId => ({
  type: types.DELETE_COMMENT,
  callAPI: `${DB.URL}/${DB.COLLECTIONS.comments}/${commentId}`,
  options: getObj('DELETE'),
});


export const cleanUpCurrentPost = () => ({ type: types.CLEAN_UP_CURRENT_POST });
