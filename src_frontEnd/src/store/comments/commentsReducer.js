import { getObjectWithKeysExcluded } from '_Utils_/getters/getObjWithKeysExluded';

import * as types from './commentsActionTypes';
import { SUCCESS, START, FAIL } from '../actionTypes';

import {
  getWithoutUnusedComments,
  getTransformedComments,
  updateAllSubCommentsQty,
} from './commentsSelectors';



const initialState = {
  allComments: {},
  mainComments: [],
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
        loading: { ...state.loading, comments: false },
      };
    case (types.POST_NEW_COMMENT + SUCCESS):
      return {
        ...state,
        allComments: {
          [payload._id]: { ...payload, subComments: [], allSubCommentsQty: 0 },
          ...getObjectWithKeysExcluded(state.allComments, ['temp']),
        },
        mainComments: [
          payload._id, ...state.mainComments.slice(1),
        ],
        loading: { ...state.loading, newComment: false },
      };
    case (types.POST_NEW_SUB_COMMENT + SUCCESS):
      return {
        ...state,
        allComments: {
          [payload._id]: { ...payload, subComments: [], allSubCommentsQty: 0 },
          ...getObjectWithKeysExcluded(state.allComments, ['temp']),
          ...updateAllSubCommentsQty('add', payload.commentId, {
            ...state.allComments,
            [payload.commentId]: {
              ...state.allComments[payload.commentId],
              subComments: [payload._id, ...state.allComments[payload.commentId].subComments.slice(1)],
            },
          }),
        },
        loading: { ...state.loading, newSubComment: false },
      };
    case (types.DELETE_COMMENT + SUCCESS):
      return {
        ...state,
        mainComments: state.mainComments.filter(_id => _id !== payload.result[0]),
        allComments: getWithoutUnusedComments(state.allComments, payload.result[0]),
        loading: { ...state.loading, deleteComment: false },
      };
    case (types.DELETE_SUB_COMMENT + SUCCESS):
      return {
        ...state,
        allComments: {
          ...getWithoutUnusedComments(state.allComments, payload.result[0]),
          ...updateAllSubCommentsQty(
            'subtract',
            initialPayload.commentId,
            {
              ...state.allComments,
              [initialPayload.commentId]: {
                ...state.allComments[initialPayload.commentId],
                subComments: state.allComments[initialPayload.commentId].subComments.filter(_id => _id !== payload.result[0]),
              },
            },
            state.allComments[payload.result[0]].allSubCommentsQty,
          ),
        },
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
        mainComments: ['temp', ...state.mainComments],
        allComments: { ...state.allComments, temp: { _id: 'temp' } },
        loading: { ...state.loading, newComment: true },
      };
    case (types.POST_NEW_SUB_COMMENT + START):
      return {
        ...state,
        allComments: {
          ...state.allComments,
          temp: { _id: 'temp' },
          [payload.commentId]: {
            ...state.allComments[payload.commentId],
            subComments: ['temp', ...state.allComments[payload.commentId].subComments],
          },
        },
        loading: { ...state.loading, newComment: true },
      };
    case (types.DELETE_COMMENT + START):
    case (types.DELETE_SUB_COMMENT + START):
      return {
        ...state,
        allComments: {
          ...state.allComments,
          [payload._id]: {
            _id: payload._id,
            subComments: state.allComments[payload._id].subComments,
            allSubCommentsQty: state.allComments[payload._id].allSubCommentsQty,
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
        loading: { ...state.loading, comments: false },
      };
    case (types.POST_NEW_COMMENT + FAIL):
      return {
        ...state,
        mainComments: state.mainComments.slice(1),
        allComments: getObjectWithKeysExcluded(state.allComments, ['temp']),
        loading: { ...state.loading, newComment: false },
      };
    case (types.POST_NEW_SUB_COMMENT + FAIL):
      return {
        ...state,
        allComments: {
          ...getObjectWithKeysExcluded(state.allComments, ['temp']),
          [payload.commentId]: {
            ...state.allComments[payload.commentId],
            subComments: state.allComments[payload.commentId].subComments.slice(1),
          },
        },
        loading: { ...state.loading, newSubComment: false },
      };
    case (types.DELETE_COMMENT + FAIL):
      return {
        ...state,
        mainComments: state.mainComments.filter(_id => _id !== payload._id),
        allComments: getWithoutUnusedComments(state.allComments, payload._id),
        loading: { ...state.loading, deleteComment: false },
      };
    case (types.DELETE_SUB_COMMENT + FAIL):
      return {
        ...state,
        allComments: {
          ...getWithoutUnusedComments(state.allComments, payload._id),
          [initialPayload.commentId]: {
            ...state.allComments[initialPayload.commentId],
            subComments: state.allComments[initialPayload.commentId].subComments.filter(_id => _id !== payload.commentId),
          },
        },
        loading: { ...state.loading, deleteSubComment: false },
      };
    default:
      return state;
  }
}
