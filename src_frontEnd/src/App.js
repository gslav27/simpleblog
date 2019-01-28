import React from 'react';

import { Route, Switch } from 'react-router-dom';

// import Spinner from './components/UI/Spinner';
import LatestPosts from './containers/LatestPosts';
import Post from './containers/Post';

import Header from './containers/Header';
import RootStyle from './App.styles';

import { routes } from './constants';

// const LazyLatestPosts = lazy(() => import(/* webpackChunkName: "LatestPosts" */'./containers/LatestPosts'));
// const LazyPost = lazy(() => import(/* webpackChunkName: "Post" */ './containers/Post'));

// // const LatestPosts = import(/* webpackChunkName: "LatestPosts" */'./containers/LatestPosts');
// // const Post = import(/* webpackChunkName: "Post" */ './containers/Post');
// // const LazyLatestPosts = lazy(() => LatestPosts);
// // const LazyPost = lazy(() => Post);

const App = () => (
  <React.Fragment>
    <RootStyle />
    <Header />
    {/* <Suspense fallback={<Spinner />}> */}
    <Switch>
      <Route exact path={`${process.env.PUBLIC_URL}/`} component={LatestPosts} />
      {/* <Route exact path='/' render={props => <LazyLatestPosts {...props} />} /> */}
      <Route exact path={`${process.env.PUBLIC_URL}${routes.posts}/:postId`} component={Post} />
      {/* <Route exact path='/posts/:postId' render={props => <LazyPost {...props} />} /> */}
    </Switch>
    {/* </Suspense> */}
  </React.Fragment>
);

export default App;
