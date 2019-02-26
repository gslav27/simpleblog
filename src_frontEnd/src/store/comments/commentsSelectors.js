import { getSortedByDateNewestFirst } from '_Utils_/getters/getSortedByDate_NewestFirst';


// SELECTORS FOR Comments APP STORE
export const getCurrentPostMainComments = state => state.comments.main;
export const getComment = (state, _id) => state.comments.all[_id] || { _id: 'temp' };
export const getCommentsQty = state => state.comments.allQty;
export const getCommentsLoadingStatus = state => state.comments.loading.comments;
export const getCommentDeletionStatus = (state, _id) => (
  state.comments.loading.deleteComment && !state.comments.all[_id].author
);



// SELECTORS FOR Comments REDUCER
/**
 * @param type {string} - operation type ("add" or "subtract")
 * @param _id {string} - _id of comment to update "allSubCommentsQty"
 * @param comments {object} - obj of all comments
 * @param allSubCommentsQty {number} - number of allSubCommentsQty (required on type === 'subtract')
 * @param updatedComments {object} - object of updated comments* (*for recursion)
 * @returns {object} object of comments{} with updated "allSubCommentsQty"
 */
export const updateAllSubCommentsQty = (type, _id, comments, allSubCommentsQty = 0, updatedComments = {}) => {
  const qty = (type === 'add') ? 1 : -1;
  updatedComments[_id] = { ...comments[_id] };
  updatedComments[_id].allSubCommentsQty += (qty - allSubCommentsQty);
  if (!updatedComments[_id].parentCommentId) return updatedComments;
  return updateAllSubCommentsQty(type, updatedComments[_id].parentCommentId, comments, allSubCommentsQty, updatedComments);
};



/**
 * @param comments {array} - all comments
 * @return obj { all{}, main[] }
 * where every comment has new property: "subComments" (array of subComment's _id)
 */
export const getTransformedComments = (comments) => {
  const sortedComments = getSortedByDateNewestFirst(comments);
  const main = [];
  let transformedComments = sortedComments.reduce((acc, comment) => {
    acc[comment._id] = { ...comment };
    acc[comment._id].subComments = [];
    acc[comment._id].allSubCommentsQty = 0;
    return acc;
  }, {});

  sortedComments.forEach(({ _id, parentCommentId }) => {
    if (!parentCommentId) return main.push(_id);
    transformedComments[parentCommentId].subComments.push(_id);
    transformedComments = {
      ...transformedComments,
      ...updateAllSubCommentsQty('add', parentCommentId, transformedComments),
    };
  });

  return ({
    all: transformedComments,
    main,
  });
};



/**
 * @param comments - obj of all comments
 * @param _id - comment id to remove
 * @return obj without unused comments (without deleted comment and all subComments)
 */
export const getAllWithoutUnusedComments = (comments, _id) => {
  const commentsToRemove = [_id];
  const addSubComments = subComments => subComments.forEach(
    (subComment_id) => {
      commentsToRemove.push(subComment_id);
      const nestedSubComments = comments[subComment_id].subComments;
      nestedSubComments.length && addSubComments(nestedSubComments);
    },
  );
  comments[_id].subComments.length && addSubComments(comments[_id].subComments);

  return Object.keys(comments).reduce((updatedComments, cur_id) => {
    const indInCommentsToRemove = commentsToRemove.indexOf(cur_id);
    if (~indInCommentsToRemove) {
      commentsToRemove.splice(indInCommentsToRemove, 1);
      return updatedComments;
    }
    updatedComments[cur_id] = comments[cur_id];
    return updatedComments;
  }, {});
};
