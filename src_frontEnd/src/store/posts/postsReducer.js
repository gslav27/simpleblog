import getArrayWithReplacedMockItem from '_Utils_/getters/getArrayWithReplacedMockItem';
import getSortedByDateNewestFirst from '_Utils_/getters/getSortedByDate_NewestFirst';

import * as types from './postsActionTypes';
import { SUCCESS, START, FAIL } from '../actionTypes';

import { getTenLatestPosts } from './postsSelectors';


const initialState = {
  latestPosts: [],
  currentPost: {},
  currentPostComments: [],
  loading: {
    latestPosts: false,
    post: true,
    comments: true,
    newPost: false,
    newComment: false,
    deletePost: false,
    deleteComment: false,
  },
};

export default function (state = initialState, { type, payload }) {
  switch (type) {
    // SUCCESS ----------------------------------------------------
    case (types.GET_LATEST_POSTS + SUCCESS):
      return {
        ...state,
        latestPosts: getTenLatestPosts(payload),
        loading: { ...state.loading, latestPosts: false },
      };
    case (types.GET_POST_DATA + SUCCESS):
      return {
        ...state,
        currentPost: payload[0],
        loading: { ...state.loading, post: false },
      };
    case (types.GET_POST_COMMENTS + SUCCESS):
      return {
        ...state,
        currentPostComments: getSortedByDateNewestFirst(payload),
        loading: { ...state.loading, comments: false },
      };
    case (types.POST_NEW_POST + SUCCESS):
      return {
        ...state,
        latestPosts: [payload, ...state.latestPosts.slice(1, 10)],
        loading: { ...state.loading, newPost: false },
      };
    case (types.POST_NEW_COMMENT + SUCCESS):
      return {
        ...state,
        currentPostComments: [payload, ...state.currentPostComments.slice(1)],
        loading: { ...state.loading, newComment: false },
      };
    case (types.DELETE_POST + SUCCESS):
      return {
        ...state,
        latestPosts: state.latestPosts.filter(({ _id }) => _id !== payload.result[0]),
        loading: { ...state.loading, deletePost: false },
      };
    case (types.DELETE_COMMENT + SUCCESS):
      return {
        ...state,
        currentPostComments: state.currentPostComments.filter(({ _id }) => _id !== payload.result[0]),
        loading: { ...state.loading, deleteComment: false },
      };


    // START ----------------------------------------------------
    case (types.GET_LATEST_POSTS + START):
      return {
        ...state,
        loading: { ...state.loading, latestPosts: true },
      };
    case (types.GET_POST_DATA + START):
      return {
        ...state,
        loading: { ...state.loading, post: true },
      };
    case (types.GET_POST_COMMENTS + START):
      return {
        ...state,
        loading: { ...state.loading, comments: true },
      };
    case (types.POST_NEW_POST + START):
      return {
        ...state,
        latestPosts: [{ _id: 'temp' }, ...state.latestPosts],
        loading: { ...state.loading, newPost: true },
      };
    case (types.POST_NEW_COMMENT + START):
      return {
        ...state,
        currentPostComments: [{ _id: 'temp' }, ...state.currentPostComments],
        loading: { ...state.loading, newComment: true },
      };
    case (types.DELETE_POST + START):
      return {
        ...state,
        latestPosts: getArrayWithReplacedMockItem(state.latestPosts, payload._id),
        loading: { ...state.loading, deletePost: true },
      };
    case (types.DELETE_COMMENT + START):
      return {
        ...state,
        currentPostComments: getArrayWithReplacedMockItem(state.currentPostComments, payload._id),
        loading: { ...state.loading, deleteComment: true },
      };


    // FAIL ----------------------------------------------------
    case (types.GET_LATEST_POSTS + FAIL):
      return {
        ...state,
        loading: { ...state.loading, latestPosts: false },
      };
    case (types.GET_POST_DATA + FAIL):
      return {
        ...state,
        loading: { ...state.loading, post: false },
      };
    case (types.GET_POST_COMMENTS + FAIL):
      return {
        ...state,
        loading: { ...state.loading, comments: false },
      };
    case (types.POST_NEW_POST + FAIL):
      return {
        ...state,
        latestPosts: state.latestPosts.slice(1, 10),            // test
        loading: { ...state.loading, newPost: false },
      };
    case (types.POST_NEW_COMMENT + FAIL):
      return {
        ...state,
        currentPostComments: state.currentPostComments.slice(1),            // test
        loading: { ...state.loading, newComment: false },
      };
    case (types.DELETE_POST + FAIL):
      return {
        ...state,
        loading: { ...state.loading, deletePost: false },
      };
    case (types.DELETE_COMMENT + FAIL):
      return {
        ...state,
        loading: { ...state.loading, deleteComment: false },
      };
    

    // OTHER ----------------------------------------------------
    case types.SET_AVAILABLE_POST_DATA:
      return {
        ...state,
        currentPost: payload,
      };
    case types.CLEAN_UP_CURRENT_POST:
      return {
        ...state,
        currentPost: {},
        currentPostComments: [],
        loading: { ...state.loading, post: true, comments: true },
      };
    default:
      return state;
  }
}