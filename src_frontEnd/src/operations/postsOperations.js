import uniqid from 'uniqid';

import * as postsActions from '../actions/postsActions';
import * as restApi from '../selectors/postsFetchDataSelectors';
import { getLatestPosts } from '../selectors/postsDataSelectors';


export const { cleanUpCurrentPost } = postsActions;


// Requests
export const fetchLatestPosts = () => async (dispatch) => {
  dispatch(postsActions.waitResponse('1'));
  try {
    const result = await fetch(restApi.getURL('posts'), restApi.getObj('GET'));
    const resultJSON = await result.json();
    dispatch(postsActions.loadFetchedPosts(getLatestPosts(resultJSON)));
  } catch (err) {
    console.log('There has been a problem with fetching latest posts: ', err.message);
    dispatch(postsActions.waitResponse(1, false));
  }
};


const fetchCurrentPostComments = postId => async (dispatch) => {
  dispatch(postsActions.waitResponse('3'));
  try {
    const result = await fetch(restApi.getURL('comments', postId), restApi.getObj('GET'));
    const resultJSON = await result.json();
    dispatch(postsActions.loadCurrentPostComments(resultJSON));
  } catch (err) {
    console.log('There has been a problem with fetching current post data: ', err.message);
    dispatch(postsActions.waitResponse(3, false));
  }
};


export const fetchCurrentPostData = postId => async (dispatch) => {
  dispatch(postsActions.waitResponse('2'));
  try {
    const result = await fetch(restApi.getURL('posts', postId), restApi.getObj('GET'));
    const resultJSON = await result.json();
    const currentPost = resultJSON[0];
    dispatch(postsActions.loadCurrentPostData(currentPost));
    dispatch(fetchCurrentPostComments(postId));
  } catch (err) {
    console.log('There has been a problem with fetching current post data: ', err.message);
    dispatch(postsActions.waitResponse(2, false));
  }
};


export const addComment = ({ text: body, author, postId }) => async (dispatch) => {
  dispatch(postsActions.waitResponse('3'));
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString();
  const newCommentData = {
    date: formattedDate,
    postId: Number(postId) || postId,
    author,
    body,
  };
  try {
    const result = await fetch(restApi.getURL('comments'), restApi.getObj('POST', newCommentData));
    const resultJSON = await result.json();
    console.log('response OK', resultJSON);
    dispatch(fetchCurrentPostComments(Number(postId) || postId));
  } catch (err) {
    console.log('There has been a problem with adding new comment: ', err.message);
    dispatch(postsActions.waitResponse(3, false));
  }
};


export const deleteComment = (commentId, postId) => async (dispatch) => {
  dispatch(postsActions.waitResponse(3));
  try {
    const result = await fetch(restApi.getURLDeleteItem('comments', commentId), restApi.getObj('DELETE'));
    const resultJSON = await result.json();
    console.log('response OK', resultJSON);
    dispatch(fetchCurrentPostComments(Number(postId) || postId));
  } catch (err) {
    console.log('There has been a problem with deleting current comment: ', err.message);
    dispatch(postsActions.waitResponse(3, false));
  }
};


export const addPost = ({ title, author, body, description }) => async (dispatch) => {
  dispatch(postsActions.waitResponse(1));
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString();
  const newPostData = {
    date: formattedDate,
    id: uniqid(),
    title,
    author,
    body,
    description,
  };
  try {
    const result = await fetch(restApi.getURLAddPost('posts'), restApi.getObj('POST', newPostData));
    const resultJSON = await result.json();
    console.log('response OK', resultJSON);
    dispatch(fetchLatestPosts());
  } catch (err) {
    console.log('There has been a problem with adding new post: ', err.message);
    dispatch(postsActions.waitResponse(1, false));
  }
};


export const deletePost = _id => async (dispatch) => {
  try {
    const result = await fetch(restApi.getURLDeleteItem('posts', _id), restApi.getObj('DELETE'));
    const resultJSON = await result.json();
    console.log('response OK', resultJSON);
    dispatch(fetchLatestPosts());
  } catch (err) {
    console.log('There has been a problem with deleting current post: ', err.message);
  }
};
