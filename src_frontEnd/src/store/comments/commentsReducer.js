import * as types from './commentsActionTypes';
import { SUCCESS, START, FAIL } from '../actionTypes';

import {
  getAllWithoutUnusedComments,
  getTransformedComments,
  updateAllSubCommentsQty,
} from './commentsSelectors';



const initialState = {
  all: {},
  main: [],
  allQty: 0,
  loading: {
    comments: true,
    newComment: false,
    newSubComment: false,
    deleteComment: false,
    deleteSubComment: false,
  },
};


export default function (state = initialState, { type, payload, initialPayload }) {
  switch (type) {
    // SUCCESS ----------------------------------------------------
    case (types.GET_POST_COMMENTS + SUCCESS):
      return {
        ...state,
        ...getTransformedComments(payload),
        allQty: payload.length,
        loading: {
          ...state.loading,
          comments: false,
        },
      };
    case (types.POST_NEW_COMMENT + SUCCESS):
      return {
        ...state,
        all: {
          [payload._id]: {
            ...payload,
            subComments: [],
            allSubCommentsQty: 0,
          },
          ...state.all,
        },
        main: [
          payload._id,
          ...state.main.slice(1),
        ],
        allQty: state.allQty + 1,
        loading: {
          ...state.loading,
          newComment: false,
        },
      };
    case (types.POST_NEW_SUB_COMMENT + SUCCESS):
      return {
        ...state,
        all: {
          [payload._id]: {
            ...payload,
            subComments: [],
            allSubCommentsQty: 0,
          },
          ...state.all,
          ...updateAllSubCommentsQty(
            'add',
            payload.commentId,
            {
              ...state.all,
              [payload.commentId]: {
                ...state.all[payload.commentId],
                subComments: [
                  payload._id,
                  ...state.all[payload.commentId].subComments.slice(1),
                ],
              },
            },
          ),
        },
        allQty: state.allQty + 1,
        loading: {
          ...state.loading,
          newSubComment: false,
        },
      };
    case (types.DELETE_COMMENT + SUCCESS):
      return {
        ...state,
        main: state.main.filter(_id => _id !== payload.result[0]),
        all: getAllWithoutUnusedComments(state.all, payload.result[0]),
        allQty: state.allQty - (1 + state.all[payload.result[0]].allSubCommentsQty),
        loading: {
          ...state.loading,
          deleteComment: false,
        },
      };
    case (types.DELETE_SUB_COMMENT + SUCCESS):
      return {
        ...state,
        all: {
          ...getAllWithoutUnusedComments(state.all, payload.result[0]),
          ...updateAllSubCommentsQty(
            'subtract',
            initialPayload.commentId,
            {
              ...state.all,
              [initialPayload.commentId]: {
                ...state.all[initialPayload.commentId],
                subComments: state.all[initialPayload.commentId].subComments.filter(_id => _id !== payload.result[0]),
              },
            },
            state.all[payload.result[0]].allSubCommentsQty,
          ),
        },
        allQty: state.allQty - (1 + state.all[payload.result[0]].allSubCommentsQty),
        loading: {
          ...state.loading,
          deleteSubComment: false,
        },
      };


    // START ----------------------------------------------------
    case (types.GET_POST_COMMENTS + START):
      return {
        ...state,
        loading: {
          ...state.loading,
          comments: true,
        },
      };
    case (types.POST_NEW_COMMENT + START):
      return {
        ...state,
        main: [
          'temp',
          ...state.main,
        ],
        loading: {
          ...state.loading,
          newComment: true,
        },
      };
    case (types.POST_NEW_SUB_COMMENT + START):
      return {
        ...state,
        all: {
          ...state.all,
          [payload.commentId]: {
            ...state.all[payload.commentId],
            subComments: [
              'temp',
              ...state.all[payload.commentId].subComments,
            ],
          },
        },
        loading: {
          ...state.loading,
          newComment: true,
        },
      };
    case (types.DELETE_COMMENT + START):
    case (types.DELETE_SUB_COMMENT + START):
      return {
        ...state,
        all: {
          ...state.all,
          [payload._id]: {
            _id: payload._id,
            subComments: state.all[payload._id].subComments,
            allSubCommentsQty: state.all[payload._id].allSubCommentsQty,
          },
        },
        loading: {
          ...state.loading,
          [type === (types.DELETE_COMMENT + START) ? 'deleteComment' : 'deleteSubComment']: true,
        },
      };


    // FAIL ----------------------------------------------------
    case (types.GET_POST_COMMENTS + FAIL):
      return {
        ...state,
        loading: {
          ...state.loading,
          comments: false,
        },
      };
    case (types.POST_NEW_COMMENT + FAIL):
      return {
        ...state,
        main: state.main.slice(1),
        loading: { ...state.loading, newComment: false },
      };
    case (types.POST_NEW_SUB_COMMENT + FAIL):
      return {
        ...state,
        all: {
          ...state.all,
          [payload.commentId]: {
            ...state.all[payload.commentId],
            subComments: state.all[payload.commentId].subComments.slice(1),
          },
        },
        loading: {
          ...state.loading,
          newSubComment: false,
        },
      };
    case (types.DELETE_COMMENT + FAIL):
      return {
        ...state,
        main: state.main.filter(_id => _id !== payload._id),
        all: getAllWithoutUnusedComments(state.all, payload._id),
        allQty: state.allQty - (1 + state.all[payload._id].allSubCommentsQty),
        loading: {
          ...state.loading,
          deleteComment: false,
        },
      };
    case (types.DELETE_SUB_COMMENT + FAIL):
      return {
        ...state,
        all: {
          ...getAllWithoutUnusedComments(state.all, payload._id),
          [initialPayload.commentId]: {
            ...state.all[initialPayload.commentId],
            subComments: state.all[initialPayload.commentId].subComments.filter(_id => _id !== payload.commentId),
          },
        },
        allQty: state.allQty - (1 + state.all[payload._id].allSubCommentsQty),
        loading: {
          ...state.loading,
          deleteSubComment: false,
        },
      };
    default:
      return state;
  }
}
