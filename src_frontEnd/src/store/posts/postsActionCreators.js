import { DB } from '_Utils_/constants/constants';
import getFetchObj from '_Utils_/getters/getFetchObj_RestDB';

import * as types from './postsActionTypes';


export const getLatestPosts = () => ({
  type: types.GET_LATEST_POSTS,
  callAPI: `${DB.URL}/${DB.COLLECTIONS.posts}`,
  options: getFetchObj('GET'),
});


export const getPostData = postId => ({
  type: types.GET_POST_DATA,
  callAPI: `${DB.URL}/${DB.COLLECTIONS.posts}?q={"id": ${Number(postId) || `"${postId}"`}}`,
  options: getFetchObj('GET'),
});


export const getPostComments = postId => ({
  type: types.GET_POST_COMMENTS,
  callAPI: `${DB.URL}/${DB.COLLECTIONS.comments}?q={"postId": ${Number(postId) || `"${postId}"`}}`,
  options: getFetchObj('GET'),
});


export const postNewPost = newPostData => ({
  type: types.POST_NEW_POST,
  callAPI: `${DB.URL}/${DB.COLLECTIONS.posts}`,
  options: getFetchObj('POST', newPostData),
});


export const postNewComment = newCommentData => ({
  type: types.POST_NEW_COMMENT,
  callAPI: `${DB.URL}/${DB.COLLECTIONS.comments}`,
  options: getFetchObj('POST', newCommentData),
});


export const deletePost = dbPostId => ({
  type: types.DELETE_POST,
  callAPI: `${DB.URL}/${DB.COLLECTIONS.posts}/${dbPostId}`,
  options: getFetchObj('DELETE'),
  payload: { _id: dbPostId },
});


export const deleteComment = dbCommentId => ({
  type: types.DELETE_COMMENT,
  callAPI: `${DB.URL}/${DB.COLLECTIONS.comments}/${dbCommentId}`,
  options: getFetchObj('DELETE'),
  payload: { _id: dbCommentId },
});


export const cleanUpCurrentPost = () => ({ type: types.CLEAN_UP_CURRENT_POST });
