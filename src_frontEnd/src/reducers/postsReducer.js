import * as types from '../actions/types';

const initialState = {
  latestPosts: [],
  currentPost: {},
  currentPostComments: [],
  waitLatestPostFetching: false,
  waitCurrentPostFetching: true,
  waitCurrentPostCommentsFetching: true,
};

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case types.FETCH_LATEST_POSTS:
      return {
        ...state,
        latestPosts: payload,
        waitLatestPostFetching: false,
      };
    case types.FETCH_CURRENT_POST_DATA:
      return {
        ...state,
        currentPost: payload,
        waitCurrentPostFetching: false,
      };
    case types.FETCH_CURRENT_POST_COMMENTS:
      return {
        ...state,
        currentPostComments: payload,
        waitCurrentPostCommentsFetching: false,
      };
    case types.WAIT_LATEST_POSTS_FETCHING:
      return {
        ...state,
        waitLatestPostFetching: payload,
      };
    case types.WAIT_CURRENT_POST_DATA_FETCHING:
      return {
        ...state,
        waitCurrentPostFetching: payload,
      };
    case types.WAIT_CURRENT_POST_COMMENTS_FETCHING:
      return {
        ...state,
        waitCurrentPostCommentsFetching: payload,
      };
    case types.CLEAN_UP_CURRENT_POST:
      return {
        ...state,
        currentPost: {},
        currentPostComments: [],
        waitCurrentPostFetching: true,
        waitCurrentPostCommentsFetching: true,
      };
    default:
      return state;
  }
}
