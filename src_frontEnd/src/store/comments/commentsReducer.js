import { getArrayWithReplacedMockItem } from '_Utils_/getters/getArrayWithReplacedMockItem';
import getSortedByDateNewestFirst from '_Utils_/getters/getSortedByDate_NewestFirst';

import * as types from './commentsActionTypes';
import { SUCCESS, START, FAIL } from '../actionTypes';



const initialState = {
  currentPostComments: [],
  loading: {
    comments: true,
    newComment: false,
    newSubComment: false,
    deleteComment: false,
    deleteSubComment: false,
  },
};

export default function (state = initialState, { type, payload }) {
  switch (type) {
    // SUCCESS ----------------------------------------------------
    case (types.GET_POST_COMMENTS + SUCCESS):
      return {
        ...state,
        currentPostComments: getSortedByDateNewestFirst(payload),
        loading: { ...state.loading, comments: false },
      };
    case (types.POST_NEW_COMMENT + SUCCESS):
      return {
        ...state,
        currentPostComments: [payload, ...state.currentPostComments.slice(1)],
        loading: { ...state.loading, newComment: false },
      };
    case (types.POST_NEW_SUB_COMMENT + SUCCESS):
      return {
        ...state,
        // currentPostComments: [payload, ...state.currentPostComments.slice(1)],
        currentPostComments: [payload, ...state.currentPostComments.slice(1)],
        loading: { ...state.loading, newSubComment: false },
      };
    case (types.DELETE_COMMENT + SUCCESS):
      return {
        ...state,
        currentPostComments: state.currentPostComments.filter(({ _id }) => _id !== payload.result[0]),
        loading: { ...state.loading, deleteComment: false },
      };

    case (types.DELETE_SUB_COMMENT + SUCCESS):
      return {
        ...state,
        currentPostComments: state.currentPostComments.filter(({ _id }) => _id !== payload.result[0]),
        loading: { ...state.loading, deleteSubComment: false },
      };


    // START ----------------------------------------------------
    case (types.GET_POST_COMMENTS + START):
      return {
        ...state,
        loading: { ...state.loading, comments: true },
      };
    case (types.POST_NEW_COMMENT + START):
      return {
        ...state,
        currentPostComments: [{ _id: 'temp' }, ...state.currentPostComments],
        loading: { ...state.loading, newComment: true },
      };
    case (types.POST_NEW_SUB_COMMENT + START):
      return {
        ...state,
        currentPostComments: [{ _id: 'temp', commentId: payload.commentId }, ...state.currentPostComments],
        // currentPostComments: getArrayWithReplacedMockItem(state.currentPostComments, payload.commentId)
        loading: { ...state.loading, newSubComment: true },
      };
    case (types.DELETE_COMMENT + START):
      return {
        ...state,
        currentPostComments: getArrayWithReplacedMockItem(state.currentPostComments, payload._id),
        loading: { ...state.loading, deleteComment: true },
      };

    case (types.DELETE_SUB_COMMENT + START):
      return {
        ...state,
        currentPostComments: getArrayWithReplacedMockItem(
          state.currentPostComments,
          payload._id,
          { commentId: payload.commentId },
        ),
        loading: { ...state.loading, deleteSubComment: true },
      };


    // FAIL ----------------------------------------------------
    case (types.GET_POST_COMMENTS + FAIL):
      return {
        ...state,
        loading: { ...state.loading, comments: false },
      };
    case (types.POST_NEW_COMMENT + FAIL):
      return {
        ...state,
        currentPostComments: state.currentPostComments.slice(1),            // test
        loading: { ...state.loading, newComment: false },
      };
    case (types.POST_NEW_SUB_COMMENT + FAIL):
      return {
        ...state,
        // currentPostComments: state.currentPostComments.slice(1),            // test
        currentPostComments: state.currentPostComments.slice(1),            // test
        loading: { ...state.loading, newSubComment: false },
      };
    case (types.DELETE_COMMENT + FAIL):
      return {
        ...state,
        // currentPostComments: state.currentPostComments.filter(({ _id }) => _id !== payload.result[0]),
        loading: { ...state.loading, deleteComment: false },
      };
    case (types.DELETE_SUB_COMMENT + FAIL):
      return {
        ...state,
        // currentPostComments: state.currentPostComments.filter(({ _id }) => _id !== payload.result[0]),
        loading: { ...state.loading, deleteSubComment: false },
      };
    default:
      return state;
  }
}
