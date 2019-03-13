import React from 'react';

import { Route, Switch } from 'react-router-dom';

import { routes } from './utilities/constants/constants';
import LatestPosts from './containers/LatestPosts';
import Post from './containers/Post';

import Header from './components/Header/HeaderLayout';
import RootStyle from './App.styles';


const App = () => (
  <React.Fragment>
    <RootStyle />
    <Header />
    <Switch>
      <Route exact path={`${process.env.PUBLIC_URL}/`} component={LatestPosts} />
      <Route exact path={`${process.env.PUBLIC_URL}${routes.posts}/:postId`} component={Post} />
    </Switch>
  </React.Fragment>
);

export default App;
