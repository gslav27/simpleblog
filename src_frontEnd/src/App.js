import React, { Suspense, lazy } from 'react';

import { Route, Switch } from 'react-router-dom';

import Spinner from './components/UI/Spinner';
import LatestPosts from './containers/LatestPosts';
import Post from './containers/Post';

import Header from './components/Header/HeaderLayout';
import RootStyle from './App.styles';

import { routes } from './utilities/constants';

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
    <Suspense fallback={<Spinner />}>
      <Switch>
        <Route exact path={`${process.env.PUBLIC_URL}/`} component={LatestPosts} />
        {/* <Route exact path={`${process.env.PUBLIC_URL}/`} render={props => <LazyLatestPosts {...props} />} /> */}
        <Route exact path={`${process.env.PUBLIC_URL}${routes.posts}/:postId`} component={Post} />
        {/* <Route exact path={`${process.env.PUBLIC_URL}${routes.posts}/:postId`} render={props => <LazyPost {...props} />} /> */}
      </Switch>
    </Suspense>
  </React.Fragment>
);

export default App;
