import React from 'react';

import { Route, Switch } from 'react-router-dom';

import LatestPosts from './containers/LatestPosts';
import Post from './containers/Post';
import HomeLink from './components/HomeLink';
import RootStyle from './App.styles';

const App = () => (
  <React.Fragment>
    <RootStyle />
    <HomeLink />
    <Switch>
      <Route exact path='/' component={LatestPosts} />
      <Route exact path='/posts/:postId' component={Post} />
    </Switch>
  </React.Fragment>
);

export default App;
