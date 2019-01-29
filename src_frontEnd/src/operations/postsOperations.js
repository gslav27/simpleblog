import uniqid from 'uniqid';

import * as postsActions from '../actions/postsActions';


export const {
  getLatestPosts,
  deleteComment,
  cleanUpCurrentPost,
} = postsActions;


export const getPostData = postId => async (dispatch) => {
  await dispatch(postsActions.getPostData(postId));
  dispatch(postsActions.getPostComments(postId));
};


export const addPost = ({ title, author, body, description }) => (dispatch) => {
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
  dispatch(postsActions.postNewPost(newPostData));
};


export const addComment = ({ text: body, author, postId }) => (dispatch) => {
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString();
  const data = {
    date: formattedDate,
    postId: Number(postId) || postId,
    author,
    body,
  };
  dispatch(postsActions.postNewComment(data));
};


export const deletePost = postId => async (dispatch) => {
  await dispatch(postsActions.deletePost(postId));
  dispatch(getLatestPosts);
};
