import { DB } from '_Utils_/constants/constants';
import getFetchObj from '_Utils_/getters/getFetchObj_RestDB';

import * as types from './commentsActionTypes';


export const getPostComments = postId => ({
  type: types.GET_POST_COMMENTS,
  callAPI: `${DB.URL}/${DB.COLLECTIONS.comments}?q={"postId": ${Number(postId) || `"${postId}"`}}`,
  options: getFetchObj('GET'),
});


export const postNewComment = newCommentData => ({
  type: types.POST_NEW_COMMENT,
  callAPI: `${DB.URL}/${DB.COLLECTIONS.comments}`,
  options: getFetchObj('POST', newCommentData),
});


export const postNewSubComment = newCommentData => ({
  type: types.POST_NEW_SUB_COMMENT,
  callAPI: `${DB.URL}/${DB.COLLECTIONS.comments}`,
  options: getFetchObj('POST', newCommentData),
  payload: { parentCommentId: newCommentData.parentCommentId },
});


export const deleteComment = _id => ({
  type: types.DELETE_COMMENT,
  callAPI: `${DB.URL}/${DB.COLLECTIONS.comments}/${_id}`,
  options: getFetchObj('DELETE'),
  payload: { _id },
});


export const deleteSubComment = ({ _id, parentCommentId }) => ({
  type: types.DELETE_SUB_COMMENT,
  callAPI: `${DB.URL}/${DB.COLLECTIONS.comments}/${_id}`,
  options: getFetchObj('DELETE'),
  payload: { _id, parentCommentId },
});
