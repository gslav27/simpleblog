import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import postsReducer from './posts/postsReducer';


export default combineReducers({
  posts: postsReducer,
  routing: routerReducer,
});