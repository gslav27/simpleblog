import { createSelector } from 'reselect';

// SELECTORS FOR APP STORE DATA
export const getCurrentPostComments = state => state.comments.currentPostComments;
export const getCommentsLoadingStatus = state => state.comments.loading.comments;


export const getSubComments = (state, _id) => getCurrentPostComments(state)
  .filter((comment) => {
    console.log('GETTER getSubComments', comment.commentId === _id);
    return comment.commentId === _id;
  });
export const makeGetSubComments = () => createSelector(
  //   [getCurrentPostComments],
  //   subComments => subComments.filter((comment) => {
  //     console.log('GETTER getSubComments', comment.commentId === commentId);
  //     return comment.commentId === commentId;
  //   })
);
