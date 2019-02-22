import getSortedByDateNewestFirst from '_Utils_/getters/getSortedByDate_NewestFirst';


// SELECTORS FOR Comments APP STORE
export const getCurrentPostMainComments = state => state.comments.mainComments;
export const getComment = (state, _id) => state.comments.allComments[_id];
export const getCommentsLoadingStatus = state => state.comments.loading.comments;
export const getCommentsQty = state => Object.keys(state.comments.allComments).length;



// SELECTORS FOR Comments REDUCER
/**
 * @param comments - array of all comments
 * @return obj { allComments{}, mainComments[] }
 * where every comment has new property: "subComments" (array of subComment's _id)
 */
export const getTransformedComments = (comments) => {
  const sortedComments = getSortedByDateNewestFirst(comments);
  const mainComments = [];
  const transformedComments = sortedComments.reduce((acc, comment) => {
    acc[comment._id] = { ...comment };
    acc[comment._id].subComments = [];
    return acc;
  }, {});

  sortedComments.forEach(({ _id, commentId }) => {
    commentId
      ? transformedComments[commentId].subComments.push(_id)
      : mainComments.push(_id);
  });

  return ({
    allComments: transformedComments,
    mainComments,
  });
};



/**
 * @param comments - obj of all comments
 * @param _id - comment id to remove
 * @return obj without unused comments (without deleted comment and all subComments)
 */
export const getWithoutUnusedComments = (comments, _id) => {
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
