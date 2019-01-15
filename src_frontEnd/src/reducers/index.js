import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

// import searchReducer from './searchReducer';
// import imgViewerReduser from './imgViewerReducer';
// import appAddsReducer from './appAddsReducer';
import postsReducer from './postsReducer';


export default combineReducers({
  // search: searchReducer,
  // imgViewer: imgViewerReduser,
  // appAdds: appAddsReducer,
  posts: postsReducer,
  routing: routerReducer,
});
