import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import postsReducer from './posts/postsReducer';
import commentsReducer from './comments/commentsReducer';


export default combineReducers({
  posts: postsReducer,
  comments: commentsReducer,
  routing: routerReducer,
});
