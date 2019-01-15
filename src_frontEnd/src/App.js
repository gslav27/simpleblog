import React from 'react';
import './App.scss';

import { Route, Switch, Link } from 'react-router-dom';
import LatestPosts from './containers/LatestPosts';
import Post from './containers/Post';


const App = () => (
  <React.Fragment>
    <Link to='/' title='to home page'><h3>SimpleBlog</h3></Link>
    <Switch>
      <Route exact path='/' component={LatestPosts} />
      <Route exact path='/posts/:postId' component={Post} />
    </Switch>
  </React.Fragment>
);

export default App;
